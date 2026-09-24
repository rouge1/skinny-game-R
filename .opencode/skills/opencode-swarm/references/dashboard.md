# Dashboard and replay

`assets/dashboard.html` shows everything that happened in the event log:
- the phase rail
- crew lanes (planner, manager and reviewers, plus one lane per worker model)
- a task board: queued, in progress, in review, done
- bake-off scorecards
- a spend table: OpenCode per model and phase, plus Claude per model
- the activity feed
- a replay player: Space plays or pauses, 1/2/3 set the speed, ←/→ step, Home/End jump, R restarts

## Data model
`swarm.py` appends every action to `data/events.jsonl`. `swarm.py push` groups the events into documents: one
`project/meta` document (name, phases and models from `swarm.toml`, plus other metadata) and one `timeline/<phase>`
document per phase holding that phase's events. The page folds the events into its view, and replay is the same
fold played back in virtual time.

## Live dashboard as a claude.ai Artifact (optional)
1. Publish `assets/dashboard.html` with the Artifact tool, with capabilities
   `{"db": {"rules": [{"path": "", "read": "view", "write": "admin"}]}}` (viewers can read; only the owner writes).
   Put the resulting URL in `swarm.toml` under `[dashboard] url`.
2. At milestones, run `swarm.py push`. It prints a JSON list of batch writes with `if_version` values tracked in
   `out/.versions.json`. Apply the list with the ArtifactData tool (action `batch`, the dashboard URL, and the
   list as `writes`).
3. On a version conflict: `swarm.py push --resync timeline/<phase>=<current version>`, then push again.
   `--all` rewrites every document.

A db-backed artifact is private to its owner's organization, so friends outside it can't open it. For them, use
the replay.

## Shareable replay
`swarm.py export` embeds all events into a copy of the page as `out/<name>-replay.html`. It's a standalone file
that works offline and needs no database. Before sharing it:
- read the embedded notes for anything private (paths, emails, secrets)
- publish it as its own Artifact without the db capability, or just send the file

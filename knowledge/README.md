# STAR//FALL Knowledge Base

Research and implementation notes for upgrading the Canvas shooter without losing its fast, readable arcade identity.

## Contents

- [`shooter-research.md`](shooter-research.md): comparative research on influential shooters and transferable mechanics.
- [`arcade-shooter-research.md`](arcade-shooter-research.md): focused research on Space Invaders, R-Type, Contra, Galaga, Gradius, Defender, Gunstar Heroes, and Metal Slug.
- [`implementation-notes.md`](implementation-notes.md): recommendations mapped to the current Flask/Canvas codebase.
- [`code/canvas-patterns.js`](code/canvas-patterns.js): small, dependency-free JavaScript patterns for collision, spawning, and feedback.
- [`images/README.md`](images/README.md): visual references, licensing notes, and local moodboard assets.

## Current game snapshot

STAR//FALL is a 900 x 620 Canvas arcade shooter. The player moves horizontally, holds Space to fire, clears marching enemy waves, survives enemy projectiles, and earns score. The game currently has one weapon, one enemy behavior, three lives, simple particles, a pause state, and no audio or touch input.

## Working principles

1. Preserve immediate feedback: input should produce visible motion, a shot, or a clear hit response within one frame.
2. Add depth through readable choices, not simulation overhead.
3. Give every new enemy or weapon a visual silhouette and a counterplay cue.
4. Keep the browser implementation dependency-light and Canvas-first.
5. Treat external images as research references unless their license is documented for redistribution.

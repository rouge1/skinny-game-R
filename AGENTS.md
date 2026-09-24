# Agent Notes

- This is a small Flask app serving a browser game; gameplay and rendering live in `static/game.js` using the Canvas API.
- Start locally with `conda env create -f environment.yml` (once), `conda activate game`, then `python app.py`; open `http://127.0.0.1:5000`.
- `requirements.txt` mirrors the only runtime Python dependency for pip-based installs; keep it aligned with `environment.yml`.
- There is no build step or frontend package manager. Verify changes by starting Flask and loading the page in a browser.
- Keep the game dependency-light: do not add server-side graphics libraries unless the architecture changes from browser Canvas rendering.

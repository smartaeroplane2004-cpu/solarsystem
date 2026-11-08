# Study Hub

## Deploy to Vercel

Import the repository with its root directory set to the repository root (the folder containing `manage.py`). Use the Django framework preset and leave Build Command and Output Directory at their defaults. The `vercel.json` configuration enables Vercel's Django integration, which runs `collectstatic` and serves `/static/` assets automatically.

If an older deployment shows a 500 error with `Missing staticfiles manifest entry`, deploy this updated configuration. The generated `staticfiles/` directory belongs in the build output and should remain ignored by Git.

To check production rendering locally, run `.\.venv\Scripts\python.exe manage.py collectstatic --noinput` before starting the app with `DJANGO_DEBUG=False`.

Study Hub is a Django learning website that includes the standalone Solar System project. The solar-system textures and resources are included locally, so the site does not require a ChatGPT account, installation, or internet connection after setup.

## Open from VS Code on Windows

1. Open this `solarsystem` folder in VS Code.
2. Choose **Terminal > Run Task > Open Solar Atlas**.
3. The app opens in your browser at **http://localhost:8080/**. Keep the task running while using the app; press Ctrl+C in its terminal to stop it.

Alternatively, run `powershell -NoProfile -ExecutionPolicy Bypass -File .\serve.ps1` from this folder. To choose another port, add `-Port 8081`.

Edit `solar-atlas/dist/solar-system.html`, `app.js`, or the CSS files and refresh the browser to see changes. Use the local server instead of double-clicking the HTML because the planet renderer reads texture pixels using canvas.

Features: all eight planets, rotating textured close-ups, planet facts, previous/next navigation, an animated orbital overview, a navigation map, pause controls, ambient music and volume control, and responsive layouts.

Textures: Solar System Scope, licensed under CC BY 4.0; attribution links are included in the app footer.

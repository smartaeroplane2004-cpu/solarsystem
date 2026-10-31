# Solar Atlas

A standalone HTML, CSS, and JavaScript solar system. All textures are included locally; no ChatGPT account, hosting, installation, or internet connection is required.

## Open from VS Code on Windows

1. Open this `solarsystem` folder in VS Code.
2. Choose **Terminal > Run Task > Open Solar Atlas**.
3. The app opens in your browser at **http://localhost:8080/**. Keep the task running while using the app; press Ctrl+C in its terminal to stop it.

Alternatively, run `powershell -NoProfile -ExecutionPolicy Bypass -File .\serve.ps1` from this folder. To choose another port, add `-Port 8081`.

Edit `solar-atlas/dist/index.html`, `app.js`, or the CSS files and refresh the browser to see changes. Use the local server instead of double-clicking the HTML because the planet renderer reads texture pixels using canvas.

Features: all eight planets, rotating textured close-ups, planet facts, previous/next navigation, an animated orbital overview, a navigation map, pause controls, ambient music and volume control, and responsive layouts.

Textures: Solar System Scope, licensed under CC BY 4.0; attribution links are included in the app footer.

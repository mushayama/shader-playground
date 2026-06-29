# glslViewer

Command-line shader viewer with live-reload.

## Install

```bash
brew install glslviewer
```

## Run shader

```bash
cd glslviewer
glslviewer ../shaders/basic.frag
```

- Edit shader file → auto-reloads in viewer.

- Auto uniforms

---

### glslViewer provides:

- u_time - seconds since start (float)
- u_resolution - window size (vec2)
- u_mouse - mouse position in pixels (vec2)
- u_date - year, month, day, seconds (vec4)

## Controls

- ESC - quit
- Space - pause/play
- S - screenshot
- R - reload shader
- F - fullscreen

## Verbose errors

```bash
glslviewer ../shaders/basic.frag -v
```

## Docs

https://github.com/patriciogonzalezvivo/glslViewer

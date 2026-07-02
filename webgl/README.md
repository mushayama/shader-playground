# Raw WebGL Shader Viewer

Vanilla WebGL implementation. No frameworks. Full control over shader compilation and rendering.

## Files

- `index.html` - Canvas container
- `shader-viewer.js` - WebGL setup, shader compilation, uniform handling, render loop

## Run

Start HTTP server from repo root:

```bash
cd /path/to/shader-playground
python3 -m http.server 8000
```

### Open browser:

- Default shader: http://localhost:8000/webgl/
- Custom shader: http://localhost:8000/webgl/?shader=../shaders/basic.frag

## How it works

1. Loads fragment shader via fetch()
2. Compiles vertex + fragment shaders
3. Creates WebGL program
4. Renders fullscreen quad
5. Updates uniforms each frame:
   - u_time - seconds elapsed
   - u_resolution - canvas width/height
   - u_mouse - mouse position (pixels)

## Debugging

Open browser console (F12) for shader compile errors.

## URL parameters

- ?shader=<path> - load custom fragment shader (relative to webgl/)

Example: ?shader=../shaders/other.frag

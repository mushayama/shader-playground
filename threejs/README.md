# Three.js Shader Viewer

Three.js wrapper for WebGL shaders. Simpler than raw WebGL, handles boilerplate.

## Files

- `index.html` - Canvas container + Three.js import map
- `shader-viewer.js` - Three.js scene, ShaderMaterial, uniform handling

## Run

Start HTTP server from repo root:

```bash
cd /path/to/shader-playground
python3 -m http.server 8000
```

### Open browser:

- Default shader: http://localhost:8000/threejs/
- Custom shader: http://localhost:8000/threejs/?shader=../shaders/basic.frag

### How it works

1. Loads Three.js from CDN (ES modules via import map)
2. Creates orthographic camera + fullscreen plane
3. Loads fragment shader via fetch()
4. Creates ShaderMaterial with custom uniforms
5. Renders loop updates uniforms:

- u_time - seconds elapsed (Three.Clock)
- u_resolution - canvas width/height (Vector2)
- u_mouse - mouse position in pixels (Vector2)

### Three.js benefits

- Auto-injects position, normal, uv attributes
- Handles WebGL context, shaders compilation
- Built-in resize, render loop utilities
- Easy to add 3D geometry later

### Debugging

Open browser console (F12) for shader errors.

### URL parameters

- ?shader=<path> - load custom fragment shader

Example: ?shader=../shaders/other.frag

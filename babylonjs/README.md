# Babylon.js Shader Viewer

Babylon.js game engine with custom GLSL shaders. Similar to Three.js but different API.

## Files

- `index.html` - Canvas container + Babylon.js CDN script
- `shader-viewer.js` - Babylon scene, ShaderMaterial, uniform handling

## Run

Start HTTP server from repo root:

```bash
cd /path/to/shader-playground
python3 -m http.server 8000
```

### Open browser:

- Default shader: http://localhost:8000/babylonjs/
- Custom shader: http://localhost:8000/babylonjs/?shader=../shaders/basic.frag

### How it works

1. Loads Babylon.js from CDN
2. Creates orthographic camera + fullscreen plane
3. Loads fragment shader via fetch()
4. Registers shaders in BABYLON.Effect.ShadersStore
5. Creates ShaderMaterial with custom uniforms (useUbo: false)
6. Render loop updates uniforms:

- u_time - seconds elapsed
- u_resolution - canvas width/height (Vector2)
- u_mouse - mouse position in pixels (Vector2)

### Babylon.js specifics

- useUbo: false disables uniform buffers (required for simple custom shaders)
- Uses setFloat(), setVector2() to update uniforms
- Auto-injects position attribute
- Built-in engine resize handling

### Debugging

Open browser console (F12) for shader errors.

### URL parameters

- ?shader=<path> - load custom fragment shader

Example: ?shader=../shaders/other.frag

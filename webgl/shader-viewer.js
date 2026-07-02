// WebGL shader viewer - loads and runs GLSL shaders
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  alert("WebGL not supported");
  throw new Error("WebGL not supported");
}

const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
`;

let mouseX = 0;
let mouseY = 0;
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = canvas.height - (e.clientY - rect.top);
});

async function loadShader(path) {
  const response = await fetch(path);
  return await response.text();
}

function compileShader(source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error: ", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

// create shader program
function createProgram(vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error: ", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

//setup fullscreen quad
function setupQuad(program) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Two triangles covering screen
  const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const positionLoc = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
}

//resize canvas to window
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", resize);

// Main
async function main() {
  // Get shader path from URL parameter, default to basic.frag
  const urlParams = new URLSearchParams(window.location.search);
  const shaderPath = urlParams.get('shader') || '../shaders/basic.frag';

  // Load Fragment Shader
  const fragmentShaderSource = await loadShader(shaderPath);

  // Compile shaders
  const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(
    fragmentShaderSource,
    gl.FRAGMENT_SHADER,
  );

  if (!vertexShader || !fragmentShader) {
    return;
  }

  const program = createProgram(vertexShader, fragmentShader);
  if (!program) return;

  gl.useProgram(program);

  setupQuad(program);

  //get uniform locations
  const u_time = gl.getUniformLocation(program, "u_time");
  const u_resolution = gl.getUniformLocation(program, "u_resolution");
  const u_mouse = gl.getUniformLocation(program, "u_mouse");

  //initial resize
  resize();

  //Animation loop
  const startTime = Date.now();

  function render() {
    const time = (Date.now() - startTime) / 1000.0;

    // set uniforms
    gl.uniform1f(u_time, time);
    gl.uniform2f(u_resolution, canvas.width, canvas.height);
    gl.uniform2f(u_mouse, mouseX, mouseY);

    // Draw
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
  }
  render();
}

main();

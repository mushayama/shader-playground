async function loadShader(path) {
  const response = await fetch(path);
  return await response.text();
}

const urlParams = new URLSearchParams(window.location.search);
const shaderPath = urlParams.get("shader") || "../shaders/basic.frag";

const canvas = document.getElementById("canvas");

const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

const camera = new BABYLON.ArcRotateCamera(
  "camera",
  0,
  0,
  10,
  BABYLON.Vector3.Zero(),
  scene,
);
camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
camera.orthoLeft = -1;
camera.orthoRight = 1;
camera.orthoTop = 1;
camera.orthoBottom = -1;

let mouseX = 0;
let mouseY = 0;
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = canvas.height - (e.clientY - rect.top);
});

window.addEventListener("resize", () => {
  engine.resize();
});

const vertexShader = `
    precision highp float;
    attribute vec3 position;

    void main() {
        gl_Position = vec4(position, 1.0);
    }
`;

async function main() {
  const fragmentShader = await loadShader(shaderPath);

  BABYLON.Effect.ShadersStore["customVertexShader"] = vertexShader;
  BABYLON.Effect.ShadersStore["customFragmentShader"] = fragmentShader;

  const shaderMaterial = new BABYLON.ShaderMaterial(
    "shader",
    scene,
    {
      vertex: "custom",
      fragment: "custom",
    },
    {
      attributes: ["position"],
      uniforms: ["u_time", "u_resolution", "u_mouse"],
      useUbo: false
    },
  );

  const plane = BABYLON.MeshBuilder.CreatePlane("plane", { size: 2 }, scene);
  plane.material = shaderMaterial;

  const startTime = Date.now();

  engine.runRenderLoop(() => {
    const time = (Date.now() - startTime) / 1000.0;

    shaderMaterial.setFloat("u_time", time);
    shaderMaterial.setVector2(
      "u_resolution",
      new BABYLON.Vector2(canvas.width, canvas.height)
    );
    shaderMaterial.setVector2("u_mouse", new BABYLON.Vector2(mouseX, mouseY));

    scene.render();
  });
}

main().catch((err) => {
  console.error("Failed to load shader: ", err);
});

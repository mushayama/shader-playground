import * as THREE from "three";

async function loadShader(path) {
  const response = await fetch(path);
  return await response.text();
}

const urlParams = new URLSearchParams(window.location.search);
const shaderPath = urlParams.get("shader") || "../shaders/basic.frag";

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const mouse = new THREE.Vector2(0, 0);
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = window.innerHeight - e.clientY;
});

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
});

const uniforms = {
  u_time: { value: 0.0 },
  u_resolution: {
    value: new THREE.Vector2(window.innerWidth, window.innerHeight),
  },
  u_mouse: { value: new THREE.Vector2(0, 0) },
};

const vertexShader = `
    void main() {
        gl_Position = vec4(position, 1.0);
    }
`;

async function main() {
  const fragmentShader = await loadShader(shaderPath);

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    uniforms.u_time.value = clock.getElapsedTime();
    uniforms.u_mouse.value.set(mouse.x, mouse.y);

    renderer.render(scene, camera);
  }

  animate();
}
main().catch((err) => {
  console.error("Failed to load shader: ", err);
});

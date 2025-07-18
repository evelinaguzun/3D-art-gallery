import * as THREE from "three";
import { PointerLockControls } from "three-stdlib";

export const scene = new THREE.Scene(); // Create a 3D scene
let camera;
let controls;
let renderer;

export const setupScene = () => {
  // Create a camera that simulates how the human eye sees
  camera = new THREE.PerspectiveCamera(
    60, // Field of view (how much of the scene is visible)
    window.innerWidth / window.innerHeight, // Aspect ratio (width / height)
    0.1, // Near clipping plane (objects closer than this won't be seen)
    1000 // Far clipping plane (objects farther than this won't be seen)
  );
  scene.add(camera); // Add the camera to the scene
  camera.position.set(0, 2, 15); // Position the camera

  // Create the WebGL renderer to draw the scene
  renderer = new THREE.WebGLRenderer({ antialias: false }); // Renderer without anti-aliasing
  renderer.setSize(window.innerWidth, window.innerHeight); // Set renderer size to match the window size
  renderer.setClearColor(0xffffff, 1); // Set background color to white
  document.body.appendChild(renderer.domElement); // Add the renderer's canvas to the page

  renderer.shadowMap.enabled = true; // Enable shadows in the scene
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use soft shadows for a smoother effect

  // Set up mouse and keyboard control for the camera
  controls = new PointerLockControls(camera, renderer.domElement);
  scene.add(controls.getObject()); // Add the camera controls to the scene

  // Update the scene when the window is resized
  window.addEventListener("resize", onWindowResize, false);

  // Function to adjust the camera and renderer when the window size changes
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight; // Adjust the camera's aspect ratio
    camera.updateProjectionMatrix(); // Update the camera's projection matrix
    renderer.setSize(window.innerWidth, window.innerHeight); // Update the renderer size
  }

  return { camera, controls, renderer }; // Return the camera, controls, and renderer to use in other parts of the app
};


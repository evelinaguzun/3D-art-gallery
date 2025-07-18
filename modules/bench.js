import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { GUI } from "lil-gui";

export const loadBenchModel = (scene) => {
  const loader = new GLTFLoader();
  const gui = new GUI();
  gui.hide();

  loader.load("3D-art-gallery/models/modern_bench_2/scene.gltf", (gltf) => {
    const bench = gltf.scene;
    console.log("BENCH", gltf);

    // Iterate through all the meshes in the bench and update their materials
    bench.traverse((child) => {
      if (child.isMesh) {
        console.log("Materials:", child.material);
        console.log("Map Material", child.material.map);
        console.log("Material Name:", child.material.name);
        console.log("Material Type:", child.material.type);
        console.log("UV attributes:", child.geometry.attributes.uv);
      }
    });

    // Settings for the position and scale of the benches
    const positions = [
      { x: -10, y: -3.12, z: 0, rotationY: -Math.PI / 2 }, // Left bench
      { x: 10, y: -3.12, z: 0, rotationY: Math.PI / 2 }, // Right bench
    ];

    // Create and add the two benches to the scene
    positions.forEach((pos) => {
      const newBench = bench.clone(); // Clone the bench

      // Set the position, rotation, and scale of each bench
      newBench.position.set(pos.x, pos.y, pos.z);
      newBench.rotation.set(0, pos.rotationY, 0);
      newBench.scale.set(3, 3, 3);

      // Add the bench to the scene
      scene.add(newBench);
    });
  }, undefined, (error) => {
    console.error("An error occurred while loading the bench model.", error);
  });
};

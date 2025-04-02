// components/SimulationCanvas.jsx
"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Stats } from "@react-three/drei";
import ParticleSystem from "./ParticleSystem"; // Use .jsx
import { BOX_SIZE } from "./simulationStore"; // Use .js

export default function SimulationCanvas() {
  return (
    <div className="w-full h-full bg-gray-800">
      {" "}
      {/* Ensure container takes space */}
      <Canvas
        camera={{ position: [0, 0, BOX_SIZE * 1.5], fov: 50 }}
        frameloop="demand" // Only render when state changes or useFrame runs
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[BOX_SIZE, BOX_SIZE, BOX_SIZE]} intensity={1} />
        <pointLight
          position={[-BOX_SIZE, -BOX_SIZE, -BOX_SIZE]}
          intensity={0.5}
        />

        {/* Controls */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

        {/* Simulation Box Outline (Optional) */}
        <Box args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]} position={[0, 0, 0]}>
          <meshStandardMaterial
            wireframe
            color="gray"
            transparent
            opacity={0.3}
          />
        </Box>

        {/* Particle System */}
        <Suspense fallback={null}>
          <ParticleSystem />
        </Suspense>

        {/* Performance Stats (Optional) */}
        <Stats />
      </Canvas>
    </div>
  );
}

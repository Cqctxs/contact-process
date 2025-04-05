// components/SimulationCanvas.jsx
"use client";

import React, { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Box, Stats } from "@react-three/drei";
import ParticleSystem from "./ParticleSystem";
import { useSimulationStore } from "./simulationStore";

// Inner component to access useThree easily and manage canvas-specific effects
function CanvasContent() {
  const effectiveBoxSize = useSimulationStore(
    (state) => state.effectiveBoxSize
  );
  const { invalidate } = useThree(); // Get invalidate function from R3F

  // Effect to invalidate (force re-render) canvas when box size changes
  useEffect(() => {
    console.log(
      "Effective box size changed to:",
      effectiveBoxSize,
      "Invalidating canvas."
    );
    invalidate();
  }, [effectiveBoxSize, invalidate]);

  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[
          effectiveBoxSize * 0.8,
          effectiveBoxSize * 0.8,
          effectiveBoxSize * 0.8,
        ]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={effectiveBoxSize * 3}
        shadow-camera-left={-effectiveBoxSize * 1.2}
        shadow-camera-right={effectiveBoxSize * 1.2}
        shadow-camera-top={effectiveBoxSize * 1.2}
        shadow-camera-bottom={-effectiveBoxSize * 1.2}
      />
      <pointLight
        position={[-effectiveBoxSize, -effectiveBoxSize, -effectiveBoxSize]}
        intensity={0.3}
      />

      {/* Camera Controls */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

      {/* Visual Simulation Box Outline */}
      <Box
        args={[effectiveBoxSize, effectiveBoxSize, effectiveBoxSize]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          wireframe
          color="white"
          transparent
          opacity={0.5}
        />
      </Box>

      {/* Ground plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -effectiveBoxSize / 2 - 0.1, 0]}
        receiveShadow
      >
        <planeGeometry
          args={[effectiveBoxSize * 1.5, effectiveBoxSize * 1.5]}
        />
        <shadowMaterial opacity={0.3} />
      </mesh>

      {/* Particle System Component */}
      <Suspense fallback={null}>
        <ParticleSystem />
      </Suspense>
    </>
  );
}

// Main export component setting up the Canvas
export default function SimulationCanvas() {
  const initialBoxSize = useSimulationStore.getState().effectiveBoxSize;

  return (
    <div className="w-full h-full bg-gray-800 relative">
      <Canvas
        camera={{
          position: [0, 0, Math.max(15, initialBoxSize * 1.7)],
          fov: 50,
        }}
        frameloop="demand"
        shadows
      >
        <CanvasContent />
      </Canvas>
      <div className="absolute bottom-2 left-2">
        <Stats />
      </div>
    </div>
  );
}

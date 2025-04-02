// app/simulation/page.jsx
"use client"; // Required for hooks
import React, { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Controls from "../components/Controls"; // Use .jsx
import { useSimulationStore } from "../components/simulationStore"; // Use .js

// Dynamically import the SimulationCanvas
const SimulationCanvas = dynamic(
  () => import("../components/SimulationCanvas"),
  {
    // Use .jsx
    ssr: false,
    loading: () => (
      <p className="flex-grow flex items-center justify-center bg-gray-800 text-white">
        Loading 3D Canvas...
      </p>
    ),
  }
);

export default function HomePage() {
  const resetSimulation = useSimulationStore((state) => state.resetSimulation);
  // Check if particles array has content, indicating initialization might have happened
  const particlesInitialized = useSimulationStore(
    (state) => state.particles.length > 0
  );

  // Initialize particle state only once on component mount if needed
  useEffect(() => {
    // Only reset if particles aren't already present
    if (!particlesInitialized) {
      console.log("Initializing simulation state...");
      resetSimulation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSimulation]); // Add resetSimulation to dependency array as per linting rules, though its identity is stable

  return (
    <>
      <Head>
        <title>Contact Process Simulation (JS)</title>
        <meta
          name="description"
          content="Chemical equilibrium simulation using Next.js, Tailwind, and Three.js (JavaScript version)"
        />
      </Head>

      <main className="flex flex-col md:flex-row h-screen bg-gray-200">
        {/* Controls Panel */}
        <div className="w-full md:w-auto md:min-w-[300px] p-4 overflow-y-auto">
          <Controls />
        </div>

        {/* Simulation Canvas - Takes remaining space */}
        <div className="flex-grow h-[60vh] md:h-full">
          <SimulationCanvas />
        </div>
      </main>
    </>
  );
}

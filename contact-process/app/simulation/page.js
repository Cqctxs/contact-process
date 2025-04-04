// app/simulation/page.jsx
"use client"; // Required for hooks
import React, { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Controls from "../components/Controls"; // Correct relative path
import { useSimulationStore } from "../components/simulationStore"; // Correct relative path

// Dynamically import the SimulationCanvas to avoid SSR issues
const SimulationCanvas = dynamic(
  () => import("../components/SimulationCanvas"), // Correct relative path
  {
    ssr: false, // Ensure it only renders on the client
    loading: () => (
      // Optional loading indicator
      <p className="flex-grow flex items-center justify-center bg-gray-800 text-white">
        Loading 3D Canvas...
      </p>
    ),
  }
);

// Renamed component function for clarity (e.g., if using named exports later)
export default function SimulationPage() {
  const resetSimulation = useSimulationStore((state) => state.resetSimulation);
  // Check if particles array has content, indicating initialization might have happened
  // This check helps prevent re-initializing if navigating back to the page
  const particlesInitialized = useSimulationStore(
    (state) => state.particles.length > 0
  );

  // Initialize particle state only once on component mount if needed
  useEffect(() => {
    // Only reset if particles aren't already present from previous state or store init
    if (!particlesInitialized) {
      console.log("Initializing simulation state...");
      resetSimulation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <Head>
        <title>Contact Process Simulation (JS)</title>
        <meta
          name="description"
          content="Chemical equilibrium simulation using Next.js, Tailwind, and Three.js (JavaScript version)"
        />
      </Head>

      {/* Main layout using Flexbox */}
      <main className="flex flex-col md:flex-row h-screen bg-gray-200 overflow-hidden">
        {" "}
        {/* Prevent scrolling on main */}
        {/* Controls Panel */}
        <div className="w-full md:w-auto md:min-w-[320px] p-4 overflow-y-auto shrink-0">
          {" "}
          {/* Allow controls to scroll if needed */}
          <Controls />
        </div>
        {/* Simulation Canvas - Takes remaining space */}
        <div className="flex-grow h-[60vh] md:h-full">
          {" "}
          {/* Ensure canvas container fills space */}
          <SimulationCanvas />
        </div>
      </main>
    </>
  );
}

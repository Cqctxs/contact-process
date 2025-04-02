// components/Controls.jsx
"use client"; // Need client component for hooks and interactivity

import React from "react";
import { useSimulationStore, PARTICLE_TYPES } from "./simulationStore"; // Use .js extension

export default function Controls() {
  const {
    initialSO2,
    setInitialSO2,
    initialO2,
    setInitialO2,
    initialSO3,
    setInitialSO3,
    temperature,
    setTemperature,
    isRunning,
    toggleRunning,
    resetSimulation,
    particles, // Get current particle counts
    equilibriumReached,
  } = useSimulationStore();

  // Calculate current counts
  const counts = particles.reduce((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1;
    return acc;
  }, {}); // Initialize with empty object

  const handleReset = () => {
    resetSimulation(); // This now rebuilds particles based on initial values
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow space-y-4 min-w-[300px]">
      <h2 className="text-xl font-semibold mb-4">Simulation Controls</h2>

      {/* Initial Amount Sliders */}
      <div className="space-y-2">
        <label
          htmlFor="so2-slider"
          className="block text-sm font-medium text-gray-700"
        >
          Initial SO₂ Amount: {initialSO2}
        </label>
        <input
          id="so2-slider"
          type="range"
          min="0"
          max="200"
          step="1"
          value={initialSO2}
          onChange={(e) => setInitialSO2(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          disabled={isRunning} // Disable if running
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="o2-slider"
          className="block text-sm font-medium text-gray-700"
        >
          Initial O₂ Amount: {initialO2}
        </label>
        <input
          id="o2-slider"
          type="range"
          min="0"
          max="100"
          step="1"
          value={initialO2}
          onChange={(e) => setInitialO2(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          disabled={isRunning}
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="so3-slider"
          className="block text-sm font-medium text-gray-700"
        >
          Initial SO₃ Amount: {initialSO3}
        </label>
        <input
          id="so3-slider"
          type="range"
          min="0"
          max="100"
          step="1"
          value={initialSO3}
          onChange={(e) => setInitialSO3(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          disabled={isRunning}
        />
      </div>

      {/* Temperature Slider */}
      <div className="space-y-2">
        <label
          htmlFor="temp-slider"
          className="block text-sm font-medium text-gray-700"
        >
          Temperature (Relative): {temperature}
        </label>
        <input
          id="temp-slider"
          type="range"
          min="0"
          max="100"
          step="1"
          value={temperature}
          onChange={(e) => setTemperature(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <p className="text-xs text-gray-500">
          Higher temp favors reverse reaction (less SO₃).
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={toggleRunning}
          className={`px-4 py-2 rounded font-semibold text-white ${
            isRunning
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isRunning ? "Pause" : "Play"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded font-semibold text-white bg-blue-500 hover:bg-blue-600"
        >
          Reset
        </button>
      </div>

      {/* Display Current Counts */}
      <div className="mt-4 p-3 bg-white rounded border border-gray-200">
        <h3 className="font-semibold mb-2">Current Particle Counts:</h3>
        <p>SO₂: {counts[PARTICLE_TYPES.SO2] || 0}</p>
        <p>O₂: {counts[PARTICLE_TYPES.O2] || 0}</p>
        <p>SO₃: {counts[PARTICLE_TYPES.SO3] || 0}</p>
        {equilibriumReached && (
          <p className="text-green-600 font-bold mt-2">
            Equilibrium Reached (Approx.)
          </p>
        )}
      </div>
    </div>
  );
}

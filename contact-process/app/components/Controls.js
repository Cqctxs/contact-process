// components/Controls.jsx
"use client";

import React from "react";
import { useSimulationStore, PARTICLE_TYPES } from "./simulationStore";

export default function Controls() {
  // Destructure state and actions from the Zustand store
  const {
    initialSO2,
    setInitialSO2,
    initialO2,
    setInitialO2,
    initialSO3,
    setInitialSO3,
    temperatureC,
    setTemperatureC,
    pressureFactor,
    setPressureFactor,
    catalystActive,
    setCatalystActive,
    isRunning,
    toggleRunning,
    resetSimulation,
    particles,
    equilibriumReached,
  } = useSimulationStore();

  // Calculate current particle counts for display
  const counts = particles.reduce((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1;
    return acc;
  }, {});

  // Handler for the reset button
  const handleReset = () => {
    resetSimulation();
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
          // Note: Disabling sliders while running might be desired, but we allow changes
          // while paused, so we don't disable them here anymore. Reset is needed
          // to apply initial amounts if changed *while running*.
          // disabled={isRunning}
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
          // disabled={isRunning}
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
          // disabled={isRunning}
        />
      </div>

      {/* Temperature Slider (Numerical) */}
      <div className="space-y-2">
        <label
          htmlFor="temp-slider"
          className="block text-sm font-medium text-gray-700"
        >
          Temperature (°C): {temperatureC}
        </label>
        <input
          id="temp-slider"
          type="range"
          min="200"
          max="700"
          step="5"
          value={temperatureC}
          onChange={(e) => setTemperatureC(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <p className="text-xs text-gray-500">
          Higher temp increases rate but favors reactants (less SO₃). Optimal ≈
          450°C.
        </p>
      </div>

      {/* Pressure Slider */}
      <div className="space-y-2">
        <label
          htmlFor="pressure-slider"
          className="block text-sm font-medium text-gray-700"
        >
          Pressure Factor: {pressureFactor.toFixed(1)}x
        </label>
        <input
          id="pressure-slider"
          type="range"
          min="0.5"
          max="3.0"
          step="0.1"
          value={pressureFactor}
          onChange={(e) => setPressureFactor(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <p className="text-xs text-gray-500">
          Higher pressure favors products (more SO₃) due to fewer gas moles.
        </p>
      </div>

      {/* Catalyst Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          id="catalyst-checkbox"
          type="checkbox"
          checked={catalystActive}
          onChange={(e) => setCatalystActive(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="catalyst-checkbox"
          className="text-sm font-medium text-gray-700"
        >
          Use Catalyst (V₂O₅)
        </label>
        <p className="text-xs text-gray-500 ml-auto">
          Speeds up reaction rate.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={toggleRunning}
          className={`px-4 py-2 rounded font-semibold text-white transition-colors duration-150 ${
            isRunning
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isRunning ? "Pause" : "Play"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-150"
        >
          Reset
        </button>
      </div>

      {/* Display Current Particle Counts */}
      <div className="mt-4 p-3 bg-white rounded border border-gray-200">
        <h3 className="font-semibold mb-2">Current Particle Counts:</h3>
        <p>
          <span className="inline-block w-3 h-3 rounded-full bg-[#FFFF00] mr-1"></span>{" "}
          SO₂: {counts[PARTICLE_TYPES.SO2] || 0}
        </p>
        <p>
          <span className="inline-block w-3 h-3 rounded-full bg-[#FF0000] mr-1"></span>{" "}
          O₂: {counts[PARTICLE_TYPES.O2] || 0}
        </p>
        <p>
          <span className="inline-block w-3 h-3 rounded-full bg-[#0000FF] mr-1"></span>{" "}
          SO₃: {counts[PARTICLE_TYPES.SO3] || 0}
        </p>
        {equilibriumReached && (
          <p className="text-green-600 font-bold mt-2">
            Equilibrium Reached (Approx.)
          </p>
        )}
      </div>
    </div>
  );
}

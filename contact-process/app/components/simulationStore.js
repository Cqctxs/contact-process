// components/simulationStore.js
import { create } from "zustand";

// Define particle types and colors
export const PARTICLE_TYPES = {
  SO2: "SO2",
  O2: "O2",
  SO3: "SO3",
};

export const PARTICLE_COLORS = {
  [PARTICLE_TYPES.SO2]: "#FFFF00", // Yellow
  [PARTICLE_TYPES.O2]: "#FF0000", // Red
  [PARTICLE_TYPES.SO3]: "#0000FF", // Blue
};

// Base size for default pressure - Ensure this is defined BEFORE use
export const BASE_BOX_SIZE = 10;

// Simple ID generator
let nextParticleId = 0;
const generateId = () => nextParticleId++;

// Helper for random velocity generation with minimum magnitude
const randomVelocity = (scale) => {
  let vx, vy, vz, magSq;
  const minMagSq = (scale * 0.1) ** 2; // Ensure velocity isn't near zero
  do {
    vx = (Math.random() - 0.5) * scale;
    vy = (Math.random() - 0.5) * scale;
    vz = (Math.random() - 0.5) * scale;
    magSq = vx * vx + vy * vy + vz * vz;
  } while (magSq < minMagSq);
  return [vx, vy, vz];
};

// Helper function for creating initial particles
const createInitialParticle = (type, boxSize) => ({
  id: generateId(),
  type,
  position: [
    (Math.random() - 0.5) * boxSize * 0.9,
    (Math.random() - 0.5) * boxSize * 0.9,
    (Math.random() - 0.5) * boxSize * 0.9,
  ],
  velocity: randomVelocity(0.1), // Ensure min speed
});

// Helper to adjust particle count directly (used when paused)
const adjustParticleCount = (get, set, type, targetCount) => {
  const currentParticles = get().particles;
  const currentCount = currentParticles.filter((p) => p.type === type).length;
  const difference = targetCount - currentCount;
  const boxSize = get().effectiveBoxSize; // Use current box size

  if (difference > 0) {
    // Add particles
    const particlesToAdd = [];
    for (let i = 0; i < difference; i++) {
      particlesToAdd.push({
        id: generateId(),
        type,
        position: [
          (Math.random() - 0.5) * boxSize * 0.9,
          (Math.random() - 0.5) * boxSize * 0.9,
          (Math.random() - 0.5) * boxSize * 0.9,
        ],
        velocity: randomVelocity(0.01), // Tiny velocity even when added paused
      });
    }
    set((state) => ({ particles: [...state.particles, ...particlesToAdd] }));
  } else if (difference < 0) {
    // Remove particles (randomly select which ones to remove)
    const particlesToRemove = currentParticles
      .filter((p) => p.type === type)
      .slice(0, Math.abs(difference));
    const idsToRemove = new Set(particlesToRemove.map((p) => p.id));
    set((state) => ({
      particles: state.particles.filter((p) => !idsToRemove.has(p.id)),
    }));
  }
};

// Create the Zustand store
export const useSimulationStore = create((set, get) => ({
  // --- Initial Settings ---
  initialSO2: 50,
  initialO2: 25,
  initialSO3: 10,
  temperatureC: 450,
  pressureFactor: 1.0,
  catalystActive: false,

  // --- Simulation Runtime State ---
  particles: [],
  isRunning: false,
  equilibriumReached: false,
  countsHistory: [],
  effectiveBoxSize: BASE_BOX_SIZE / 1.0, // Initial calculation

  // --- Actions ---
  setInitialSO2: (n) => {
    set({ initialSO2: n });
    if (!get().isRunning) {
      // Adjust live particles only if paused
      adjustParticleCount(get, set, PARTICLE_TYPES.SO2, n);
    }
  },
  setInitialO2: (n) => {
    set({ initialO2: n });
    if (!get().isRunning) {
      adjustParticleCount(get, set, PARTICLE_TYPES.O2, n);
    }
  },
  setInitialSO3: (n) => {
    set({ initialSO3: n });
    if (!get().isRunning) {
      adjustParticleCount(get, set, PARTICLE_TYPES.SO3, n);
    }
  },
  setTemperatureC: (t) => set({ temperatureC: t }),
  setCatalystActive: (active) => set({ catalystActive: active }),

  setPressureFactor: (p) => {
    const oldSize = get().effectiveBoxSize; // Get size BEFORE change
    const newPressureFactor = Math.max(0.1, p); // Ensure positive factor
    const newSize = BASE_BOX_SIZE / newPressureFactor;

    // Calculate scaling factor for positions
    const scaleFactor = oldSize > 1e-6 ? newSize / oldSize : 1.0;

    set((state) => ({
      pressureFactor: newPressureFactor,
      effectiveBoxSize: newSize,
      // Scale existing particle positions relative to the center (0,0,0)
      particles: state.particles.map((particle) => ({
        ...particle,
        position: [
          particle.position[0] * scaleFactor,
          particle.position[1] * scaleFactor,
          particle.position[2] * scaleFactor,
        ],
      })),
      // Reset equilibrium flag as conditions changed
      equilibriumReached: false,
      countsHistory: [],
    }));
    // Invalidation is handled by SimulationCanvas's useEffect
  },

  addParticle: (type, pos, vel) => {
    const { effectiveBoxSize } = get();
    const newParticle = {
      id: generateId(),
      type,
      position: pos || [
        (Math.random() - 0.5) * effectiveBoxSize * 0.9,
        (Math.random() - 0.5) * effectiveBoxSize * 0.9,
        (Math.random() - 0.5) * effectiveBoxSize * 0.9,
      ],
      velocity: vel || randomVelocity(0.1),
    };
    set((state) => ({ particles: [...state.particles, newParticle] }));
  },

  removeParticleById: (id) => {
    set((state) => ({
      particles: state.particles.filter((p) => p.id !== id),
    }));
  },

  removeParticlesByIds: (idsToRemove) => {
    const idSet = new Set(idsToRemove);
    set((state) => ({
      particles: state.particles.filter((p) => !idSet.has(p.id)),
    }));
  },

  updateParticle: (id, updates) => {
    set((state) => ({
      particles: state.particles.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  },

  setParticles: (p) => set({ particles: p }),

  toggleRunning: () =>
    set((state) => ({
      isRunning: !state.isRunning,
      equilibriumReached: false,
      countsHistory: [],
    })),

  resetSimulation: () => {
    nextParticleId = 0;
    const { initialSO2, initialO2, initialSO3, pressureFactor } = get();
    const initialParticles = [];
    const currentSize = BASE_BOX_SIZE / Math.max(0.1, pressureFactor);

    for (let i = 0; i < initialSO2; i++)
      initialParticles.push(
        createInitialParticle(PARTICLE_TYPES.SO2, currentSize)
      );
    for (let i = 0; i < initialO2; i++)
      initialParticles.push(
        createInitialParticle(PARTICLE_TYPES.O2, currentSize)
      );
    for (let i = 0; i < initialSO3; i++)
      initialParticles.push(
        createInitialParticle(PARTICLE_TYPES.SO3, currentSize)
      );

    set({
      particles: initialParticles,
      isRunning: false,
      equilibriumReached: false,
      countsHistory: [],
      effectiveBoxSize: currentSize,
    });
  },
  setEquilibriumReached: (reached) => set({ equilibriumReached: reached }),

  updateCountsHistory: (counts) => {
    const historyLimit = 150;
    set((state) => {
      const newHistory = [...state.countsHistory, counts];
      if (newHistory.length > historyLimit) {
        newHistory.shift();
      }
      return { countsHistory: newHistory };
    });
  },
}));

// components/simulationStore.js
import { create } from "zustand";

// Define particle types and colors (plain JS object)
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

// Constants for the simulation box
export const BOX_SIZE = 10; // Scene units for the boundary

// Create the Zustand store (no TS types)
export const useSimulationStore = create((set, get) => ({
  // --- Initial State ---
  initialSO2: 50,
  initialO2: 25,
  initialSO3: 10,
  temperature: 50, // Mid-range temperature
  particles: [], // Array of particle objects { id, type, position: [x,y,z], velocity: [vx,vy,vz] }
  isRunning: false,
  equilibriumReached: false,

  // --- Actions ---
  setInitialSO2: (n) => set({ initialSO2: n }),
  setInitialO2: (n) => set({ initialO2: n }),
  setInitialSO3: (n) => set({ initialSO3: n }),
  setTemperature: (t) => set({ temperature: t }),

  addParticle: (type, pos, vel) => {
    const newParticle = {
      id: Date.now() + Math.random(), // Simple unique ID
      type,
      position: pos || [
        (Math.random() - 0.5) * BOX_SIZE * 0.9,
        (Math.random() - 0.5) * BOX_SIZE * 0.9,
        (Math.random() - 0.5) * BOX_SIZE * 0.9,
      ],
      velocity: vel || [
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
      ],
    };
    set((state) => ({ particles: [...state.particles, newParticle] }));
  },

  removeParticleById: (id) => {
    set((state) => ({
      particles: state.particles.filter((p) => p.id !== id),
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

  toggleRunning: () => set((state) => ({ isRunning: !state.isRunning })),

  resetSimulation: () => {
    const { initialSO2, initialO2, initialSO3 } = get(); // Removed addParticle from here
    const initialParticles = [];
    // Cannot call addParticle directly here as it causes infinite loop during init sometimes
    // Instead, construct the array directly
    for (let i = 0; i < initialSO2; i++)
      initialParticles.push(createInitialParticle(PARTICLE_TYPES.SO2));
    for (let i = 0; i < initialO2; i++)
      initialParticles.push(createInitialParticle(PARTICLE_TYPES.O2));
    for (let i = 0; i < initialSO3; i++)
      initialParticles.push(createInitialParticle(PARTICLE_TYPES.SO3));

    set({
      particles: initialParticles,
      isRunning: false,
      equilibriumReached: false,
    });
  },
  setEquilibriumReached: (reached) => set({ equilibriumReached: reached }),
}));

// Helper function for reset
const createInitialParticle = (type) => ({
  id: Date.now() + Math.random(),
  type,
  position: [
    (Math.random() - 0.5) * BOX_SIZE * 0.9,
    (Math.random() - 0.5) * BOX_SIZE * 0.9,
    (Math.random() - 0.5) * BOX_SIZE * 0.9,
  ],
  velocity: [
    (Math.random() - 0.5) * 0.1,
    (Math.random() - 0.5) * 0.1,
    (Math.random() - 0.5) * 0.1,
  ],
});

// Initialize particles on load (optional, can be done in a component effect)
// useSimulationStore.getState().resetSimulation(); // Call this carefully, maybe in a useEffect hook in page.js

// components/ParticleSystem.jsx
"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  useSimulationStore,
  PARTICLE_TYPES,
  PARTICLE_COLORS,
} from "./simulationStore";

// Constants
const PARTICLE_RADIUS = 0.15;
const REACTION_DISTANCE_FWD_SQ = 0.8 ** 2;
const REACTION_DISTANCE_REV_SQ = 0.6 ** 2;
const TEMP_REF_K = 450.0 + 273.15;
const CATALYST_FACTOR = 10.0;

// --- Equilibrium Check TUNABLES ---
const MIN_EQ_CHECK_FRAMES = 250; // Increased: Wait longer before starting checks
const REQUIRED_EQ_HISTORY_LEN = 300; // Check stability over this many frames (Keep at 300)
const EQ_REL_FLUCTUATION_THRESHOLD = 0.25; // Allow 25% relative fluctuation (Increased further)
const EQ_ABS_STDDEV_THRESHOLD = 15.0; // Allow stability if absolute std dev is below this (Increased significantly)
// ----------------------------------

// --- Reaction Dynamics TUNABLES ---
const BASE_REACTION_PROBABILITY = 0.04; // Base chance of reaction if conditions met
const REACTION_SPAWN_OFFSET_SCALE = 0.3; // How far apart products spawn
const REACTION_VELOCITY_KICK_SCALE = 0.25; // How fast products fly apart
// ----------------------------------

export default function ParticleSystem() {
  // Zustand state/actions
  const particles = useSimulationStore((state) => state.particles);
  const isRunning = useSimulationStore((state) => state.isRunning); // Subscribe for effect
  const addParticle = useSimulationStore((state) => state.addParticle);
  const removeParticlesByIds = useSimulationStore(
    (state) => state.removeParticlesByIds
  );
  const updateParticle = useSimulationStore((state) => state.updateParticle);
  const setEquilibriumReached = useSimulationStore(
    (state) => state.setEquilibriumReached
  );
  const updateCountsHistory = useSimulationStore(
    (state) => state.updateCountsHistory
  );

  // Refs
  const meshRefs = useRef({});
  const frameCount = useRef(0);
  const { invalidate } = useThree();

  // Memoized THREE objects
  const sphereGeometry = useMemo(
    () => new THREE.SphereGeometry(PARTICLE_RADIUS, 8, 8),
    []
  );
  const materials = useMemo(
    () => ({
      [PARTICLE_TYPES.SO2]: new THREE.MeshStandardMaterial({
        color: PARTICLE_COLORS.SO2,
        metalness: 0.1,
        roughness: 0.8,
      }),
      [PARTICLE_TYPES.O2]: new THREE.MeshStandardMaterial({
        color: PARTICLE_COLORS.O2,
        metalness: 0.1,
        roughness: 0.8,
      }),
      [PARTICLE_TYPES.SO3]: new THREE.MeshStandardMaterial({
        color: PARTICLE_COLORS.SO3,
        metalness: 0.1,
        roughness: 0.8,
      }),
    }),
    []
  );

  // Effect: Cleanup mesh refs, invalidate on particle changes
  useEffect(() => {
    const currentParticleIds = new Set(particles.map((p) => p.id));
    Object.keys(meshRefs.current).forEach((idStr) => {
      const id = Number(idStr);
      if (!currentParticleIds.has(id)) {
        delete meshRefs.current[id];
      }
    });
    invalidate();
  }, [particles, invalidate]);

  // Effect: Reset frame count, invalidate on isRunning change
  useEffect(() => {
    if (!isRunning) {
      frameCount.current = 0;
    } else {
      console.log("Simulation started, invalidating canvas.");
      invalidate();
    }
  }, [isRunning, invalidate]);

  // --- Simulation Loop ---
  useFrame((state, delta) => {
    const running = useSimulationStore.getState().isRunning;
    if (running) {
      invalidate();
    } else {
      return;
    }

    const currentParticles = useSimulationStore.getState().particles;
    if (currentParticles.length === 0) return;
    frameCount.current++;

    const currentTempC = useSimulationStore.getState().temperatureC;
    const currentCatalystActive = useSimulationStore.getState().catalystActive;
    const currentEffectiveBoxSize =
      useSimulationStore.getState().effectiveBoxSize;

    const tempK = currentTempC + 273.15;
    const halfBox = currentEffectiveBoxSize / 2;
    const dt = Math.min(delta, 0.05);

    const speedFactor = Math.sqrt(tempK / TEMP_REF_K);
    const catalystMultiplier = currentCatalystActive ? CATALYST_FACTOR : 1.0;
    const baseProbMultiplier = BASE_REACTION_PROBABILITY * catalystMultiplier;
    const tempRateFactor = Math.max(0.1, tempK / TEMP_REF_K);
    const equilibriumShiftFactor = Math.exp(-6 * (tempK / TEMP_REF_K - 1));
    let forwardProb = Math.max(
      0,
      Math.min(1, baseProbMultiplier * tempRateFactor * equilibriumShiftFactor)
    );
    let reverseProb = Math.max(
      0,
      Math.min(
        1,
        (baseProbMultiplier * tempRateFactor) / equilibriumShiftFactor
      )
    );

    const particlesToRemove = new Set();
    const particlesToAdd = [];

    // --- 1. Movement ---
    currentParticles.forEach((p) => {
      if (particlesToRemove.has(p.id)) return;
      const effectiveVel = [
        p.velocity[0] * speedFactor,
        p.velocity[1] * speedFactor,
        p.velocity[2] * speedFactor,
      ];
      const newPos = [
        p.position[0] + effectiveVel[0] * dt * 60,
        p.position[1] + effectiveVel[1] * dt * 60,
        p.position[2] + effectiveVel[2] * dt * 60,
      ];
      const newVel = [...p.velocity];
      for (let i = 0; i < 3; i++) {
        const limit = halfBox - PARTICLE_RADIUS;
        if (newPos[i] > limit || newPos[i] < -limit) {
          newPos[i] = Math.max(-limit, Math.min(limit, newPos[i]));
          newVel[i] *= -0.95;
        }
      }
      updateParticle(p.id, { position: newPos, velocity: newVel });
      const mesh = meshRefs.current[p.id];
      if (mesh) {
        mesh.position.set(newPos[0], newPos[1], newPos[2]);
      }
    });

    // --- 2. Reactions ---
    const updatedParticles = useSimulationStore.getState().particles;
    let potentialSO2 = updatedParticles.filter(
      (p) => p.type === PARTICLE_TYPES.SO2 && !particlesToRemove.has(p.id)
    );
    let potentialO2 = updatedParticles.filter(
      (p) => p.type === PARTICLE_TYPES.O2 && !particlesToRemove.has(p.id)
    );
    let potentialSO3 = updatedParticles.filter(
      (p) => p.type === PARTICLE_TYPES.SO3 && !particlesToRemove.has(p.id)
    );

    // Forward
    if (potentialSO2.length >= 2 && potentialO2.length >= 1) {
      o2_loop: for (let i = 0; i < potentialO2.length; i++) {
        const o2 = potentialO2[i];
        if (o2 === null || particlesToRemove.has(o2?.id)) continue;
        const nearbySO2 = [];
        for (let j = 0; j < potentialSO2.length; j++) {
          const so2 = potentialSO2[j];
          if (so2 === null || particlesToRemove.has(so2?.id)) continue;
          if (
            distanceSq(o2.position, so2.position) < REACTION_DISTANCE_FWD_SQ
          ) {
            nearbySO2.push(so2);
          }
        }
        if (nearbySO2.length >= 2) {
          nearbySO2.sort(
            (a, b) =>
              distanceSq(o2.position, a.position) -
              distanceSq(o2.position, b.position)
          );
          const so2_1 = nearbySO2[0];
          const so2_2 = nearbySO2[1];
          if (
            distanceSq(so2_1.position, so2_2.position) <
            REACTION_DISTANCE_FWD_SQ
          ) {
            if (Math.random() < forwardProb) {
              particlesToRemove.add(o2.id);
              particlesToRemove.add(so2_1.id);
              particlesToRemove.add(so2_2.id);
              const centerPos = averagePosition([
                o2.position,
                so2_1.position,
                so2_2.position,
              ]);
              particlesToAdd.push({
                type: PARTICLE_TYPES.SO3,
                pos: randomOffset(centerPos, REACTION_SPAWN_OFFSET_SCALE),
                vel: randomVelocity(REACTION_VELOCITY_KICK_SCALE),
              });
              particlesToAdd.push({
                type: PARTICLE_TYPES.SO3,
                pos: randomOffset(centerPos, REACTION_SPAWN_OFFSET_SCALE),
                vel: randomVelocity(REACTION_VELOCITY_KICK_SCALE),
              });
              potentialO2[i] = null;
              const idx1 = potentialSO2.findIndex((p) => p?.id === so2_1.id);
              if (idx1 !== -1) potentialSO2[idx1] = null;
              const idx2 = potentialSO2.findIndex((p) => p?.id === so2_2.id);
              if (idx2 !== -1) potentialSO2[idx2] = null;
            }
          }
        }
      }
    }

    // Reverse
    if (potentialSO3.length >= 2) {
      so3_outer_loop: for (let i = 0; i < potentialSO3.length; i++) {
        const p1 = potentialSO3[i];
        if (p1 === null || particlesToRemove.has(p1?.id)) continue;
        for (let j = i + 1; j < potentialSO3.length; j++) {
          const p2 = potentialSO3[j];
          if (p2 === null || particlesToRemove.has(p2?.id)) continue;
          if (distanceSq(p1.position, p2.position) < REACTION_DISTANCE_REV_SQ) {
            if (Math.random() < reverseProb) {
              particlesToRemove.add(p1.id);
              particlesToRemove.add(p2.id);
              const centerPos = averagePosition([p1.position, p2.position]);
              particlesToAdd.push({
                type: PARTICLE_TYPES.SO2,
                pos: randomOffset(centerPos, REACTION_SPAWN_OFFSET_SCALE),
                vel: randomVelocity(REACTION_VELOCITY_KICK_SCALE),
              });
              particlesToAdd.push({
                type: PARTICLE_TYPES.SO2,
                pos: randomOffset(centerPos, REACTION_SPAWN_OFFSET_SCALE),
                vel: randomVelocity(REACTION_VELOCITY_KICK_SCALE),
              });
              particlesToAdd.push({
                type: PARTICLE_TYPES.O2,
                pos: randomOffset(centerPos, REACTION_SPAWN_OFFSET_SCALE),
                vel: randomVelocity(REACTION_VELOCITY_KICK_SCALE),
              });
              potentialSO3[i] = null;
              potentialSO3[j] = null;
              continue so3_outer_loop;
            }
          }
        }
      }
    }

    // --- 3. Apply Reactions ---
    if (particlesToRemove.size > 0) {
      removeParticlesByIds(Array.from(particlesToRemove));
    }
    if (particlesToAdd.length > 0) {
      particlesToAdd.forEach((p) => addParticle(p.type, p.pos, p.vel));
    }

    // --- 4. Equilibrium Check (Further Improved Thresholds) ---
    if (frameCount.current > MIN_EQ_CHECK_FRAMES) {
      const finalParticles = useSimulationStore.getState().particles;
      const currentCounts = finalParticles.reduce(
        (acc, p) => {
          acc[p.type] = (acc[p.type] || 0) + 1;
          return acc;
        },
        { SO2: 0, O2: 0, SO3: 0 }
      );
      updateCountsHistory(currentCounts); // Add latest counts
      const history = useSimulationStore.getState().countsHistory; // Get full history

      // Check history length (make sure store updates didn't shorten it unexpectedly)
      if (history.length >= REQUIRED_EQ_HISTORY_LEN) {
        let isStable = true;
        const recentHistory = history.slice(-REQUIRED_EQ_HISTORY_LEN); // Use exactly the required length

        for (const type of Object.values(PARTICLE_TYPES)) {
          const countsForType = recentHistory.map((h) => h[type] || 0);
          const avgCount =
            countsForType.reduce((a, b) => a + b, 0) / REQUIRED_EQ_HISTORY_LEN;

          if (avgCount === 0) continue; // Skip if average is zero

          const stdDev = Math.sqrt(
            countsForType.reduce(
              (sumSq, count) => sumSq + (count - avgCount) ** 2,
              0
            ) / REQUIRED_EQ_HISTORY_LEN
          );
          const relativeChange = stdDev / avgCount;

          // Log values for debugging if needed
          // if (frameCount.current % 60 === 0) { // Log occasionally
          //   console.log(`EQ Check - Type: ${type}, Avg: ${avgCount.toFixed(1)}, StdDev: ${stdDev.toFixed(2)}, RelChg: ${relativeChange.toFixed(3)}`);
          // }

          // Check BOTH thresholds: Instability requires significant relative AND absolute fluctuation
          if (
            relativeChange > EQ_REL_FLUCTUATION_THRESHOLD &&
            stdDev > EQ_ABS_STDDEV_THRESHOLD
          ) {
            isStable = false;
            // if (frameCount.current % 60 === 0) { console.log(`  -> INSTABILITY DETECTED for ${type}`); }
            break;
          }
        }
        // if (frameCount.current % 60 === 0) { console.log(`--- Stability Decision: ${isStable} ---`); }
        setEquilibriumReached(isStable);
      } else {
        // if (frameCount.current % 60 === 0) { console.log(` History not long enough (${history.length}/${REQUIRED_EQ_HISTORY_LEN})`); }
        setEquilibriumReached(false); // Not enough history yet
      }
    } else {
      // if (frameCount.current % 60 === 0) { console.log(` Min frames not reached (${frameCount.current}/${MIN_EQ_CHECK_FRAMES})`); }
      setEquilibriumReached(false); // Simulation hasn't run long enough
    }
  }); // End useFrame

  // --- Rendering ---
  return (
    <>
      {particles.map((p) => (
        <mesh
          key={p.id}
          ref={(el) => {
            if (el) meshRefs.current[p.id] = el;
          }}
          position={p.position}
          geometry={sphereGeometry}
          material={materials[p.type]}
          castShadow
        />
      ))}
    </>
  );
}

// --- Helper Functions ---
function distanceSq(p1, p2) {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];
  const dz = p1[2] - p2[2];
  return dx * dx + dy * dy + dz * dz;
}
function averagePosition(positions) {
  const sum = positions.reduce(
    (acc, pos) => {
      acc[0] += pos[0];
      acc[1] += pos[1];
      acc[2] += pos[2];
      return acc;
    },
    [0, 0, 0]
  );
  const n = positions.length;
  if (n === 0) return [0, 0, 0];
  return [sum[0] / n, sum[1] / n, sum[2] / n];
}
function randomOffset(pos, offsetScale) {
  return [
    pos[0] + (Math.random() - 0.5) * offsetScale,
    pos[1] + (Math.random() - 0.5) * offsetScale,
    pos[2] + (Math.random() - 0.5) * offsetScale,
  ];
}
function randomVelocity(scale) {
  let vx, vy, vz, magSq;
  const minMagSq = (scale * 0.1) ** 2;
  do {
    vx = (Math.random() - 0.5) * scale;
    vy = (Math.random() - 0.5) * scale;
    vz = (Math.random() - 0.5) * scale;
    magSq = vx * vx + vy * vy + vz * vz;
  } while (magSq < minMagSq);
  return [vx, vy, vz];
}

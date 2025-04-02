// components/ParticleSystem.jsx
"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  useSimulationStore,
  PARTICLE_TYPES,
  PARTICLE_COLORS,
  BOX_SIZE,
} from "./simulationStore"; // Use .js

const PARTICLE_RADIUS = 0.15; // Visual radius
const REACTION_DISTANCE_FWD = 0.8; // Max distance for 2SO2 + O2 check
const REACTION_DISTANCE_REV = 0.6; // Max distance for 2SO3 check

export default function ParticleSystem() {
  const particles = useSimulationStore((state) => state.particles);
  const isRunning = useSimulationStore((state) => state.isRunning);
  const temperature = useSimulationStore((state) => state.temperature);
  const addParticle = useSimulationStore((state) => state.addParticle);
  const removeParticleById = useSimulationStore(
    (state) => state.removeParticleById
  );
  const updateParticle = useSimulationStore((state) => state.updateParticle);
  const setEquilibriumReached = useSimulationStore(
    (state) => state.setEquilibriumReached
  );

  // Refs for meshes
  const meshRefs = useRef({}); // Plain object, keys will be particle IDs

  // Memoize geometry and materials
  const sphereGeometry = useMemo(
    () => new THREE.SphereGeometry(PARTICLE_RADIUS, 8, 8),
    []
  );
  const materials = useMemo(
    () => ({
      [PARTICLE_TYPES.SO2]: new THREE.MeshStandardMaterial({
        color: PARTICLE_COLORS.SO2,
      }),
      [PARTICLE_TYPES.O2]: new THREE.MeshStandardMaterial({
        color: PARTICLE_COLORS.O2,
      }),
      [PARTICLE_TYPES.SO3]: new THREE.MeshStandardMaterial({
        color: PARTICLE_COLORS.SO3,
      }),
    }),
    []
  );

  // Effect to cleanup refs when particles are removed
  useEffect(() => {
    const currentParticleIds = new Set(particles.map((p) => p.id));
    Object.keys(meshRefs.current).forEach((idStr) => {
      const id = Number(idStr);
      if (!currentParticleIds.has(id)) {
        delete meshRefs.current[id];
      }
    });
  }, [particles]);

  // Simple equilibrium check state
  const reactionHistory = useRef([]); // Store net reaction counts (-1 rev, +1 fwd)
  const historyLength = 100; // Check over last 100 frames

  // --- Simulation Loop ---
  useFrame((state, delta) => {
    if (!isRunning) return;

    const currentParticles = useSimulationStore.getState().particles; // Get latest state directly
    if (!currentParticles.length) return;

    const speedFactor = 0.5 + (temperature / 100) * 1.5; // Temp affects speed
    const halfBox = BOX_SIZE / 2;
    const dt = Math.min(delta, 0.05); // Cap delta time

    // --- Particle Movement & Boundary Collision ---
    currentParticles.forEach((p) => {
      const newPos = [
        p.position[0] + p.velocity[0] * speedFactor * dt * 60,
        p.position[1] + p.velocity[1] * speedFactor * dt * 60,
        p.position[2] + p.velocity[2] * speedFactor * dt * 60,
      ];
      const newVel = [...p.velocity];

      // Boundary checks
      for (let i = 0; i < 3; i++) {
        if (
          newPos[i] > halfBox - PARTICLE_RADIUS ||
          newPos[i] < -halfBox + PARTICLE_RADIUS
        ) {
          newPos[i] = Math.max(
            -halfBox + PARTICLE_RADIUS,
            Math.min(halfBox - PARTICLE_RADIUS, newPos[i])
          );
          newVel[i] *= -0.9;
        }
      }
      // Update particle state in the store
      updateParticle(p.id, { position: newPos, velocity: newVel });

      // Update mesh position visually
      const mesh = meshRefs.current[p.id];
      if (mesh) {
        mesh.position.set(newPos[0], newPos[1], newPos[2]);
      }
    });

    // --- Reaction Logic ---
    const latestParticles = useSimulationStore.getState().particles;
    let netReactionsThisFrame = 0;

    // ** Forward Reaction: 2SO2 + O2 -> 2SO3 **
    const so2Particles = latestParticles.filter(
      (p) => p.type === PARTICLE_TYPES.SO2
    );
    const o2Particles = latestParticles.filter(
      (p) => p.type === PARTICLE_TYPES.O2
    );

    const baseForwardProb = 0.0005 + (temperature / 100) * 0.001;

    if (so2Particles.length >= 2 && o2Particles.length >= 1) {
      // Label for the outer loop
      outerLoop: for (const o2 of o2Particles) {
        const nearbySO2 = so2Particles
          .map((so2) => ({
            particle: so2,
            distSq: distanceSq(so2.position, o2.position),
          }))
          .filter(
            (item) =>
              item.distSq < REACTION_DISTANCE_FWD * REACTION_DISTANCE_FWD
          )
          .sort((a, b) => a.distSq - b.distSq)
          .slice(0, 2);

        if (nearbySO2.length === 2) {
          if (
            distanceSq(
              nearbySO2[0].particle.position,
              nearbySO2[1].particle.position
            ) <
            REACTION_DISTANCE_FWD * REACTION_DISTANCE_FWD
          ) {
            if (Math.random() < baseForwardProb) {
              removeParticleById(o2.id);
              removeParticleById(nearbySO2[0].particle.id);
              removeParticleById(nearbySO2[1].particle.id);
              const centerPos = averagePosition([
                o2.position,
                nearbySO2[0].particle.position,
                nearbySO2[1].particle.position,
              ]);
              addParticle(
                PARTICLE_TYPES.SO3,
                randomOffset(centerPos),
                randomVelocity()
              );
              addParticle(
                PARTICLE_TYPES.SO3,
                randomOffset(centerPos),
                randomVelocity()
              );
              netReactionsThisFrame++;
              continue outerLoop; // Skip to the next iteration of the outer loop
            }
          }
        }
      }
    }

    // ** Reverse Reaction: 2SO3 -> 2SO2 + O2 **
    const so3Particles = latestParticles.filter(
      (p) => p.type === PARTICLE_TYPES.SO3
    );
    const tempFactorReverse = 0.8 + (temperature / 100) * 2.0;
    const baseReverseProb =
      (0.0002 + (temperature / 100) * 0.0004) * tempFactorReverse;

    if (so3Particles.length >= 2) {
      // Label for the outer loop
      outerLoop: for (let i = 0; i < so3Particles.length; i++) {
        for (let j = i + 1; j < so3Particles.length; j++) {
          const p1 = so3Particles[i];
          const p2 = so3Particles[j];
          if (
            distanceSq(p1.position, p2.position) <
            REACTION_DISTANCE_REV * REACTION_DISTANCE_REV
          ) {
            if (Math.random() < baseReverseProb) {
              removeParticleById(p1.id);
              removeParticleById(p2.id);
              const centerPos = averagePosition([p1.position, p2.position]);
              addParticle(
                PARTICLE_TYPES.SO2,
                randomOffset(centerPos),
                randomVelocity()
              );
              addParticle(
                PARTICLE_TYPES.SO2,
                randomOffset(centerPos),
                randomVelocity()
              );
              addParticle(
                PARTICLE_TYPES.O2,
                randomOffset(centerPos),
                randomVelocity()
              );
              netReactionsThisFrame--;
              break outerLoop; // Exit both loops
            }
          }
        }
      }
    }

    // Label

    // --- Equilibrium Check ---
    next_frame_processing: reactionHistory.current.push(netReactionsThisFrame);
    if (reactionHistory.current.length > historyLength) {
      reactionHistory.current.shift();
    }
    if (reactionHistory.current.length === historyLength) {
      const netSum = reactionHistory.current.reduce((a, b) => a + b, 0);
      if (Math.abs(netSum) < historyLength * 0.05) {
        setEquilibriumReached(true);
      } else {
        setEquilibriumReached(false);
      }
    } else {
      setEquilibriumReached(false);
    }
  }); // End useFrame

  // Render particles
  return (
    <>
      {particles.map((p) => (
        <mesh
          key={p.id}
          ref={(el) => {
            if (el) meshRefs.current[p.id] = el;
          }} // Assign ref
          position={p.position} // R3F can take arrays for position
          geometry={sphereGeometry}
          material={materials[p.type]}
        />
      ))}
    </>
  );
}

// --- Helper Functions (No type annotations) ---
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
  return [sum[0] / n, sum[1] / n, sum[2] / n];
}

function randomOffset(pos) {
  const offset = 0.1;
  return [
    pos[0] + (Math.random() - 0.5) * offset,
    pos[1] + (Math.random() - 0.5) * offset,
    pos[2] + (Math.random() - 0.5) * offset,
  ];
}

function randomVelocity() {
  const scale = 0.1;
  return [
    (Math.random() - 0.5) * scale,
    (Math.random() - 0.5) * scale,
    (Math.random() - 0.5) * scale,
  ];
}

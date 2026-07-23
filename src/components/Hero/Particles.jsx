import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles({ count = 200 }) {
  const meshRef = useRef(null);
  const { viewport } = useThree();

  // Create initial random positions and motion speeds for particles
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);

    const radius = 6;
    for (let i = 0; i < count; i++) {
      // Position within sphere/cube volume
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      spd[i * 3] = (Math.random() - 0.5) * 0.004;
      spd[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }
    return [pos, spd];
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Update positions with slow drift
      positions[idx] += speeds[idx];
      positions[idx + 1] += speeds[idx + 1];
      positions[idx + 2] += speeds[idx + 2];

      // Wrap around bounds
      if (Math.abs(positions[idx]) > 7) positions[idx] *= -0.9;
      if (Math.abs(positions[idx + 1]) > 7) positions[idx + 1] *= -0.9;
      if (Math.abs(positions[idx + 2]) > 7) positions[idx + 2] *= -0.9;

      // Cursor gentle repulsion
      const dx = positions[idx] - mouseX;
      const dy = positions[idx + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let px = positions[idx];
      let py = positions[idx + 1];
      let pz = positions[idx + 2];

      if (dist < 2.5 && dist > 0.01) {
        const force = (2.5 - dist) * 0.05;
        px += (dx / dist) * force;
        py += (dy / dist) * force;
      }

      dummy.position.set(px, py, pz);
      dummy.scale.setScalar(0.02 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.005);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#8BD8FF" transparent opacity={0.35} />
    </instancedMesh>
  );
}

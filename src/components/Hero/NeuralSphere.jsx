import React, { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const TECH_LABELS = [
  "AI Agents",
  "Backend Architecture",
  "Spring Boot",
  "Automation",
  "Distributed Systems",
  "Java",
  "React",
  "Microservices",
  "PostgreSQL",
  "Docker",
];

export default function NeuralSphere({
  radius = 2.4,
  nodeCount = 180,
  maxDistance = 1.35,
  isMobile = false,
}) {
  const groupRef = useRef(null);
  const sphereGroupRef = useRef(null);
  const nodesMeshRef = useRef(null);
  const linesRef = useRef(null);

  // Drag & Mouse interaction states
  const [isDragging, setIsDragging] = useState(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0, y: 0 });

  // Floating Labels state
  const [activeLabels, setActiveLabels] = useState([]);

  // Generate sphere nodes using Fibonacci sphere algorithm
  const { nodePositions, linePositions } = useMemo(() => {
    const positions = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

    const actualCount = isMobile ? Math.floor(nodeCount * 0.6) : nodeCount;

    for (let i = 0; i < actualCount; i++) {
      const y = 1 - (i / (actualCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      positions.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }

    // Build connections between nearby nodes
    const lines = [];

    for (let i = 0; i < actualCount; i++) {
      for (let j = i + 1; j < actualCount; j++) {
        const dist = positions[i].distanceTo(positions[j]);
        if (dist < maxDistance) {
          lines.push(positions[i].x, positions[i].y, positions[i].z);
          lines.push(positions[j].x, positions[j].y, positions[j].z);
        }
      }
    }

    return {
      nodePositions: positions,
      linePositions: new Float32Array(lines),
    };
  }, [radius, nodeCount, maxDistance, isMobile]);

  // Setup instanced mesh for nodes
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Frame animation loop
  useFrame((state, delta) => {
    if (!sphereGroupRef.current) return;

    const time = state.clock.elapsedTime;

    // 1. Idle Gentle Rotation & Float
    if (!isDragging) {
      // Smoothly return drag rotation to 0
      dragRotation.current.x = THREE.MathUtils.lerp(dragRotation.current.x, 0, delta * 2);
      dragRotation.current.y = THREE.MathUtils.lerp(dragRotation.current.y, 0, delta * 2);

      // Continuous slow Y-rotation
      sphereGroupRef.current.rotation.y += delta * 0.08;

      // Mouse position lerp tilt
      const targetRotX = state.pointer.y * 0.25 + dragRotation.current.x;
      const targetRotZ = -state.pointer.x * 0.25 + dragRotation.current.y;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        delta * 3
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetRotZ,
        delta * 3
      );
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        dragRotation.current.x,
        delta * 8
      );
      sphereGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        sphereGroupRef.current.rotation.y,
        dragRotation.current.y,
        delta * 8
      );
    }

    // Floating Sine Motion
    groupRef.current.position.y = Math.sin(time * 1.2) * 0.08;

    // 2. Animate nodes (subtle pulsing scale)
    if (nodesMeshRef.current) {
      for (let i = 0; i < nodePositions.length; i++) {
        const pos = nodePositions[i];
        dummy.position.copy(pos);

        const pulse = 0.035 + Math.sin(time * 2.5 + i * 0.4) * 0.008;
        dummy.scale.setScalar(pulse);
        dummy.updateMatrix();

        nodesMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      nodesMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Pointer Drag Handlers
  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    dragRotation.current.y += deltaX * 0.005;
    dragRotation.current.x += deltaY * 0.005;

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Node Click Interaction (Spawns temporary tech label)
  const handleNodeClick = (e) => {
    e.stopPropagation();
    if (e.instanceId !== undefined && nodePositions[e.instanceId]) {
      const clickedPos = nodePositions[e.instanceId].clone();
      const randomTech = TECH_LABELS[Math.floor(Math.random() * TECH_LABELS.length)];
      const id = Date.now() + Math.random();

      setActiveLabels((prev) => [...prev.slice(-3), { id, pos: clickedPos, text: randomTech }]);

      // Auto fade label after 2.8s
      setTimeout(() => {
        setActiveLabels((prev) => prev.filter((l) => l.id !== id));
      }, 2800);
    }
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <group ref={sphereGroupRef}>
        {/* Connection Lines Mesh */}
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={linePositions.length / 3}
              array={linePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#78d2ff"
            transparent
            opacity={0.25}
            linewidth={1}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* Instanced Sphere Nodes */}
        <instancedMesh
          ref={nodesMeshRef}
          args={[null, null, nodePositions.length]}
          onClick={handleNodeClick}
          className="cursor-pointer"
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial
            color="#8BD8FF"
            emissive="#3EBEFF"
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.8}
          />
        </instancedMesh>

        {/* Floating Active Tech Labels */}
        {activeLabels.map((label) => (
          <Html key={label.id} position={[label.pos.x, label.pos.y + 0.25, label.pos.z]} center>
            <div className="animate-bounce-short pointer-events-none select-none px-2.5 py-1 text-[11px] font-mono font-semibold text-cyan-200 bg-slate-950/80 border border-cyan-400/50 rounded-full shadow-[0_0_12px_rgba(62,190,255,0.4)] backdrop-blur-md">
              {label.text}
            </div>
          </Html>
        ))}
      </group>
    </group>
  );
}

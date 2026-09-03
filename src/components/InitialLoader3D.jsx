import { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import logoImg from "../assets/optimized/LOGO.webp";

/* ─── Procedural Plasma Core Shaders ─────────────────────────── */
const plasmaVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    
    // Turbulent surface displacement
    vec3 pos = position;
    float displacement = sin(pos.x * 5.0 + uTime * 3.2) 
                       * cos(pos.y * 5.0 + uTime * 2.7) 
                       * sin(pos.z * 5.0 + uTime * 2.1) * 0.085;
    pos += normal * displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const plasmaFragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColorCore;
  uniform vec3 uColorEdge;
  uniform vec3 uColorFlare;

  // Compact pseudo-noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; ++i) {
      v += a * noise(p);
      p = p * 2.1 + vec2(10.0);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.2);

    // Dynamic turbulent motion
    vec2 uvCoord = vUv * 7.0;
    float q = fbm(uvCoord + vec2(uTime * 0.35, uTime * 0.25));
    float r = fbm(uvCoord + 3.5 * q + vec2(uTime * 0.5, -uTime * 0.4));

    vec3 color = mix(uColorCore, uColorEdge, r);
    color += uColorFlare * pow(r, 2.5) * 1.8;
    color += vec3(0.9, 0.98, 1.0) * fresnel * 2.2;

    float alpha = smoothstep(0.18, 0.95, r * 0.85 + fresnel * 0.65);
    gl_FragColor = vec4(color, alpha * 0.82);
  }
`;

/* ─── Starfield Points ────────────────────────────────────────── */
function CosmicStarfield({ count = 2200 }) {
  const pointsRef = useRef();
  
  const { positions, colors, sizes, phaseOffsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const phase = new Float32Array(count);

    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#cffafe"),
      new THREE.Color("#7dd3fc"),
      new THREE.Color("#38bdf8"),
      new THREE.Color("#a78bfa"),
      new THREE.Color("#3b82f6"),
    ];

    for (let i = 0; i < count; i++) {
      // Wide spherical distribution
      const r = THREE.MathUtils.randFloat(8, 40);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      sz[i] = THREE.MathUtils.randFloat(0.8, 3.2);
      phase[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, colors: col, sizes: sz, phaseOffsets: phase };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Wide Outer Cosmic Energy Rings ─────────────────────────── */
function OuterCosmicRings() {
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.04;
      ring1.current.rotation.y = 0.5 + Math.sin(t * 0.1) * 0.05;
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.035;
      ring2.current.rotation.x = -0.6 + Math.cos(t * 0.08) * 0.04;
    }
  });

  return (
    <group>
      {/* Outer sweeping filament 1 */}
      <mesh ref={ring1} rotation={[0.85, 0.4, -0.2]}>
        <torusGeometry args={[7.2, 0.018, 12, 160]} />
        <meshBasicMaterial
          color="#00eeff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer sweeping filament 2 */}
      <mesh ref={ring2} rotation={[-0.7, -0.5, 0.6]}>
        <torusGeometry args={[8.4, 0.022, 12, 180]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Sweeping aura ellipse */}
      <mesh rotation={[0.4, -0.7, 0.8]} scale={[1.35, 0.75, 1]}>
        <torusGeometry args={[6.4, 0.016, 10, 140]} />
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ─── Dynamic Turbulent Plasma Core with 'M' Logo ─────────────── */
function TurbulentPlasmaCore({ isHovered }) {
  const groupRef = useRef();
  const plasmaShaderRef = useRef();
  const shockwaveRef = useRef();
  const logoPlaneRef = useRef();
  const coronaGlowRef = useRef();
  const texture = useTexture(logoImg);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorCore: { value: new THREE.Color("#0284c7") },
      uColorEdge: { value: new THREE.Color("#00f0ff") },
      uColorFlare: { value: new THREE.Color("#ffffff") },
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Update plasma shader
    if (plasmaShaderRef.current) {
      plasmaShaderRef.current.uniforms.uTime.value = t;
    }

    // Gentle 3D floating & perspective breathing
    if (groupRef.current) {
      groupRef.current.position.y = 0.35 + Math.sin(t * 1.6) * 0.06;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.1;
      groupRef.current.rotation.x = Math.cos(t * 0.7) * 0.05;
    }

    // Logo gentle floating inside
    if (logoPlaneRef.current) {
      logoPlaneRef.current.rotation.y = Math.sin(t * 1.1) * 0.08;
    }

    // Coronal pulse
    if (coronaGlowRef.current) {
      const pulse = 1 + Math.sin(t * 4.0) * 0.09;
      coronaGlowRef.current.scale.set(pulse, pulse, 1);
    }

    // Periodic shockwave ripple
    if (shockwaveRef.current) {
      const cycle = (t * 0.65) % 1;
      const s = 1.15 + cycle * 2.1;
      shockwaveRef.current.scale.set(s, s, 1);
      shockwaveRef.current.material.opacity = (1 - cycle) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.35, 0]}>
      {/* 1. Deep Core Ambient Backlight */}
      <pointLight color="#00f0ff" intensity={9} distance={10} />
      <pointLight color="#a855f7" intensity={5} distance={7} position={[0, 0, -1]} />

      {/* 2. Concentric Shockwave Ripple */}
      <mesh ref={shockwaveRef}>
        <ringGeometry args={[1.08, 1.16, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Outer Coronal Flare Disc */}
      <mesh ref={coronaGlowRef}>
        <circleGeometry args={[1.75, 64]} />
        <meshBasicMaterial
          color="#00d2ff"
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 4. Radiant Electric Coronal Prominence Ring */}
      <mesh rotation={[0.2, 0.1, 0]}>
        <torusGeometry args={[1.22, 0.035, 16, 120]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#38bdf8"
          emissiveIntensity={4.5}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh rotation={[-0.2, -0.3, 0.4]}>
        <torusGeometry args={[1.28, 0.025, 16, 120]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#c084fc"
          emissiveIntensity={3.5}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 5. Dynamic Turbulent Plasma Shell */}
      <mesh scale={isHovered ? 1.45 : 1.35}>
        <sphereGeometry args={[1.02, 64, 64]} />
        <shaderMaterial
          ref={plasmaShaderRef}
          vertexShader={plasmaVertexShader}
          fragmentShader={plasmaFragmentShader}
          uniforms={uniforms}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 6. Inner Glass Sphere Boundary */}
      <mesh scale={1.12}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial
          color="#0369a1"
          roughness={0.1}
          metalness={0.1}
          transmission={0.85}
          thickness={0.5}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 7. Original 'M' Logo & 'MIHIR' Emblem - Crystal Clear */}
      <mesh ref={logoPlaneRef} position={[0, -0.06, 0.16]}>
        <planeGeometry args={[2.05, 2.05]} />
        <meshBasicMaterial
          map={texture}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ─── Incandescent Orbital Filaments ─────────────────────────── */
function OrbitalFilament({
  tiltX = 0,
  tiltY = 0,
  tiltZ = 0,
  radius = 2.4,
  tubeRadius = 0.016,
  color = "#00eeff",
  speed = 1,
  pulseSpeed = 2.5,
  opacity = 0.7,
}) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * speed * 0.18;
      const pulse = 0.85 + Math.sin(t * pulseSpeed) * 0.15;
      meshRef.current.material.opacity = opacity * pulse;
    }
  });

  return (
    <group position={[0, 0.35, 0]} rotation={[tiltX, tiltY, tiltZ]}>
      {/* Primary incandescent filament ring */}
      <mesh ref={meshRef}>
        <torusGeometry args={[radius, tubeRadius, 16, 160]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3.5}
          transparent
          opacity={opacity}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ─── Detailed Orbiting 3D Satellite ─────────────────────────── */
function OrbitingSatellite({ orbitRadius = 2.85, speed = 0.45 }) {
  const satelliteGroupRef = useRef();
  const trailPointsRef = useRef([]);
  const TRAIL_LENGTH = 10;

  const trailIndices = useMemo(() => Array.from({ length: TRAIL_LENGTH }, (_, i) => i), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + 1.2;
    const x = Math.cos(t) * orbitRadius * 1.15;
    const z = Math.sin(t) * orbitRadius * 0.85;
    const y = Math.sin(t) * 0.65;

    if (satelliteGroupRef.current) {
      satelliteGroupRef.current.position.set(x, 0.35 + y, z);
      // Face tangential to trajectory
      const nextT = t + 0.05;
      const nextX = Math.cos(nextT) * orbitRadius * 1.15;
      const nextZ = Math.sin(nextT) * orbitRadius * 0.85;
      const nextY = Math.sin(nextT) * 0.65;
      satelliteGroupRef.current.lookAt(nextX, 0.35 + nextY, nextZ);
    }

    // Trailing engine plume
    trailPointsRef.current.forEach((ref, i) => {
      if (!ref) return;
      const trailT = t - (i + 1) * 0.04;
      ref.position.set(
        Math.cos(trailT) * orbitRadius * 1.15,
        0.35 + Math.sin(trailT) * 0.65,
        Math.sin(trailT) * orbitRadius * 0.85
      );
      ref.material.opacity = (1 - (i + 1) / TRAIL_LENGTH) * 0.65;
    });
  });

  return (
    <group rotation={[0.45, -0.3, 0.4]}>
      {/* Trailing ion plume points */}
      {trailIndices.map((i) => (
        <mesh key={i} ref={(el) => (trailPointsRef.current[i] = el)}>
          <sphereGeometry args={[0.035 * (1 - i / TRAIL_LENGTH), 8, 8]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* The Detailed Satellite */}
      <group ref={satelliteGroupRef}>
        {/* Main satellite body / bus */}
        <mesh>
          <boxGeometry args={[0.16, 0.16, 0.22]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.85}
            roughness={0.25}
            emissive="#1e293b"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Golden insulation cap */}
        <mesh position={[0, 0, 0.115]}>
          <boxGeometry args={[0.15, 0.15, 0.02]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Communication dish antenna */}
        <group position={[0, 0.12, 0]} rotation={[-Math.PI / 4, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.09, 0.01, 0.03, 16, 1, true]} />
            <meshStandardMaterial color="#f8fafc" side={THREE.DoubleSide} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.06]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>

        {/* Solar Panel Wing - Left */}
        <group position={[-0.32, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.42, 0.16, 0.015]} />
            <meshStandardMaterial
              color="#1e3a8a"
              emissive="#1d4ed8"
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {/* Solar cell grid lines */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[0.4, 0.14]} />
            <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.4} />
          </mesh>
        </group>

        {/* Solar Panel Wing - Right */}
        <group position={[0.32, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.42, 0.16, 0.015]} />
            <meshStandardMaterial
              color="#1e3a8a"
              emissive="#1d4ed8"
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[0.4, 0.14]} />
            <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.4} />
          </mesh>
        </group>

        {/* Ion thruster glow */}
        <mesh position={[0, 0, -0.13]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Orbiting Comet with Glowing Curved Plasma Tail ─────────── */
function OrbitingComet({ radius, speed, angle, size, color, tilt }) {
  const cometHeadRef = useRef();
  const trailRefs = useRef([]);
  const TAIL_COUNT = 9;
  const tailData = useMemo(() => Array.from({ length: TAIL_COUNT }, (_, i) => i), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed * 0.8 + angle;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;

    if (cometHeadRef.current) {
      cometHeadRef.current.position.set(x, 0, z);
    }

    trailRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const trailT = t - (i + 1) * (0.05 / Math.abs(speed));
      ref.position.set(Math.cos(trailT) * radius, 0, Math.sin(trailT) * radius);
      ref.material.opacity = (1 - (i + 1) / TAIL_COUNT) * 0.75;
    });
  });

  return (
    <group rotation={tilt}>
      {/* Curved glowing plasma tail */}
      {tailData.map((i) => (
        <mesh key={i} ref={(el) => (trailRefs.current[i] = el)}>
          <sphereGeometry args={[size * (1 - i / TAIL_COUNT) * 0.9, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
      {/* Brilliant Comet Head */}
      <mesh ref={cometHeadRef}>
        <sphereGeometry args={[size * 1.15, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

/* ─── Diverse Cosmic Debris: Asteroids, Crystals, Comets ─────── */
function CosmicDebrisField() {
  const debrisGroupRef = useRef();

  // Asteroids, crystals, and iridescent droplets
  const items = useMemo(() => {
    return [
      // Rocky asteroids
      { type: "asteroid", radius: 2.1, speed: 0.65, angle: 0.3, size: 0.08, tilt: [0.3, 0.1, 0.2] },
      { type: "asteroid", radius: 2.9, speed: -0.45, angle: 2.1, size: 0.11, tilt: [-0.4, 0.3, -0.1] },
      { type: "asteroid", radius: 3.4, speed: 0.52, angle: 4.2, size: 0.075, tilt: [0.6, -0.2, 0.5] },

      // Prismatic faceted crystals
      { type: "crystal", radius: 2.3, speed: -0.7, angle: 1.1, size: 0.09, color: "#a855f7", tilt: [0.5, 0.5, 0] },
      { type: "crystal", radius: 3.1, speed: 0.4, angle: 3.4, size: 0.1, color: "#38bdf8", tilt: [-0.3, -0.2, 0.4] },

      // Iridescent metallic space droplets
      { type: "droplet", radius: 1.85, speed: 0.85, angle: 2.8, size: 0.08, tilt: [0.2, -0.4, 0.1] },
      { type: "droplet", radius: 2.75, speed: -0.55, angle: 5.3, size: 0.095, tilt: [-0.5, 0.2, -0.4] },
    ];
  }, []);

  // Glowing energy comets with trailing tails
  const comets = useMemo(() => {
    return [
      { radius: 2.05, speed: 1.25, angle: 0.8, size: 0.065, color: "#00eeff", tilt: [0.4, 0.2, -0.3] },
      { radius: 3.25, speed: -0.95, angle: 3.8, size: 0.07, color: "#38bdf8", tilt: [-0.6, 0.4, 0.3] },
      { radius: 2.5, speed: 1.05, angle: 5.1, size: 0.06, color: "#818cf8", tilt: [0.8, -0.3, 0.4] },
    ];
  }, []);

  const meshRefs = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    items.forEach((item, idx) => {
      const mesh = meshRefs.current[idx];
      if (!mesh) return;

      const currentAngle = item.angle + t * item.speed * 0.7;
      const x = Math.cos(currentAngle) * item.radius;
      const z = Math.sin(currentAngle) * item.radius;
      mesh.position.set(x, 0, z);

      // Tumbling rotation
      mesh.rotation.x += 0.02;
      mesh.rotation.y += 0.03;
      mesh.rotation.z += 0.015;
    });
  });

  return (
    <group ref={debrisGroupRef} position={[0, 0.35, 0]}>
      {/* Orbiting Comets with curving luminous tails */}
      {comets.map((comet, idx) => (
        <OrbitingComet key={`comet-${idx}`} {...comet} />
      ))}

      {/* Orbiting Asteroids, Crystals & Iridescent Droplets */}
      {items.map((item, idx) => {
        return (
          <group key={idx} rotation={item.tilt}>
            <mesh ref={(el) => (meshRefs.current[idx] = el)}>
              {item.type === "asteroid" && (
                <>
                  <dodecahedronGeometry args={[item.size, 0]} />
                  <meshStandardMaterial
                    color="#475569"
                    roughness={0.9}
                    metalness={0.4}
                    emissive="#0f172a"
                    emissiveIntensity={0.2}
                  />
                </>
              )}

              {item.type === "crystal" && (
                <>
                  <octahedronGeometry args={[item.size, 0]} />
                  <meshStandardMaterial
                    color={item.color}
                    emissive={item.color}
                    emissiveIntensity={2.0}
                    roughness={0.15}
                    metalness={0.8}
                    transparent
                    opacity={0.9}
                  />
                </>
              )}

              {item.type === "droplet" && (
                <>
                  <sphereGeometry args={[item.size, 16, 16]} />
                  <meshPhysicalMaterial
                    color="#e0e7ff"
                    emissive="#818cf8"
                    emissiveIntensity={0.85}
                    roughness={0.08}
                    metalness={0.95}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                  />
                </>
              )}
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ─── Master 3D Space Scene ──────────────────────────────────── */
function DeepSpaceScene({ mousePosRef, isHovered }) {
  const sceneRigRef = useRef();

  useFrame(() => {
    if (sceneRigRef.current && mousePosRef.current) {
      // Cinematic mouse parallax
      const targetRotY = mousePosRef.current.x * 0.28;
      const targetRotX = -mousePosRef.current.y * 0.22;
      sceneRigRef.current.rotation.y += (targetRotY - sceneRigRef.current.rotation.y) * 0.06;
      sceneRigRef.current.rotation.x += (targetRotX - sceneRigRef.current.rotation.x) * 0.06;
    }
  });

  return (
    <group ref={sceneRigRef}>
      {/* Cosmic Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 8, 5]} intensity={1.8} color="#e0f2fe" />
      <pointLight position={[0, 0.35, 3]} intensity={6} color="#00f0ff" />
      <pointLight position={[-4, -2, -3]} intensity={3.5} color="#8b5cf6" />

      {/* Swirling Starfield & Micro-Dust */}
      <CosmicStarfield count={2400} />
      <Sparkles
        count={80}
        scale={10}
        size={2.2}
        speed={0.4}
        color="#38bdf8"
        opacity={0.7}
      />

      {/* Sweeping Wide Outer Cosmic Rings */}
      <OuterCosmicRings />

      {/* Central Turbulent Plasma Core with 'M' Logo */}
      <TurbulentPlasmaCore isHovered={isHovered} />

      {/* Intricate Incandescent Orbital Filaments */}
      <OrbitalFilament
        tiltX={0.4}
        tiltY={0.2}
        tiltZ={-0.3}
        radius={2.1}
        tubeRadius={0.016}
        color="#00eeff"
        speed={1.1}
        opacity={0.75}
      />
      <OrbitalFilament
        tiltX={1.15}
        tiltY={-0.4}
        tiltZ={0.75}
        radius={2.55}
        tubeRadius={0.014}
        color="#c084fc"
        speed={-0.8}
        opacity={0.65}
      />
      <OrbitalFilament
        tiltX={-0.3}
        tiltY={0.8}
        tiltZ={-0.2}
        radius={2.35}
        tubeRadius={0.015}
        color="#38bdf8"
        speed={0.95}
        opacity={0.7}
      />
      <OrbitalFilament
        tiltX={-0.8}
        tiltY={-0.3}
        tiltZ={0.6}
        radius={3.15}
        tubeRadius={0.012}
        color="#06b6d4"
        speed={-0.6}
        opacity={0.55}
      />

      {/* Orbiting Satellite with Solar Wings & Antenna */}
      <OrbitingSatellite orbitRadius={2.8} speed={0.4} />

      {/* Diverse Cosmic Debris: Asteroids, Crystals, Comets, Droplets */}
      <CosmicDebrisField />
    </group>
  );
}

/* ─── Main InitialLoader3D Component ─────────────────────────── */
export default function InitialLoader3D() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const loaderRef = useRef();
  const hudWrapperRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const trackRef = useRef();
  const energyFillRef = useRef();
  const energySparkRef = useRef();
  const percentRef = useRef();
  const diamondStarRef = useRef();

  const mousePosRef = useRef({ x: 0, y: 0 });

  // Progress Counter and Entrance/Exit Animation
  useEffect(() => {
    const tl = gsap.timeline();

    // Initial HUD states
    gsap.set(titleRef.current, { opacity: 0, y: 20, letterSpacing: "0.45em" });
    gsap.set(subtitleRef.current, { opacity: 0, y: 15 });
    gsap.set(trackRef.current, { scaleX: 0, opacity: 0 });
    gsap.set(percentRef.current, { opacity: 0 });
    gsap.set(diamondStarRef.current, { opacity: 0, scale: 0.4 });

    // Entrance sequence
    tl.to(loaderRef.current, { opacity: 1, duration: 0.5, ease: "power1.out" })
      .to(titleRef.current, { opacity: 1, y: 0, letterSpacing: "0.26em", duration: 0.9, ease: "power3.out" }, "-=0.2")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.5")
      .to(trackRef.current, { scaleX: 1, opacity: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.4")
      .to(percentRef.current, { opacity: 1, duration: 0.4 }, "-=0.3")
      .to(diamondStarRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.8)" }, "-=0.3");

    // Progress counter 0 to 100 with Spacecraft Boot Narrative
    const progressVal = { val: 0 };
    gsap.to(progressVal, {
      val: 100,
      duration: 3.0,
      ease: "power2.inOut",
      onUpdate: () => {
        const p = Math.round(progressVal.val);
        setProgress(p);

        if (subtitleRef.current) {
          if (p < 20) {
            subtitleRef.current.innerText = "INITIALIZING NAVIGATION SYSTEMS...";
          } else if (p < 42) {
            subtitleRef.current.innerText = "ESTABLISHING NEURAL CONNECTION...";
          } else if (p < 65) {
            subtitleRef.current.innerText = "CALIBRATING SPATIAL COORDINATES...";
          } else if (p < 88) {
            subtitleRef.current.innerText = "SYNCHRONIZING STAR MAP...";
          } else if (p < 99) {
            subtitleRef.current.innerText = "DEVELOPER UNIVERSE DETECTED...";
          } else {
            subtitleRef.current.innerText = "ENTERING MIHIR'S UNIVERSE";
          }
        }

        if (energyFillRef.current) {
          energyFillRef.current.style.width = `${p}%`;
        }
        if (energySparkRef.current) {
          energySparkRef.current.style.left = `${p}%`;
        }
      },
      onComplete: () => {
        // Spacecraft Forward Hyperspace Transition into Command Center
        const exitTl = gsap.timeline({
          onComplete: () => setIsLoading(false),
        });

        exitTl
          .to(hudWrapperRef.current, {
            y: -35,
            opacity: 0,
            scale: 0.95,
            duration: 0.45,
            ease: "power2.in",
          })
          .to(
            loaderRef.current,
            {
              opacity: 0,
              scale: 1.18,
              filter: "blur(18px)",
              duration: 0.85,
              ease: "power3.inOut",
            },
            "-=0.25"
          );
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Mouse Parallax Driver
  const handleMouseMove = (e) => {
    if (!loaderRef.current) return;
    const rect = loaderRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    const normX = (relX - 0.5) * 2;
    const normY = (relY - 0.5) * 2;

    gsap.to(mousePosRef.current, {
      x: normX,
      y: normY,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "radial-gradient(ellipse at 50% 45%, #081a3e 0%, #030a1c 45%, #01040d 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {/* Background Nebula Haze Overlays */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,165,233,0.14) 0%, rgba(6,182,212,0.06) 45%, transparent 70%)",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 65%)",
          top: "35%",
          left: "45%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          filter: "blur(50px)",
        }}
      />

      {/* Fullscreen Wide-Angle 3D Canvas */}
      <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <Canvas
          camera={{ position: [0, 0, 7.8], fov: 48 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ width: "100%", height: "100%" }}
        >
          <DeepSpaceScene mousePosRef={mousePosRef} isHovered={isHovered} />
        </Canvas>
      </div>

      {/* Spacer for top balance */}
      <div style={{ height: "40px" }} />

      {/* Sleek Glowing Neon HUD Interface */}
      <div
        ref={hudWrapperRef}
        style={{
          position: "relative",
          zIndex: 20,
          marginBottom: "52px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "460px",
          padding: "0 24px",
        }}
      >
        {/* Title: 'MIHIR SINGH NETAM' */}
        <h1
          ref={titleRef}
          style={{
            margin: 0,
            fontSize: "17px",
            fontWeight: 800,
            fontFamily: "'Courier New', Courier, monospace",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            background: "linear-gradient(90deg, #c084fc 0%, #38bdf8 50%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 16px rgba(56,189,248,0.7)) drop-shadow(0 0 32px rgba(168,85,247,0.45))",
            textAlign: "center",
          }}
        >
          MIHIR SINGH NETAM
        </h1>

        {/* Subtitle: 'INITIALIZING SYSTEM ARCHITECTURE...' */}
        <p
          ref={subtitleRef}
          style={{
            margin: "8px 0 20px",
            fontSize: "11px",
            fontFamily: "'Courier New', Courier, monospace",
            letterSpacing: "0.22em",
            color: "rgba(125, 211, 252, 0.85)",
            textTransform: "uppercase",
            textShadow: "0 0 10px rgba(56, 189, 248, 0.75)",
            textAlign: "center",
            animation: "subtlePulse 2.2s ease-in-out infinite",
          }}
        >
          INITIALIZING SYSTEM ARCHITECTURE...
        </p>

        {/* Sophisticated Flowing Neon-Energy Loading Bar */}
        <div
          ref={trackRef}
          style={{
            position: "relative",
            width: "100%",
            height: "9px",
            background: "rgba(3, 10, 28, 0.75)",
            backdropFilter: "blur(12px)",
            borderRadius: "999px",
            border: "1.2px solid rgba(56, 189, 248, 0.45)",
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.35), inset 0 0 8px rgba(0, 0, 0, 0.8)",
            padding: "1.5px",
          }}
        >
          {/* Flowing Energy Fill */}
          <div
            ref={energyFillRef}
            style={{
              position: "relative",
              height: "100%",
              width: "0%",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #1e3a8a 0%, #0284c7 40%, #00f0ff 85%, #ffffff 100%)",
              boxShadow: "0 0 14px rgba(0, 240, 255, 0.9), 0 0 28px rgba(56, 189, 248, 0.5)",
              transition: "width 0.08s linear",
            }}
          />

          {/* Intense Bright Energy Spark at the leading edge */}
          <div
            ref={energySparkRef}
            style={{
              position: "absolute",
              top: "50%",
              left: "0%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 30,
              transition: "left 0.08s linear",
            }}
          >
            {/* Blazing Center Spark */}
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "radial-gradient(circle, #ffffff 20%, #38bdf8 65%, transparent 100%)",
                boxShadow: "0 0 24px #ffffff, 0 0 45px #00f0ff, 0 0 65px #38bdf8",
                animation: "sparkPulse 0.8s ease-in-out infinite alternate",
              }}
            />
            {/* Horizontal Light Flare Beam */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "48px",
                height: "2.5px",
                background: "linear-gradient(90deg, transparent, #ffffff, #00f0ff, transparent)",
                filter: "blur(0.5px)",
              }}
            />
            {/* Vertical Flare Rays */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(90deg)",
                width: "28px",
                height: "2px",
                background: "linear-gradient(90deg, transparent, #ffffff, transparent)",
              }}
            />
          </div>
        </div>

        {/* Integrated '100%' / Progress Percentage */}
        <div
          ref={percentRef}
          style={{
            marginTop: "12px",
            fontSize: "12px",
            fontWeight: 700,
            fontFamily: "'Courier New', Courier, monospace",
            letterSpacing: "0.2em",
            color: "rgba(56, 189, 248, 0.95)",
            textShadow: "0 0 12px rgba(56, 189, 248, 0.8)",
          }}
        >
          {progress}%
        </div>
      </div>

      {/* Four-Point Diamond Star Accent (Bottom Right, matching concept) */}
      <div
        ref={diamondStarRef}
        style={{
          position: "absolute",
          bottom: "48px",
          right: "72px",
          pointerEvents: "none",
          zIndex: 20,
          color: "rgba(147, 197, 253, 0.65)",
          fontSize: "24px",
          filter: "drop-shadow(0 0 10px rgba(56, 189, 248, 0.8))",
          animation: "diamondGlow 3s ease-in-out infinite",
        }}
      >
        ✦
      </div>

      {/* Global Embedded Styles */}
      <style>{`
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.01); }
        }
        @keyframes sparkPulse {
          0% { transform: scale(0.85); opacity: 0.85; }
          100% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes diamondGlow {
          0%, 100% { opacity: 0.4; transform: rotate(0deg) scale(0.9); }
          50% { opacity: 0.85; transform: rotate(45deg) scale(1.15); }
        }
      `}</style>
    </div>
  );
}

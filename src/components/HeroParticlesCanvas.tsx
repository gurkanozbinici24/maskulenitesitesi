"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HeroParticlesCanvasProps {
  activeBook: "kitap1" | "kitap2" | null;
}

/**
 * Yavaş hareket eden altın/kor toz parçacıkları
 */
function GoldenDustParticles({
  activeBook,
}: {
  activeBook: "kitap1" | "kitap2" | null;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const count = 110;

  const { positions, speeds, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const phs = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1; // Z
      spd[i] = 0.08 + Math.random() * 0.16;
      phs[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, speeds: spd, phases: phs };
  }, [count]);

  // Yumuşak dairesel parçacık dokusu oluştur
  const particleTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 248, 220, 1)");
      grad.addColorStop(0.35, "rgba(212, 175, 55, 0.8)");
      grad.addColorStop(0.75, "rgba(212, 175, 55, 0.18)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  const targetColor = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
    const elapsed = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i);
      let x = posAttr.getX(i);

      y += speeds[i] * delta;
      x += Math.sin(elapsed * 0.35 + phases[i]) * 0.0025;

      if (y > 5.2) {
        y = -5.2;
      }

      posAttr.setXY(i, x, y);
    }
    posAttr.needsUpdate = true;

    if (materialRef.current) {
      if (activeBook === "kitap2") {
        targetColor.set("#e5a96d");
      } else if (activeBook === "kitap1") {
        targetColor.set("#f5d76e");
      } else {
        targetColor.set("#d4af37");
      }
      materialRef.current.color.lerp(targetColor, delta * 2.5);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        map={particleTexture ?? undefined}
        size={0.14}
        transparent
        opacity={0.58}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#d4af37"
      />
    </points>
  );
}

/**
 * Hafif sinematik duman / sis katmanları
 */
function SubtleSmokePlumes({
  activeBook,
}: {
  activeBook: "kitap1" | "kitap2" | null;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const smokeTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.16)");
      grad.addColorStop(0.45, "rgba(200, 180, 150, 0.07)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  const clouds = useMemo(
    () => [
      { pos: [-3.5, -1.8, -3.2] as [number, number, number], scale: 6.5, speed: 0.06 },
      { pos: [3.5, -1.6, -3.5] as [number, number, number], scale: 6.8, speed: -0.05 },
      { pos: [0, -2.4, -2.8] as [number, number, number], scale: 7.5, speed: 0.04 },
    ],
    []
  );

  const tintColor = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const elapsed = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, idx) => {
      const mesh = child as THREE.Mesh;
      const cfg = clouds[idx];
      mesh.rotation.z = elapsed * cfg.speed;
      mesh.position.x = cfg.pos[0] + Math.sin(elapsed * 0.25 + idx) * 0.45;

      const mat = mesh.material as THREE.MeshBasicMaterial;
      if (activeBook === "kitap2") {
        tintColor.set("#5c0000");
      } else if (activeBook === "kitap1") {
        tintColor.set("#6b3e26");
      } else {
        tintColor.set("#4a3219");
      }
      mat.color.lerp(tintColor, delta * 2);
    });
  });

  if (!smokeTexture) return null;

  return (
    <group ref={groupRef}>
      {clouds.map((c, idx) => (
        <mesh key={idx} position={c.pos} scale={[c.scale, c.scale * 0.65, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={smokeTexture}
            transparent
            opacity={0.28}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color="#524124"
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroParticlesCanvas({
  activeBook,
}: HeroParticlesCanvasProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-90"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <SubtleSmokePlumes activeBook={activeBook} />
        <GoldenDustParticles activeBook={activeBook} />
      </Canvas>
    </div>
  );
}

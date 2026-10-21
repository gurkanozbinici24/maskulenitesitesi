"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface HeroParticlesCanvasProps {
  activeBook: "kitap1" | "kitap2" | null;
}

/**
 * Hafif sinematik duman / sis katmanları
 */
function SubtleSmokePlumes({
  activeBook,
  isMobile,
}: {
  activeBook: "kitap1" | "kitap2" | null;
  isMobile: boolean;
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
    () =>
      isMobile
        ? [{ pos: [0, -1.8, -3.0] as [number, number, number], scale: 6.0, speed: 0.04 }]
        : [
            { pos: [-3.5, -1.8, -3.2] as [number, number, number], scale: 6.5, speed: 0.06 },
            { pos: [3.5, -1.6, -3.5] as [number, number, number], scale: 6.8, speed: -0.05 },
            { pos: [0, -2.4, -2.8] as [number, number, number], scale: 7.5, speed: 0.04 },
          ],
    [isMobile]
  );

  const tintColor = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const elapsed = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, idx) => {
      const mesh = child as THREE.Mesh;
      const cfg = clouds[idx];
      if (!cfg) return;
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
            opacity={0.26}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color="#4a3219"
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Kitabın ARKASINDAN yükselen yıldız tozları: Vazgeçilmez (sol) altın, Çekicilik (sağ) kırmızı.
 * Parçacıklar kitapların arka katmanında doğar (canvas içeriğin altında), kitabın kenarlarından
 * ve üstünden süzülerek çıkar; her biri yavaşça belirip parlar ve söner.
 */
function BookEmbers({
  side,
  count,
  isMobile,
}: {
  side: "left" | "right";
  count: number;
  isMobile: boolean;
}) {
  const coreRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const renk = useMemo(
    () => (side === "left" ? new THREE.Color("#ffd86b") : new THREE.Color("#ff2a2a")),
    [side]
  );
  const sicak = useMemo(
    () => (side === "left" ? new THREE.Color("#fff4c2") : new THREE.Color("#ff9a7a")),
    [side]
  );

  const doku = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.25, "rgba(255,255,255,0.85)");
      g.addColorStop(0.6, "rgba(255,255,255,0.2)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Her parçacık: yatay ofset, hız, ömür, faz, sapma
  const veri = useMemo(() => {
    const d = Array.from({ length: count }, () => ({
      ox: (Math.random() - 0.5) * 2,
      hiz: 0.22 + Math.random() * 0.32,
      omur: 5 + Math.random() * 5,
      t: Math.random() * 10,
      sapma: (Math.random() - 0.5) * 0.5,
      faz: Math.random() * Math.PI * 2,
      z: -0.6 - Math.random() * 1.4,
    }));
    return d;
  }, [count]);

  const { pos, col, pos2, col2 } = useMemo(
    () => ({
      pos: new Float32Array(count * 3),
      col: new Float32Array(count * 3),
      pos2: new Float32Array(count * 3),
      col2: new Float32Array(count * 3),
    }),
    [count]
  );
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const vw = viewport.width;
    const vh = viewport.height;
    const cx = (side === "left" ? -1 : 1) * vw * (isMobile ? 0.19 : 0.215);
    const yariGen = vw * (isMobile ? 0.12 : 0.075); // kitabın yarı genişliği (yaklaşık)
    const alt = -vh * 0.28; // kitabın alt kısmı
    const ust = vh * 0.48;
    const el = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const p = veri[i];
      p.t += delta;
      if (p.t > p.omur) {
        p.t = 0;
        p.ox = (Math.random() - 0.5) * 2;
        p.hiz = 0.22 + Math.random() * 0.32;
        p.omur = 5 + Math.random() * 5;
        p.sapma = (Math.random() - 0.5) * 0.5;
      }
      const ilerleme = p.t / p.omur; // 0 → 1
      // Kitabın arkasında doğar, yükselirken kenarlara doğru hafifçe açılır
      const x = cx + p.ox * yariGen * (1 + ilerleme * 0.9) + p.sapma * ilerleme + Math.sin(el * 0.6 + p.faz) * 0.06;
      const y = alt + p.t * p.hiz * 1.1;
      const yy = Math.min(y, ust);
      // Belirip parla, sonra sön (+ hafif pırıltı)
      const parlak =
        Math.sin(Math.PI * ilerleme) * (0.75 + 0.25 * Math.sin(el * 3.2 + p.faz)) * (y > ust ? 0 : 1);

      pos[i * 3] = x;
      pos[i * 3 + 1] = yy;
      pos[i * 3 + 2] = p.z;
      pos2[i * 3] = x;
      pos2[i * 3 + 1] = yy;
      pos2[i * 3 + 2] = p.z - 0.01;

      tmp.copy(sicak).lerp(renk, Math.min(1, ilerleme * 1.4)).multiplyScalar(parlak);
      col[i * 3] = tmp.r;
      col[i * 3 + 1] = tmp.g;
      col[i * 3 + 2] = tmp.b;
      tmp.copy(renk).multiplyScalar(parlak * 0.45);
      col2[i * 3] = tmp.r;
      col2[i * 3 + 1] = tmp.g;
      col2[i * 3 + 2] = tmp.b;
    }
    for (const [ref, a, b] of [
      [coreRef, pos, col],
      [glowRef, pos2, col2],
    ] as const) {
      const g = ref.current?.geometry;
      if (!g) continue;
      (g.attributes.position as THREE.BufferAttribute).set(a);
      (g.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (g.attributes.color as THREE.BufferAttribute).set(b);
      (g.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  if (!doku) return null;
  return (
    <group>
      {/* Yumuşak hâle */}
      <points ref={glowRef} key={`g${count}`}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={pos2} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={col2} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          map={doku}
          size={isMobile ? 0.42 : 0.5}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Parlak çekirdek */}
      <points ref={coreRef} key={`c${count}`}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={col} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          map={doku}
          size={isMobile ? 0.13 : 0.15}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function HeroParticlesCanvas({
  activeBook,
}: HeroParticlesCanvasProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-85"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <SubtleSmokePlumes activeBook={activeBook} isMobile={isMobile} />
        {/* Vazgeçilmez: altın · Çekicilik: kırmızı — kitapların arkasından yükselir (toplam ~%20 daha fazla) */}
        <BookEmbers side="left" count={isMobile ? 15 : 21} isMobile={isMobile} />
        <BookEmbers side="right" count={isMobile ? 15 : 21} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}

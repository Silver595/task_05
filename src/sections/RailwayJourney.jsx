// import React, {
//   useRef,
//   useEffect,
//   useState,
//   useCallback,
//   useMemo,
// } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { Stars, PerspectiveCamera } from "@react-three/drei";
// import * as THREE from "three";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { motion, AnimatePresence } from "framer-motion";

// import { EffectComposer, Bloom } from "@react-three/postprocessing";

// gsap.registerPlugin(ScrollTrigger);

// /* ─────────────────────────────────────────────────────────────
//    CONSTANTS
// ───────────────────────────────────────────────────────────── */
// const TRACK_START = -95;
// const TRACK_END   = 95;
// const TRACK_LEN   = 210;

// // Station world-X positions spread evenly across the track
// const STATION_COUNT = 5;
// const stationWorldX = (i) =>
//   TRACK_START + (i / (STATION_COUNT - 1)) * (TRACK_END - TRACK_START);

// // Progress thresholds at which each station sits
// const STATION_PROGRESS = [0, 0.25, 0.5, 0.75, 1.0];

// /* ─────────────────────────────────────────────────────────────
//    STATION DATA
// ───────────────────────────────────────────────────────────── */
// const STATIONS = [
//   {
//     id: 1,
//     name: "Vidyalaya Junction",
//     hindi: "विद्यालय जंक्शन",
//     code: "VDJ",
//     year: "2018–2020",
//     milestone: "10th Standard",
//     tagline: "Where curiosity became ambition",
//     skills: ["Mathematics", "Science", "Logic", "English"],
//     color: "#ff8c00",
//   },
//   {
//     id: 2,
//     name: "Dwadashi Nagar",
//     hindi: "द्वादशी नगर",
//     code: "DWN",
//     year: "2020–2022",
//     milestone: "12th Standard",
//     tagline: "Physics, Chemistry & the first lines of code",
//     skills: ["Physics", "Chemistry", "Maths", "C++"],
//     color: "#ff8c00",
//   },
//   {
//     id: 3,
//     name: "Frontend Colony",
//     hindi: "फ्रंटएंड कॉलोनी",
//     code: "FEC",
//     year: "2022–2023",
//     milestone: "Frontend Development",
//     tagline: "Where the journey into web began",
//     skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
//     color: "#00aaff",
//   },
//   {
//     id: 4,
//     name: "Backend Bazaar",
//     hindi: "बैकएंड बाज़ार",
//     code: "BEB",
//     year: "2023–2024",
//     milestone: "Backend Development",
//     tagline: "APIs, databases, and the engine room of the web",
//     skills: ["Node.js", "Express", "MongoDB", "REST APIs", "PostgreSQL"],
//     color: "#00aaff",
//   },
//   {
//     id: 5,
//     name: "DevOps Dham",
//     hindi: "देवओप्स धाम",
//     code: "DOD",
//     year: "2024–Present",
//     milestone: "DevOps & Cloud Engineering",
//     tagline: "The final frontier — infrastructure as code",
//     skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform", "Jenkins"],
//     color: "#9f7aea",
//   },
// ];

// /* ─────────────────────────────────────────────────────────────
//    SCROLL PROGRESS HOOK
//    Tracks progress ONLY within #rj-scroll-container, regardless
//    of where on the page it lives (after Hero, About, Skills…).
// ───────────────────────────────────────────────────────────── */
// function useScrollProgress() {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     // Wait one frame so GSAP can measure the element after layout
//     const raf = requestAnimationFrame(() => {
//       const trigger = ScrollTrigger.create({
//         trigger: "#rj-scroll-container",
//         // Section enters viewport → start counting
//         start: "top top",
//         // Section fully scrolled through → done
//         end: "bottom bottom",
//         // Scroller is the window (default), but progress is relative
//         // to THIS element's scroll range, not the whole page
//         onUpdate: (self) => setProgress(self.progress),
//         // Clamp so we never get -0.001 artefacts before section is reached
//         onLeaveBack: () => setProgress(0),
//       });
//       // Trigger a refresh so it picks up the correct offsets
//       ScrollTrigger.refresh();
//       return () => trigger.kill();
//     });
//     return () => cancelAnimationFrame(raf);
//   }, []);

//   return progress;
// }

// /* ─────────────────────────────────────────────────────────────
//    TRAIN POSITION EASING — slows near stations
// ───────────────────────────────────────────────────────────── */
// function easedTrainX(progress) {
//   // Raw linear X
//   const rawX = TRACK_START + progress * (TRACK_END - TRACK_START);

//   // Find nearest station
//   let nearest = null;
//   let nearestDist = Infinity;
//   STATION_PROGRESS.forEach((sp, i) => {
//     const dist = Math.abs(progress - sp);
//     if (dist < nearestDist) {
//       nearestDist = dist;
//       nearest = i;
//     }
//   });

//   // If within deceleration zone (±6% of journey around station)
//   const ZONE = 0.06;
//   if (nearestDist < ZONE) {
//     const stX = stationWorldX(nearest);
//     // Blend towards station X as we get closer
//     const blend = Math.max(0, 1 - nearestDist / ZONE);
//     // Ease-in-out: smoothstep
//     const smooth = blend * blend * (3 - 2 * blend);
//     return rawX + (stX - rawX) * smooth * 0.5;
//   }

//   return rawX;
// }

// /* ─────────────────────────────────────────────────────────────
//    TRACK
// ───────────────────────────────────────────────────────────── */
// function Tracks() {
//   const sleeperCount = Math.floor(TRACK_LEN / 1.15);
//   return (
//     <group>
//       {/* Left rail */}
//       <mesh position={[0, 0.055, -0.52]}>
//         <boxGeometry args={[TRACK_LEN, 0.06, 0.09]} />
//         <meshStandardMaterial color="#777" metalness={0.85} roughness={0.25} />
//       </mesh>
//       {/* Right rail */}
//       <mesh position={[0, 0.055, 0.52]}>
//         <boxGeometry args={[TRACK_LEN, 0.06, 0.09]} />
//         <meshStandardMaterial color="#777" metalness={0.85} roughness={0.25} />
//       </mesh>
//       {/* Gravel bed */}
//       <mesh position={[0, -0.02, 0]} receiveShadow>
//         <boxGeometry args={[TRACK_LEN, 0.06, 2.0]} />
//         <meshStandardMaterial color="#2e2a26" roughness={1} />
//       </mesh>
//       {/* Sleepers */}
//       {Array.from({ length: sleeperCount }).map((_, i) => (
//         <mesh
//           key={i}
//           position={[TRACK_START + i * 1.15, 0.02, 0]}
//           receiveShadow
//         >
//           <boxGeometry args={[0.85, 0.09, 1.35]} />
//           <meshStandardMaterial color="#3e2e1e" roughness={0.95} />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    GROUND
// ───────────────────────────────────────────────────────────── */
// function Ground() {
//   // Dry grass tufts (instanced-style via map)
//   const tufts = useMemo(() => {
//     const arr = [];
//     for (let i = 0; i < 80; i++) {
//       const side = i % 2 === 0 ? 1 : -1;
//       arr.push({
//         x: (Math.random() - 0.5) * TRACK_LEN * 0.9,
//         z: side * (2.5 + Math.random() * 14),
//         h: 0.25 + Math.random() * 0.35,
//         hue: 40 + Math.random() * 20,
//         l: 12 + Math.random() * 10,
//       });
//     }
//     return arr;
//   }, []);

//   return (
//     <>
//       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]} receiveShadow>
//         <planeGeometry args={[TRACK_LEN * 1.5, 100]} />
//         <meshStandardMaterial color="#252518" roughness={1} />
//       </mesh>
//       {tufts.map((t, i) => (
//         <mesh key={i} position={[t.x, t.h / 2 - 0.05, t.z]}>
//           <coneGeometry args={[0.12, t.h, 4]} />
//           <meshStandardMaterial
//             color={`hsl(${t.hue}, 25%, ${t.l}%)`}
//             roughness={1}
//           />
//         </mesh>
//       ))}
//     </>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    MOUNTAINS (horizon silhouette)
// ───────────────────────────────────────────────────────────── */
// function Mountains() {
//   const peaks = useMemo(() => {
//     const arr = [];
//     for (let i = 0; i < 14; i++) {
//       arr.push({
//         x: -100 + i * 15 + Math.random() * 8,
//         h: 8 + Math.random() * 12,
//         w: 12 + Math.random() * 10,
//         z: -(28 + Math.random() * 15),
//       });
//     }
//     return arr;
//   }, []);
//   return (
//     <>
//       {peaks.map((p, i) => (
//         <mesh key={i} position={[p.x, p.h / 2 - 0.1, p.z]}>
//           <coneGeometry args={[p.w / 2, p.h, 5]} />
//           <meshStandardMaterial color="#1a1428" roughness={1} />
//         </mesh>
//       ))}
//     </>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    TREES
// ───────────────────────────────────────────────────────────── */
// function Trees() {
//   const trees = useMemo(() => {
//     const arr = [];
//     for (let i = 0; i < 50; i++) {
//       const side = i % 2 === 0 ? 1 : -1;
//       arr.push({
//         x: (Math.random() - 0.5) * TRACK_LEN * 0.88,
//         z: side * (5 + Math.random() * 20),
//         trunkH: 1.2 + Math.random() * 0.8,
//         crownR: 0.55 + Math.random() * 0.45,
//         crownColor: `hsl(${100 + Math.random() * 40}, 30%, ${8 + Math.random() * 7}%)`,
//       });
//     }
//     return arr;
//   }, []);

//   return (
//     <>
//       {trees.map((t, i) => (
//         <group key={i} position={[t.x, 0, t.z]}>
//           <mesh position={[0, t.trunkH / 2, 0]}>
//             <cylinderGeometry args={[0.07, 0.1, t.trunkH, 6]} />
//             <meshStandardMaterial color="#201510" roughness={1} />
//           </mesh>
//           <mesh position={[0, t.trunkH + t.crownR * 0.7, 0]}>
//             <sphereGeometry args={[t.crownR, 6, 5]} />
//             <meshStandardMaterial color={t.crownColor} roughness={1} />
//           </mesh>
//         </group>
//       ))}
//     </>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    HUTS
// ───────────────────────────────────────────────────────────── */
// function Huts() {
//   const huts = useMemo(() => {
//     return Array.from({ length: 14 }).map(() => ({
//       x: (Math.random() - 0.5) * TRACK_LEN * 0.85,
//       z: -(12 + Math.random() * 18),
//       w: 1.4 + Math.random() * 0.6,
//     }));
//   }, []);

//   return (
//     <>
//       {huts.map((h, i) => (
//         <group key={i} position={[h.x, 0, h.z]}>
//           <mesh position={[0, 0.5, 0]}>
//             <boxGeometry args={[h.w, 1.0, h.w * 0.85]} />
//             <meshStandardMaterial color="#1c1510" roughness={1} />
//           </mesh>
//           {/* Flat Indian-style roof */}
//           <mesh position={[0, 1.08, 0]}>
//             <boxGeometry args={[h.w + 0.2, 0.1, h.w * 0.85 + 0.2]} />
//             <meshStandardMaterial color="#2a1a0a" roughness={1} />
//           </mesh>
//         </group>
//       ))}
//     </>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    ELECTRIC POLES
// ───────────────────────────────────────────────────────────── */
// function ElectricPoles() {
//   const count = 22;
//   return (
//     <>
//       {Array.from({ length: count }).map((_, i) => {
//         const x = TRACK_START + 4 + i * (TRACK_LEN / count);
//         return (
//           <group key={i} position={[x, 0, 2.6]}>
//             <mesh position={[0, 2.1, 0]}>
//               <cylinderGeometry args={[0.045, 0.065, 4.2, 5]} />
//               <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
//             </mesh>
//             {/* Cross arm */}
//             <mesh position={[0, 4.0, 0]} rotation={[0, 0, Math.PI / 2]}>
//               <cylinderGeometry args={[0.025, 0.025, 1.1, 4]} />
//               <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
//             </mesh>
//           </group>
//         );
//       })}
//     </>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    STATION PLATFORM
// ───────────────────────────────────────────────────────────── */
// function StationPlatform({ worldX, station }) {
//   return (
//     <group position={[worldX, 0, 0]}>
//       {/* Platform concrete slab */}
//       <mesh position={[0, 0.15, -3.2]} receiveShadow>
//         <boxGeometry args={[14, 0.3, 4.5]} />
//         <meshStandardMaterial color="#343434" roughness={0.85} />
//       </mesh>
//       {/* Yellow safety line */}
//       <mesh position={[0, 0.305, -1.15]}>
//         <boxGeometry args={[14, 0.01, 0.14]} />
//         <meshStandardMaterial
//           color="#f5c518"
//           emissive="#cc9900"
//           emissiveIntensity={0.35}
//         />
//       </mesh>
//       {/* Station building */}
//       <mesh position={[0, 0.85, -5.8]} castShadow>
//         <boxGeometry args={[9, 1.7, 2.2]} />
//         <meshStandardMaterial color="#252030" roughness={0.9} />
//       </mesh>
//       {/* Overhanging roof */}
//       <mesh position={[0, 1.75, -5.8]}>
//         <boxGeometry args={[9.5, 0.12, 2.8]} />
//         <meshStandardMaterial color="#3a2828" roughness={0.9} />
//       </mesh>
//       {/* Platform canopy */}
//       <mesh position={[0, 2.2, -2.2]}>
//         <boxGeometry args={[14, 0.08, 2.8]} />
//         <meshStandardMaterial color="#1e1e2e" metalness={0.5} roughness={0.5} />
//       </mesh>
//       {/* Canopy support poles */}
//       {[-5, 0, 5].map((px, i) => (
//         <group key={i} position={[px, 0.3, -1.2]}>
//           <mesh position={[0, 0.95, 0]}>
//             <cylinderGeometry args={[0.04, 0.04, 1.9, 6]} />
//             <meshStandardMaterial color="#444" roughness={0.5} />
//           </mesh>
//           {/* Lamp */}
//           <mesh position={[0, 1.95, 0]}>
//             <sphereGeometry args={[0.13, 8, 8]} />
//             <meshStandardMaterial
//               color="#ffeeaa"
//               emissive="#ffcc44"
//               emissiveIntensity={2.0}
//             />
//           </mesh>
//           <pointLight
//             position={[px, 2.1, -1.2]}
//             color="#ffcc44"
//             intensity={2.0}
//             distance={7}
//           />
//         </group>
//       ))}
//       {/* 3D Name board */}
//       <group position={[0, 2.65, -1.05]}>
//         {/* Board backing (black border) */}
//         <mesh>
//           <boxGeometry args={[5.6, 1.25, 0.06]} />
//           <meshStandardMaterial color="#111" />
//         </mesh>
//         {/* Yellow board */}
//         <mesh position={[0, 0, 0.04]}>
//           <boxGeometry args={[5.4, 1.1, 0.04]} />
//           <meshStandardMaterial
//             color="#f5c518"
//             emissive="#bb8800"
//             emissiveIntensity={0.3}
//           />
//         </mesh>
//         {/* Station code plate */}
//         <mesh position={[0, -0.88, 0.04]}>
//           <boxGeometry args={[1.2, 0.28, 0.04]} />
//           <meshStandardMaterial color="#cc2200" />
//         </mesh>
//       </group>
//     </group>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    WHEEL GROUP (rotating)
// ───────────────────────────────────────────────────────────── */
// function WheelSet({ x, z, r = 0.22, speedRef }) {
//   const ref = useRef();
//   useFrame((_, delta) => {
//     if (ref.current) {
//       ref.current.rotation.z -= speedRef.current * delta * 3.5;
//     }
//   });
//   return (
//     <group ref={ref} position={[x, r - 0.02, z]} rotation={[0, 0, 0]}>
//       <mesh rotation={[Math.PI / 2, 0, 0]}>
//         <cylinderGeometry args={[r, r, 0.1, 16]} />
//         <meshStandardMaterial color="#222" metalness={0.9} roughness={0.15} />
//       </mesh>
//       {/* Spokes */}
//       {[0, 1, 2, 3].map((s) => (
//         <mesh key={s} rotation={[Math.PI / 2, 0, (Math.PI / 4) * s]}>
//           <boxGeometry args={[0.03, r * 1.8, 0.02]} />
//           <meshStandardMaterial color="#555" metalness={0.7} />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    STEAM PARTICLES
// ───────────────────────────────────────────────────────────── */
// function SteamParticles({ offset = [0, 0, 0], speedRef }) {
//   const ref = useRef();
//   const COUNT = 100;

//   const positions = useMemo(() => {
//     const arr = new Float32Array(COUNT * 3);
//     for (let i = 0; i < COUNT; i++) {
//       arr[i * 3]     = (Math.random() - 0.5) * 0.2;
//       arr[i * 3 + 1] = Math.random() * 4;
//       arr[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
//     }
//     return arr;
//   }, []);

//   const vels = useMemo(() => {
//     return Array.from({ length: COUNT }).map(() => ({
//       vy: 0.018 + Math.random() * 0.025,
//       vx: (Math.random() - 0.5) * 0.006,
//       vz: (Math.random() - 0.5) * 0.006,
//       life: Math.random(),
//     }));
//   }, []);

//   useFrame((_, delta) => {
//     if (!ref.current) return;
//     const intensity = speedRef.current;
//     if (intensity < 0.05) return;
//     const pos = ref.current.geometry.attributes.position.array;
//     for (let i = 0; i < COUNT; i++) {
//       const v = vels[i];
//       v.life += delta * intensity * 0.6;
//       if (v.life > 1) {
//         v.life = 0;
//         pos[i * 3]     = (Math.random() - 0.5) * 0.15;
//         pos[i * 3 + 1] = 0;
//         pos[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
//       }
//       pos[i * 3]     += v.vx * intensity;
//       pos[i * 3 + 1] += v.vy * intensity;
//       pos[i * 3 + 2] += v.vz * intensity;
//     }
//     ref.current.geometry.attributes.position.needsUpdate = true;
//     ref.current.material.opacity = Math.min(0.65, intensity * 0.7);
//   });

//   return (
//     <group position={offset}>
//       <points ref={ref}>
//         <bufferGeometry>
//           <bufferAttribute
//             attach="attributes-position"
//             count={COUNT}
//             array={positions}
//             itemSize={3}
//           />
//         </bufferGeometry>
//         <pointsMaterial
//           color="#d0d0d0"
//           size={0.14}
//           transparent
//           opacity={0.5}
//           depthWrite={false}
//           sizeAttenuation
//         />
//       </points>
//     </group>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    RAIN PARTICLES (Station 4 — Backend Bazaar)
// ───────────────────────────────────────────────────────────── */
// function Rain({ active }) {
//   const ref = useRef();
//   const COUNT = 600;

//   const positions = useMemo(() => {
//     const arr = new Float32Array(COUNT * 3);
//     for (let i = 0; i < COUNT; i++) {
//       arr[i * 3]     = (Math.random() - 0.5) * 30;
//       arr[i * 3 + 1] = Math.random() * 14;
//       arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
//     }
//     return arr;
//   }, []);

//   useFrame((_, delta) => {
//     if (!ref.current || !active) return;
//     const pos = ref.current.geometry.attributes.position.array;
//     for (let i = 0; i < COUNT; i++) {
//       pos[i * 3 + 1] -= delta * 14;
//       if (pos[i * 3 + 1] < -0.5) {
//         pos[i * 3 + 1] = 14;
//         pos[i * 3]     = (Math.random() - 0.5) * 30;
//         pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
//       }
//     }
//     ref.current.geometry.attributes.position.needsUpdate = true;
//   });

//   if (!active) return null;

//   return (
//     <points ref={ref}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={COUNT}
//           array={positions}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         color="#88aacc"
//         size={0.05}
//         transparent
//         opacity={0.45}
//         depthWrite={false}
//         sizeAttenuation
//       />
//     </points>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    FIREWORKS
// ───────────────────────────────────────────────────────────── */
// function Fireworks({ active }) {
//   const ref = useRef();
//   const COUNT = 300;

//   const [positions, vels] = useMemo(() => {
//     const pos = new Float32Array(COUNT * 3);
//     const v = [];
//     for (let i = 0; i < COUNT; i++) {
//       pos[i * 3] = pos[i * 3 + 1] = pos[i * 3 + 2] = 0;
//       const theta = Math.random() * Math.PI * 2;
//       const phi   = Math.random() * Math.PI;
//       const spd   = 0.04 + Math.random() * 0.1;
//       v.push({
//         x: Math.cos(theta) * Math.sin(phi) * spd,
//         y: Math.cos(phi) * spd + 0.025,
//         z: Math.sin(theta) * Math.sin(phi) * spd,
//         life: Math.random(),
//         decay: 0.006 + Math.random() * 0.012,
//         color: Math.random() > 0.5 ? "#ffaa00" : "#ff44aa",
//       });
//     }
//     return [pos, v];
//   }, []);

//   useFrame(() => {
//     if (!ref.current || !active) return;
//     const pos = ref.current.geometry.attributes.position.array;
//     for (let i = 0; i < COUNT; i++) {
//       const v = vels[i];
//       v.life += v.decay;
//       if (v.life > 1) {
//         v.life = 0;
//         pos[i * 3]     = (Math.random() - 0.5) * 6;
//         pos[i * 3 + 1] = 3 + Math.random() * 3;
//         pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
//       }
//       pos[i * 3]     += v.x;
//       pos[i * 3 + 1] += v.y;
//       pos[i * 3 + 2] += v.z;
//       v.y -= 0.0012;
//     }
//     ref.current.geometry.attributes.position.needsUpdate = true;
//   });

//   if (!active) return null;
//   return (
//     <points ref={ref}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={COUNT}
//           array={positions}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         color="#ffaa00"
//         size={0.22}
//         transparent
//         opacity={0.9}
//         depthWrite={false}
//         sizeAttenuation
//       />
//     </points>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    LOCOMOTIVE + BOGIES
// ───────────────────────────────────────────────────────────── */
// function TrainBogie({ offsetX, speedRef }) {
//   return (
//     <group position={[offsetX, 0.36, 0]}>
//       {/* Body */}
//       <mesh castShadow>
//         <boxGeometry args={[2.3, 0.72, 0.92]} />
//         <meshStandardMaterial color="#151520" metalness={0.55} roughness={0.5} />
//       </mesh>
//       {/* Window strip */}
//       <mesh position={[0, 0.18, 0.47]}>
//         <boxGeometry args={[1.85, 0.28, 0.02]} />
//         <meshStandardMaterial color="#1a1206" />
//       </mesh>
//       {/* Individual windows */}
//       {[-0.6, 0, 0.6].map((wx, i) => (
//         <mesh key={i} position={[wx, 0.18, 0.48]}>
//           <boxGeometry args={[0.28, 0.22, 0.01]} />
//           <meshStandardMaterial
//             color="#ffdd55"
//             emissive="#ffaa00"
//             emissiveIntensity={1.1}
//           />
//         </mesh>
//       ))}
//       {/* Door outline */}
//       <mesh position={[0.85, 0.0, 0.475]}>
//         <boxGeometry args={[0.32, 0.65, 0.01]} />
//         <meshStandardMaterial color="#222" />
//       </mesh>
//       {/* Wheels */}
//       <WheelSet x={-0.72} z={-0.46} r={0.19} speedRef={speedRef} />
//       <WheelSet x={-0.72} z={ 0.46} r={0.19} speedRef={speedRef} />
//       <WheelSet x={ 0.72} z={-0.46} r={0.19} speedRef={speedRef} />
//       <WheelSet x={ 0.72} z={ 0.46} r={0.19} speedRef={speedRef} />
//       {/* Underframe */}
//       <mesh position={[0, -0.25, 0]}>
//         <boxGeometry args={[2.1, 0.1, 0.85]} />
//         <meshStandardMaterial color="#111" metalness={0.7} roughness={0.4} />
//       </mesh>
//     </group>
//   );
// }

// function Locomotive({ speedRef }) {
//   return (
//     <group>
//       {/* Boiler cylinder */}
//       <mesh position={[0.3, 0.6, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
//         <cylinderGeometry args={[0.38, 0.40, 3.0, 16]} />
//         <meshStandardMaterial color="#151525" metalness={0.72} roughness={0.28} />
//       </mesh>
//       {/* Boiler front dome */}
//       <mesh position={[1.82, 0.6, 0]} castShadow>
//         <sphereGeometry args={[0.38, 12, 10]} />
//         <meshStandardMaterial color="#151525" metalness={0.72} roughness={0.28} />
//       </mesh>
//       {/* Cab body */}
//       <mesh position={[-1.18, 0.88, 0]} castShadow>
//         <boxGeometry args={[0.95, 0.82, 0.98]} />
//         <meshStandardMaterial color="#151525" metalness={0.5} roughness={0.5} />
//       </mesh>
//       {/* Cab roof */}
//       <mesh position={[-1.18, 1.32, 0]}>
//         <boxGeometry args={[1.05, 0.1, 1.0]} />
//         <meshStandardMaterial color="#0e0e1e" metalness={0.4} roughness={0.6} />
//       </mesh>
//       {/* Cab windows */}
//       {[-0.45, 0.45].map((wz, i) => (
//         <mesh key={i} position={[-1.18, 0.9, wz]}>
//           <boxGeometry args={[0.05, 0.32, 0.28]} />
//           <meshStandardMaterial
//             color="#ffdd55"
//             emissive="#ffaa00"
//             emissiveIntensity={1.5}
//           />
//         </mesh>
//       ))}
//       {/* Front cowcatcher */}
//       <mesh position={[2.1, 0.25, 0]} rotation={[0, 0, -0.25]}>
//         <boxGeometry args={[0.6, 0.18, 0.78]} />
//         <meshStandardMaterial color="#333340" metalness={0.7} roughness={0.3} />
//       </mesh>
//       {/* Front plate */}
//       <mesh position={[1.92, 0.6, 0]}>
//         <boxGeometry args={[0.08, 0.78, 0.82]} />
//         <meshStandardMaterial color="#3a3a55" metalness={0.8} roughness={0.2} />
//       </mesh>
//       {/* Chimney base */}
//       <mesh position={[0.9, 0.99, 0]}>
//         <cylinderGeometry args={[0.09, 0.13, 0.32, 10]} />
//         <meshStandardMaterial color="#0a0a14" metalness={0.6} roughness={0.4} />
//       </mesh>
//       {/* Chimney cap */}
//       <mesh position={[0.9, 1.22, 0]}>
//         <cylinderGeometry args={[0.13, 0.09, 0.12, 10]} />
//         <meshStandardMaterial color="#0a0a14" metalness={0.6} roughness={0.4} />
//       </mesh>
//       {/* Red accent stripe */}
//       <mesh position={[0.3, 0.25, 0]}>
//         <boxGeometry args={[3.0, 0.065, 0.84]} />
//         <meshStandardMaterial
//           color="#cc1111"
//           emissive="#990000"
//           emissiveIntensity={0.4}
//         />
//       </mesh>
//       {/* Headlight housing */}
//       <mesh position={[1.97, 0.75, 0]}>
//         <boxGeometry args={[0.05, 0.22, 0.22]} />
//         <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
//       </mesh>
//       {/* Headlight bulb */}
//       <mesh position={[2.0, 0.75, 0]}>
//         <sphereGeometry args={[0.08, 8, 8]} />
//         <meshStandardMaterial
//           color="#ffffff"
//           emissive="#ffffcc"
//           emissiveIntensity={3.0}
//         />
//       </mesh>
//       {/* Headlight beam (point light) */}
//       <pointLight
//         position={[3.5, 0.75, 0]}
//         color="#ffeeaa"
//         intensity={5}
//         distance={14}
//       />
//       {/* Loco wheels */}
//       <WheelSet x={ 0.8} z={-0.43} r={0.24} speedRef={speedRef} />
//       <WheelSet x={ 0.8} z={ 0.43} r={0.24} speedRef={speedRef} />
//       <WheelSet x={-0.1} z={-0.43} r={0.24} speedRef={speedRef} />
//       <WheelSet x={-0.1} z={ 0.43} r={0.24} speedRef={speedRef} />
//       <WheelSet x={ 1.7} z={-0.43} r={0.24} speedRef={speedRef} />
//       <WheelSet x={ 1.7} z={ 0.43} r={0.24} speedRef={speedRef} />
//       {/* Bogies behind */}
//       <TrainBogie offsetX={-3.0} speedRef={speedRef} />
//       <TrainBogie offsetX={-5.4} speedRef={speedRef} />
//       <TrainBogie offsetX={-7.8} speedRef={speedRef} />
//     </group>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    CAMERA CONTROLLER
// ───────────────────────────────────────────────────────────── */
// function CameraController({ trainXRef, stationIdxRef, progress }) {
//   const { camera } = useThree();
//   const camPos  = useRef(new THREE.Vector3(-10, 5, 12));
//   const lookAt  = useRef(new THREE.Vector3(0, 1.2, 0));
//   const lerpTgt = useRef(new THREE.Vector3());

//   useFrame(() => {
//     const tx    = trainXRef.current;
//     const sidx  = stationIdxRef.current;
//     const atStn = sidx !== null;

//     let tpx, tpy, tpz, tlx, tly, tlz;

//     if (atStn) {
//       // At station: sweep camera to face the platform board
//       tpx = tx + 1;
//       tpy = 3.8;
//       tpz = 11;
//       tlx = tx + 0.5;
//       tly = 2.0;
//       tlz = -1.5;
//     } else if (progress > 0.88) {
//       // Final approach: dramatic low angle
//       tpx = tx - 6;
//       tpy = 2.8;
//       tpz = 8;
//       tlx = tx + 5;
//       tly = 1.5;
//       tlz = 0;
//     } else {
//       // Moving: behind + slightly above, slight breathe on Y
//       tpx = tx - 9;
//       tpy = 4.2 + Math.sin(progress * Math.PI * 6) * 0.25;
//       tpz = 9.5;
//       tlx = tx + 5;
//       tly = 1.5;
//       tlz = 0;
//     }

//     camPos.current.set(tpx, tpy, tpz);
//     lookAt.current.set(tlx, tly, tlz);

//     // Smooth lerp — faster at station entries
//     const lerpSpeed = atStn ? 0.025 : 0.04;
//     camera.position.lerp(camPos.current, lerpSpeed);

//     // LookAt lerp
//     lerpTgt.current.lerp(lookAt.current, lerpSpeed * 1.2);
//     camera.lookAt(lerpTgt.current);
//   });

//   return null;
// }

// /* ─────────────────────────────────────────────────────────────
//    SKY (dynamic color based on progress)
// ───────────────────────────────────────────────────────────── */
// function DynamicSky({ progress }) {
//   const { scene } = useThree();

//   useEffect(() => {
//     // Dusk orange → deep night purple as progress goes 0 → 1
//     const dusk  = new THREE.Color("#1a0a2e");
//     const night = new THREE.Color("#050310");
//     const sky   = dusk.clone().lerp(night, progress);
//     scene.background = sky;
//     scene.fog = new THREE.FogExp2(sky.getHex(), 0.012 + progress * 0.006);
//   }, [progress, scene]);

//   return null;
// }

// /* ─────────────────────────────────────────────────────────────
//    SCENE ROOT
// ───────────────────────────────────────────────────────────── */
// function Scene({ progress }) {
//   const trainGroupRef = useRef();
//   const trainXRef     = useRef(TRACK_START);
//   const stationIdxRef = useRef(null);
//   const speedRef      = useRef(0);
//   const prevXRef      = useRef(TRACK_START);

//   useFrame(() => {
//     const targetX = easedTrainX(progress);

//     // Lerp train position for buttery smooth movement
//     const currentX = THREE.MathUtils.lerp(
//       trainGroupRef.current?.position.x ?? targetX,
//       targetX,
//       0.08
//     );

//     if (trainGroupRef.current) {
//       trainGroupRef.current.position.x = currentX;
//     }
//     trainXRef.current = currentX;

//     // Speed = delta X per frame
//     const spd = Math.abs(currentX - prevXRef.current) * 2.5;
//     speedRef.current = THREE.MathUtils.lerp(speedRef.current, spd, 0.1);
//     prevXRef.current = currentX;

//     // Detect station proximity
//     let nearIdx = null;
//     STATION_PROGRESS.forEach((sp, i) => {
//       if (Math.abs(progress - sp) < 0.055) nearIdx = i;
//     });
//     stationIdxRef.current = nearIdx;
//   });

//   const rainActive = progress >= 0.69 && progress <= 0.82;
//   const fireworksActive = progress >= 0.96;

//   return (
//     <>
//       <DynamicSky progress={progress} />

//       {/* Lighting */}
//       <ambientLight intensity={0.12} color="#1a1030" />
//       <directionalLight
//         position={[-60, 18, -10]}
//         intensity={0.25}
//         color="#ff5522"
//         castShadow
//         shadow-mapSize={[1024, 1024]}
//         shadow-camera-far={120}
//         shadow-camera-left={-50}
//         shadow-camera-right={50}
//         shadow-camera-top={20}
//         shadow-camera-bottom={-10}
//       />
//       {/* Warm horizon glow */}
//       <pointLight position={[-90, 3, -20]} color="#ff4400" intensity={3} distance={80} />

//       {/* Stars */}
//       <Stars
//         radius={100}
//         depth={60}
//         count={4000}
//         factor={4.5}
//         saturation={0.3}
//         fade
//         speed={0.2}
//       />

//       {/* Environment */}
//       <Ground />
//       <Mountains />
//       <Trees />
//       <Huts />
//       <ElectricPoles />
//       <Tracks />

//       {/* Stations */}
//       {STATIONS.map((station, i) => (
//         <StationPlatform
//           key={station.id}
//           worldX={stationWorldX(i)}
//           station={station}
//         />
//       ))}

//       {/* Rain at station 4 */}
//       <group position={[stationWorldX(3), 0, 0]}>
//         <Rain active={rainActive} />
//       </group>

//       {/* Fireworks at final station */}
//       <group position={[stationWorldX(4), 2, 0]}>
//         <Fireworks active={fireworksActive} />
//       </group>

//       {/* Train */}
//       <group ref={trainGroupRef} position={[TRACK_START, 0, 0]}>
//         <Locomotive speedRef={speedRef} />
//         <SteamParticles offset={[0.9, 1.26, 0]} speedRef={speedRef} />
//       </group>

//       {/* Camera */}
//       <CameraController
//         trainXRef={trainXRef}
//         stationIdxRef={stationIdxRef}
//         progress={progress}
//       />

//       {/* Bloom post-processing */}
//       <EffectComposer>
//         <Bloom
//           intensity={0.7}
//           luminanceThreshold={0.55}
//           luminanceSmoothing={0.4}
//           mipmapBlur
//         />
//       </EffectComposer>
//     </>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    STATION INFO CARD (2D overlay)
// ───────────────────────────────────────────────────────────── */
// function StationCard({ station, visible }) {
//   return (
//     <AnimatePresence>
//       {visible && station && (
//         <motion.div
//           key={station.id}
//           initial={{ x: 60, opacity: 0, scale: 0.97 }}
//           animate={{ x: 0,  opacity: 1, scale: 1.0 }}
//           exit={{   x: 60, opacity: 0, scale: 0.97 }}
//           transition={{ type: "spring", stiffness: 280, damping: 30 }}
//           style={{
//             position: "fixed",
//             right: 28,
//             top: "50%",
//             transform: "translateY(-50%)",
//             zIndex: 100,
//             width: 310,
//             background: "rgba(8, 6, 18, 0.90)",
//             border: `1px solid ${station.color}`,
//             borderRadius: 18,
//             padding: "22px 26px 24px",
//             backdropFilter: "blur(18px)",
//             WebkitBackdropFilter: "blur(18px)",
//             boxShadow: `0 0 40px ${station.color}28, 0 8px 32px rgba(0,0,0,0.6)`,
//             fontFamily: "system-ui, -apple-system, sans-serif",
//           }}
//         >
//           {/* Header row */}
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
//             <div
//               style={{
//                 fontSize: 10,
//                 fontWeight: 700,
//                 letterSpacing: "0.18em",
//                 color: station.color,
//                 border: `1px solid ${station.color}88`,
//                 borderRadius: 5,
//                 padding: "3px 9px",
//                 background: `${station.color}14`,
//               }}
//             >
//               {station.code}
//             </div>
//             <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>
//               {station.year}
//             </div>
//           </div>

//           {/* Station name */}
//           <div style={{
//             color: "#f5c518",
//             fontSize: 21,
//             fontWeight: 800,
//             lineHeight: 1.2,
//             marginBottom: 3,
//             letterSpacing: "-0.01em",
//           }}>
//             {station.name}
//           </div>
//           <div style={{
//             color: "rgba(255,255,255,0.35)",
//             fontSize: 13,
//             marginBottom: 14,
//             fontFamily: "'Noto Sans Devanagari', 'Kohinoor Devanagari', serif",
//           }}>
//             {station.hindi}
//           </div>

//           {/* Divider */}
//           <div style={{
//             height: "0.5px",
//             background: `linear-gradient(to right, ${station.color}66, transparent)`,
//             marginBottom: 14,
//           }} />

//           {/* Milestone */}
//           <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 5 }}>
//             Milestone
//           </div>
//           <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 5 }}>
//             {station.milestone}
//           </div>
//           <div style={{ color: "rgba(255,255,255,0.42)", fontSize: 12, fontStyle: "italic", marginBottom: 16 }}>
//             "{station.tagline}"
//           </div>

//           {/* Skill tags */}
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//             {station.skills.map((skill) => (
//               <motion.span
//                 key={skill}
//                 initial={{ opacity: 0, y: 6 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 }}
//                 style={{
//                   fontSize: 11,
//                   padding: "4px 10px",
//                   borderRadius: 20,
//                   background: `${station.color}16`,
//                   border: `1px solid ${station.color}50`,
//                   color: station.color,
//                   fontWeight: 600,
//                   letterSpacing: "0.03em",
//                 }}
//               >
//                 {skill}
//               </motion.span>
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    PROGRESS BAR (top)
// ───────────────────────────────────────────────────────────── */
// function ProgressBar({ progress, onStationClick }) {
//   return (
//     <div style={{
//       position: "fixed",
//       top: 18,
//       left: "50%",
//       transform: "translateX(-50%)",
//       width: "min(680px, 88vw)",
//       zIndex: 200,
//       userSelect: "none",
//     }}>
//       {/* Labels row */}
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
//         {STATIONS.map((s, i) => {
//           const sp = STATION_PROGRESS[i];
//           const passed = progress >= sp - 0.03;
//           return (
//             <button
//               key={s.id}
//               onClick={() => onStationClick(sp)}
//               style={{
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 padding: 0,
//                 color: passed ? "#f5c518" : "rgba(255,255,255,0.28)",
//                 fontSize: 10,
//                 fontWeight: passed ? 700 : 400,
//                 textAlign: "center",
//                 transition: "color 0.4s",
//                 lineHeight: 1.3,
//                 maxWidth: 80,
//               }}
//             >
//               {s.name.split(" ")[0]}
//               <br />
//               <span style={{ fontSize: 9, opacity: 0.5 }}>{s.code}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Track bar */}
//       <div style={{
//         height: 3,
//         background: "rgba(255,255,255,0.1)",
//         borderRadius: 99,
//         position: "relative",
//       }}>
//         {/* Fill */}
//         <div style={{
//           position: "absolute",
//           left: 0, top: 0, height: "100%",
//           width: `${progress * 100}%`,
//           background: "linear-gradient(to right, #ff8c00, #00aaff, #9f7aea)",
//           borderRadius: 99,
//           transition: "width 0.08s linear",
//         }} />
//         {/* Train emoji cursor */}
//         <div style={{
//           position: "absolute",
//           left: `${progress * 100}%`,
//           top: "50%",
//           transform: "translate(-50%, -50%)",
//           fontSize: 15,
//           pointerEvents: "none",
//           filter: "drop-shadow(0 0 5px #ff8c00)",
//           lineHeight: 1,
//         }}>🚂</div>
//         {/* Station dots */}
//         {STATIONS.map((s, i) => {
//           const sp = STATION_PROGRESS[i];
//           const passed = progress >= sp - 0.03;
//           return (
//             <button
//               key={s.id}
//               onClick={() => onStationClick(sp)}
//               title={s.name}
//               style={{
//                 position: "absolute",
//                 left: `${sp * 100}%`,
//                 top: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: 11,
//                 height: 11,
//                 borderRadius: "50%",
//                 background: passed ? "#f5c518" : "rgba(255,255,255,0.15)",
//                 border: `2px solid ${passed ? "#f5c518" : "rgba(255,255,255,0.25)"}`,
//                 cursor: "pointer",
//                 padding: 0,
//                 outline: "none",
//                 boxShadow: passed ? "0 0 10px #f5c51877" : "none",
//                 transition: "all 0.3s ease",
//                 zIndex: 2,
//               }}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    JOURNEY COMPLETE OVERLAY
// ───────────────────────────────────────────────────────────── */
// function JourneyComplete({ visible }) {
//   return (
//     <AnimatePresence>
//       {visible && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.88, y: 20 }}
//           animate={{ opacity: 1, scale: 1,    y: 0 }}
//           exit={{   opacity: 0, scale: 0.92, y: -10 }}
//           transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
//           style={{
//             position: "fixed",
//             inset: 0,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 150,
//             pointerEvents: "none",
//           }}
//         >
//           <div style={{
//             textAlign: "center",
//             background: "rgba(5, 3, 18, 0.88)",
//             border: "1px solid #9f7aea",
//             borderRadius: 28,
//             padding: "52px 72px",
//             backdropFilter: "blur(24px)",
//             WebkitBackdropFilter: "blur(24px)",
//             boxShadow: "0 0 80px #9f7aea30, 0 20px 60px rgba(0,0,0,0.7)",
//             fontFamily: "system-ui, -apple-system, sans-serif",
//           }}>
//             <div style={{ fontSize: 52, marginBottom: 10, filter: "drop-shadow(0 0 12px #ffaa00)" }}>🚂</div>
//             <div style={{
//               fontSize: 38,
//               fontWeight: 900,
//               color: "#f5c518",
//               marginBottom: 8,
//               letterSpacing: "-0.025em",
//             }}>
//               Journey Complete
//             </div>
//             <div style={{ color: "#9f7aea", fontSize: 16, marginBottom: 6 }}>
//               DevOps Dham — देवओप्स धाम
//             </div>
//             <div style={{
//               height: "0.5px",
//               background: "rgba(159,122,234,0.3)",
//               margin: "18px auto",
//               width: 160,
//             }} />
//             <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 13, lineHeight: 1.7 }}>
//               5 stations · 5 milestones<br />
//               A developer's evolution
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    INTRO HINT
// ───────────────────────────────────────────────────────────── */
// function IntroHint({ visible }) {
//   return (
//     <AnimatePresence>
//       {visible && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0, transition: { duration: 0.8 } }}
//           style={{
//             position: "fixed",
//             bottom: 44,
//             left: "50%",
//             transform: "translateX(-50%)",
//             zIndex: 150,
//             textAlign: "center",
//             pointerEvents: "none",
//             fontFamily: "system-ui, -apple-system, sans-serif",
//           }}
//         >
//           <motion.div
//             animate={{ y: [0, 7, 0] }}
//             transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
//           >
//             <div style={{ fontSize: 22, marginBottom: 6, filter: "drop-shadow(0 0 8px #ff8c00)" }}>↓</div>
//             <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, letterSpacing: "0.06em" }}>
//               Scroll to begin the journey
//             </div>
//             <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, marginTop: 5 }}>
//               Vidyalaya Junction → DevOps Dham
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    RAIN OVERLAY (DOM-level blur + tint at station 4)
// ───────────────────────────────────────────────────────────── */
// function RainOverlay({ active }) {
//   return (
//     <AnimatePresence>
//       {active && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 1.5 }}
//           style={{
//             position: "fixed",
//             inset: 0,
//             zIndex: 50,
//             pointerEvents: "none",
//             background: "rgba(20, 30, 50, 0.18)",
//             backdropFilter: "blur(0.5px)",
//           }}
//         />
//       )}
//     </AnimatePresence>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    MAIN EXPORT
// ───────────────────────────────────────────────────────────── */
// export default function RailwayJourney() {
//   const progress = useScrollProgress();
//   const [activeStation, setActiveStation] = useState(null);
//   // Track whether the railway section is currently in the viewport
//   const [inView, setInView] = useState(false);

//   useEffect(() => {
//     const el = document.getElementById("rj-scroll-container");
//     if (!el) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => setInView(entry.isIntersecting),
//       // Fire as soon as even 1px of the section is visible
//       { threshold: 0 }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     let found = null;
//     STATION_PROGRESS.forEach((sp, i) => {
//       if (Math.abs(progress - sp) < 0.055) found = i;
//     });
//     setActiveStation(found !== null ? STATIONS[found] : null);
//   }, [progress]);

//   const handleStationClick = useCallback((targetProg) => {
//     const el = document.getElementById("rj-scroll-container");
//     if (!el) return;
//     // The scrollable range of THIS element = its full height minus 1 viewport
//     const scrollableHeight = el.scrollHeight - window.innerHeight;
//     // Its top offset on the full page
//     const elTop = el.getBoundingClientRect().top + window.scrollY;
//     // Target absolute page scroll position
//     const targetY = elTop + targetProg * scrollableHeight;
//     window.scrollTo({ top: targetY, behavior: "smooth" });
//   }, []);

//   const rainActive  = progress >= 0.69 && progress <= 0.82;
//   const isComplete  = progress >= 0.96;
//   // Only show intro hint when section is in view AND journey hasn't started
//   const showIntro   = inView && progress < 0.025;

//   return (
//     <div
//       id="rj-scroll-container"
//       style={{ height: "300vh", position: "relative" }}
//     >
//       {/* Sticky 3D canvas */}
//       <div style={{
//         position: "sticky",
//         top: 0,
//         height: "100vh",
//         width: "100%",
//         overflow: "hidden",
//         background: "#0a0a14",
//       }}>
//         <Canvas
//           shadows
//           dpr={[1, 1.5]}
//           gl={{
//             antialias: true,
//             toneMapping: THREE.ACESFilmicToneMapping,
//             toneMappingExposure: 0.9,
//           }}
//           style={{ width: "100%", height: "100%" }}
//         >
//           <PerspectiveCamera makeDefault fov={62} near={0.1} far={280} />
//           <Scene progress={progress} />
//         </Canvas>

//         {/* 2D overlays — only rendered while railway section is in the viewport */}
//         {inView && (
//           <>
//             <ProgressBar progress={progress} onStationClick={handleStationClick} />
//             <StationCard station={activeStation} visible={!!activeStation} />
//             <JourneyComplete visible={isComplete} />
//             <IntroHint visible={showIntro} />
//             <RainOverlay active={rainActive} />
//           </>
//         )}

//         {/* Vignette */}
//         <div style={{
//           position: "absolute",
//           inset: 0,
//           background: "radial-gradient(ellipse 85% 70% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)",
//           pointerEvents: "none",
//           zIndex: 10,
//         }} />
//       </div>
//     </div>
//   );
// }

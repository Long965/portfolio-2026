import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Text, RoundedBox, Cone } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Broad 3D leaf with center crease matching reference image
const BroadLeaf = ({ scale = 1, rotation = [0, 0, 0], position = [0, 0, 0], color = "#8ee000" }) => {
  const leftHalfShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(-0.36, 0.35, -0.4, 0.95, 0, 1.55);
    shape.lineTo(0, 0);
    return shape;
  }, []);

  const rightHalfShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 1.55);
    shape.bezierCurveTo(0.4, 0.95, 0.36, 0.35, 0, 0);
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.02,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.015,
  }), []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Left wing - angled slightly for central V-groove */}
      <mesh rotation={[0, 0.16, 0]}>
        <extrudeGeometry args={[leftHalfShape, extrudeSettings]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.05} side={THREE.DoubleSide} />
      </mesh>
      {/* Right wing - angled slightly for central V-groove */}
      <mesh rotation={[0, -0.16, 0]}>
        <extrudeGeometry args={[rightHalfShape, extrudeSettings]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.05} side={THREE.DoubleSide} />
      </mesh>
      {/* Subtle center spine */}
      <Cylinder args={[0.012, 0.006, 1.55, 8]} position={[0, 0.77, 0.015]}>
        <meshStandardMaterial color="#65a30d" roughness={0.4} />
      </Cylinder>
    </group>
  );
};

// Detailed Potted Plant matching reference photo exactly
const DetailedPottedPlant = ({ position = [2.3, -1, 0.9], rotation = [0, -0.2, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Top White Rim / Collar */}
      <Cylinder args={[0.54, 0.5, 0.16, 32]} position={[0, 0.72, 0]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.25} />
      </Cylinder>

      {/* Soil */}
      <Cylinder args={[0.43, 0.41, 0.08, 32]} position={[0, 0.69, 0]}>
        <meshStandardMaterial color="#382115" roughness={0.9} />
      </Cylinder>

      {/* Upper Pot Body (Taupe Ceramic) */}
      <Cylinder args={[0.48, 0.43, 0.22, 32]} position={[0, 0.53, 0]}>
        <meshStandardMaterial color="#b39a85" roughness={0.4} />
      </Cylinder>

      {/* Middle White Stripe */}
      <Cylinder args={[0.43, 0.4, 0.14, 32]} position={[0, 0.35, 0]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.25} />
      </Cylinder>

      {/* Lower Pot Body (Taupe Ceramic) */}
      <Cylinder args={[0.4, 0.35, 0.22, 32]} position={[0, 0.17, 0]}>
        <meshStandardMaterial color="#b39a85" roughness={0.4} />
      </Cylinder>

      {/* Bottom White Base Ring */}
      <Cylinder args={[0.35, 0.33, 0.08, 32]} position={[0, 0.04, 0]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.25} />
      </Cylinder>

      {/* --- Leaves (Arranged like photo) --- */}
      {/* 1. Main Center Leaf - Tallest, standing upright with slight backward arch */}
      <BroadLeaf 
        position={[0, 0.72, -0.04]} 
        rotation={[-0.15, 0, 0.04]} 
        scale={1.15} 
        color="#94e60b" 
      />

      {/* 2. Left Leaf - Splaying out to the left */}
      <BroadLeaf 
        position={[-0.12, 0.7, 0.02]} 
        rotation={[0.15, 0.22, 0.42]} 
        scale={0.96} 
        color="#84d60a" 
      />

      {/* 3. Right Leaf - Lower, arching broadly to the right */}
      <BroadLeaf 
        position={[0.12, 0.68, 0.05]} 
        rotation={[-0.12, -0.22, -0.55]} 
        scale={0.92} 
        color="#78c808" 
      />

      {/* 4. Front Center Leaf - Fresh sprout arching towards viewer */}
      <BroadLeaf 
        position={[0, 0.7, 0.12]} 
        rotation={[0.35, 0, -0.05]} 
        scale={0.78} 
        color="#a3f018" 
      />

      {/* 5. Back Leaf - Adding lush fullness behind */}
      <BroadLeaf 
        position={[-0.06, 0.72, -0.1]} 
        rotation={[-0.28, 0.25, 0.15]} 
        scale={0.86} 
        color="#70be06" 
      />
    </group>
  );
};

// Particle system for music notes
const MusicNotes = () => {
  const group = useRef();
  const notes = useMemo(() => Array.from({ length: 5 }).map(() => ({
    x: 1.3 + (Math.random() - 0.5) * 0.5,
    y: 1.5 + Math.random(),
    z: -0.4 + (Math.random() - 0.5) * 0.5,
    speed: 0.5 + Math.random() * 0.5,
    offset: Math.random() * Math.PI * 2,
  })), []);

  useFrame((state, delta) => {
    notes.forEach((note, i) => {
      const mesh = group.current.children[i];
      if (mesh) {
        note.y += note.speed * delta;
        note.x += Math.sin(state.clock.elapsedTime * 2 + note.offset) * 0.01;
        if (note.y > 3) {
          note.y = 1.5;
          note.x = 1.3 + (Math.random() - 0.5) * 0.5;
        }
        mesh.position.set(note.x, note.y, note.z);
      }
    });
  });

  return (
    <group ref={group}>
      {notes.map((_, i) => (
        <Text key={i} fontSize={0.6} color="#f97316" outlineWidth={0.02} outlineColor="#000000">
          ♪
        </Text>
      ))}
    </group>
  );
};

// RGB LED Keyboard
const RGBKeyboard = () => {
  const materialRef = useRef();
  
  useFrame((state) => {
    if (materialRef.current) {
      const hue = (state.clock.elapsedTime * 0.8) % 1;
      materialRef.current.color.setHSL(hue, 1, 0.5);
      materialRef.current.emissive.setHSL(hue, 1, 0.5);
    }
  });

  return (
    <RoundedBox args={[1.2, 0.05, 0.4]} radius={0.02} position={[0, 1.12, 0.3]} rotation={[0.05, 0, 0]}>
      <meshStandardMaterial ref={materialRef} emissiveIntensity={1} roughness={0.2} />
    </RoundedBox>
  );
};

// Simulated Syntax Highlighting Code Lines
const CodeLines = () => {
  const lines = [
    { width: 0.5, color: '#f472b6', y: 0 },
    { width: 0.7, color: '#f472b6', y: -0.055 },
    { width: 0.35, color: '#f472b6', y: -0.11 },
    { width: 0.6, color: '#a3e635', y: -0.165 },
    { width: 0.8, color: '#a3e635', y: -0.22 },
    { width: 0.55, color: '#a3e635', y: -0.275 },
    { width: 0.7, color: '#fb923c', y: -0.33 },
    { width: 0.45, color: '#fb923c', y: -0.385 },
    { width: 0.75, color: '#9ca3af', y: -0.47 },
    { width: 0.55, color: '#c084fc', y: -0.525 },
    { width: 0.7, color: '#c084fc', y: -0.58 },
    { width: 1.05, color: '#fbbf24', y: -0.635 }, // long yellow line
    { width: 0.45, color: '#fb923c', y: -0.69 },
    { width: 0.65, color: '#a3e635', y: -0.76 },
    { width: 0.5, color: '#a3e635', y: -0.815 },
    { width: 0.35, color: '#f472b6', y: -0.87 },
  ];

  return (
    <group position={[-0.85, 0.45, 0.06]}>
      {lines.map((line, i) => (
        <Box key={i} args={[line.width, 0.025, 0.01]} position={[line.width / 2, line.y, 0]}>
          <meshBasicMaterial color={line.color} />
        </Box>
      ))}
    </group>
  );
};

// Desk, Chair, Plant, Monitor, Speaker
const AbstractDesk = () => {
  const group = useRef();
  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <group ref={group} position={[0, -1.5, 0]}>
      {/* Desk Base */}
      <RoundedBox args={[4, 0.2, 2]} radius={0.05} position={[0, 1, 0]}>
        <meshStandardMaterial color="#f472b6" roughness={0.3} />
      </RoundedBox>
      {/* Desk Drawer */}
      <RoundedBox args={[1.5, 0.4, 1.8]} radius={0.05} position={[1, 0.7, 0]}>
        <meshStandardMaterial color="#fbcfe8" roughness={0.4} />
      </RoundedBox>
      <Box args={[0.4, 0.05, 0.05]} position={[1, 0.7, 0.92]}>
        <meshStandardMaterial color="#9ca3af" />
      </Box>
      
      {/* Desk Legs */}
      <Cylinder args={[0.06, 0.04, 2]} position={[-1.8, 0, -0.8]}>
        <meshStandardMaterial color="#fbcfe8" />
      </Cylinder>
      <Cylinder args={[0.06, 0.04, 2]} position={[1.8, 0, -0.8]}>
        <meshStandardMaterial color="#fbcfe8" />
      </Cylinder>
      <Cylinder args={[0.06, 0.04, 2]} position={[-1.8, 0, 0.8]}>
        <meshStandardMaterial color="#fbcfe8" />
      </Cylinder>
      <Cylinder args={[0.06, 0.04, 2]} position={[1.8, 0, 0.8]}>
        <meshStandardMaterial color="#fbcfe8" />
      </Cylinder>
      
      {/* Monitor Assembly - Sturdily elevated above desk */}
      <group position={[0, 1.1, -0.5]}>
        {/* Base on Desk */}
        <RoundedBox args={[0.6, 0.03, 0.35]} radius={0.01} position={[0, 0.015, 0]}>
          <meshStandardMaterial color="#374151" roughness={0.3} metalness={0.4} />
        </RoundedBox>
        {/* Sturdy Stand Neck */}
        <Cylinder args={[0.045, 0.05, 0.7, 16]} position={[0, 0.35, -0.06]}>
          <meshStandardMaterial color="#4b5563" roughness={0.3} metalness={0.5} />
        </Cylinder>
        {/* Mounting Hinge */}
        <Box args={[0.2, 0.2, 0.05]} position={[0, 0.65, -0.06]}>
          <meshStandardMaterial color="#1f2937" />
        </Box>

        {/* Elevated Monitor Screen Frame */}
        <group position={[0, 0.95, 0]} rotation={[0.02, 0, 0]}>
          <RoundedBox args={[2.2, 1.35, 0.08]} radius={0.04} position={[0, 0, 0]}>
            <meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.2} />
          </RoundedBox>
          <Box args={[2.1, 1.25, 0.09]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#0f172a" roughness={0.2} />
          </Box>
          {/* Code Lines cleanly inside screen */}
          <CodeLines />
        </group>
      </group>

      {/* Keyboard */}
      <RGBKeyboard />
      
      {/* Mouse */}
      <RoundedBox args={[0.12, 0.06, 0.2]} radius={0.03} position={[0.9, 1.14, 0.3]} rotation={[0, -0.1, 0]}>
        <meshStandardMaterial color="#4b5563" />
      </RoundedBox>

      {/* Speaker */}
      <RoundedBox args={[0.3, 0.5, 0.3]} radius={0.05} position={[1.4, 1.35, -0.4]} rotation={[0, -0.2, 0]}>
        <meshStandardMaterial color="#f59e0b" />
      </RoundedBox>
      {/* Speaker Cone */}
      <Cylinder args={[0.1, 0.1, 0.31]} position={[1.4, 1.4, -0.4]} rotation={[Math.PI / 2, -0.2, 0]}>
        <meshStandardMaterial color="#fffbeb" />
      </Cylinder>
      
      {/* Music Notes Emitter */}
      <MusicNotes />

      {/* Chair */}
      <group position={[0, -1, 1.5]} rotation={[0, 0.2, 0]}>
        {/* Seat */}
        <RoundedBox args={[1.2, 0.15, 1.2]} radius={0.05} position={[0, 0.8, 0]}>
          <meshStandardMaterial color="#f472b6" />
        </RoundedBox>
        {/* Backrest */}
        <RoundedBox args={[1.2, 1.2, 0.15]} radius={0.05} position={[0, 1.4, 0.55]}>
          <meshStandardMaterial color="#f472b6" />
        </RoundedBox>
        {/* Armrests */}
        <Box args={[0.1, 0.6, 0.8]} position={[-0.55, 1.1, 0.1]}>
          <meshStandardMaterial color="#fbcfe8" />
        </Box>
        <Box args={[0.1, 0.6, 0.8]} position={[0.55, 1.1, 0.1]}>
          <meshStandardMaterial color="#fbcfe8" />
        </Box>
        {/* Central Leg */}
        <Cylinder args={[0.1, 0.1, 0.7]} position={[0, 0.45, 0]}>
          <meshStandardMaterial color="#4b5563" />
        </Cylinder>
        {/* Base */}
        <Cylinder args={[0.6, 0.6, 0.1]} position={[0, 0.05, 0]}>
          <meshStandardMaterial color="#1f2937" />
        </Cylinder>
      </group>

      {/* Wastebasket (Left side of desk as in reference) */}
      <group position={[-2.3, -1, 0.2]}>
        <Cylinder args={[0.28, 0.22, 0.65, 24]} position={[0, 0.325, 0]}>
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </Cylinder>
        {/* Rolled Paper / Blueprints */}
        <Cylinder args={[0.04, 0.04, 0.8, 16]} position={[-0.06, 0.5, 0]} rotation={[0.2, 0, 0.2]}>
          <meshStandardMaterial color="#93c5fd" />
        </Cylinder>
        <Cylinder args={[0.035, 0.035, 0.7, 16]} position={[0.06, 0.45, -0.04]} rotation={[-0.15, 0, -0.2]}>
          <meshStandardMaterial color="#fef08a" />
        </Cylinder>
      </group>

      {/* Detailed Potted Plant (Front-right side of desk exactly as in reference image) */}
      <DetailedPottedPlant position={[2.35, -1, 0.95]} rotation={[0, -0.3, 0]} />

      {/* Rug (Moved down to y=-1, which is the bottom of the legs) */}
      <Box args={[7, 0.05, 5]} position={[0, -0.95, 1.5]}>
        <meshStandardMaterial color="#f59e0b" />
      </Box>
      <Box args={[6, 0.06, 4]} position={[0, -0.94, 1.5]}>
        <meshStandardMaterial color="#fbbf24" />
      </Box>
      <Box args={[5, 0.07, 3]} position={[0, -0.93, 1.5]}>
        <meshStandardMaterial color="#fcd34d" />
      </Box>

      {/* Corkboard (Made smaller and moved slightly) */}
      <group position={[1.5, 2.5, -2.5]} rotation={[0, -0.1, 0]}>
        <Box args={[2.5, 1.5, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#d4a373" />
        </Box>
        <Box args={[2.7, 1.7, 0.05]} position={[0, 0, -0.05]}>
          <meshStandardMaterial color="#e5e5e5" />
        </Box>
        {/* Sticky Notes */}
        <Box args={[0.4, 0.4, 0.02]} position={[-0.8, 0.3, 0.06]} rotation={[0, 0, 0.1]}>
          <meshStandardMaterial color="#93c5fd" />
        </Box>
        <Box args={[0.3, 0.4, 0.02]} position={[0.8, -0.2, 0.06]} rotation={[0, 0, -0.1]}>
          <meshStandardMaterial color="#fca5a5" />
        </Box>
      </group>

      {/* Floating Shelf */}
      <group position={[-2, 2.5, -2.5]} rotation={[0, 0.1, 0]}>
        <Box args={[1.5, 0.1, 0.6]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#d4a373" />
        </Box>
        {/* Books */}
        <Box args={[0.2, 0.6, 0.4]} position={[-0.5, 0.35, 0]}>
          <meshStandardMaterial color="#94a3b8" />
        </Box>
        <Box args={[0.2, 0.7, 0.4]} position={[-0.25, 0.4, 0]}>
          <meshStandardMaterial color="#f59e0b" />
        </Box>
        {/* Small Plant */}
        <Cylinder args={[0.15, 0.1, 0.2]} position={[0.4, 0.15, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Cylinder>
        <Box args={[0.3, 0.3, 0.3]} position={[0.4, 0.4, 0]}>
          <meshStandardMaterial color="#84cc16" />
        </Box>
      </group>

      {/* Picture Frame */}
      <group position={[3.5, 2.5, -2.5]} rotation={[0, -0.2, 0]}>
        <Box args={[1.5, 1.2, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#93c5fd" />
        </Box>
        <Box args={[1.2, 0.9, 0.05]} position={[0, 0, 0.05]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
      </group>

      {/* Pencil Holder */}
      <group position={[-1.2, 1.25, -0.2]}>
        <Cylinder args={[0.15, 0.15, 0.3]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#e5e7eb" />
        </Cylinder>
        {/* Pencils */}
        <Cylinder args={[0.02, 0.02, 0.4]} position={[-0.05, 0.1, 0.05]} rotation={[0.2, 0, 0.2]}>
          <meshStandardMaterial color="#fca5a5" />
        </Cylinder>
        <Cylinder args={[0.02, 0.02, 0.4]} position={[0.05, 0.1, -0.05]} rotation={[-0.2, 0, -0.2]}>
          <meshStandardMaterial color="#93c5fd" />
        </Cylinder>
      </group>

      {/* Penguin */}
      <group position={[-1.6, 1.25, 0.2]} rotation={[0, 0.5, 0]}>
        {/* Body */}
        <Cylinder args={[0.15, 0.18, 0.3]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#111827" />
        </Cylinder>
        {/* Belly */}
        <Cylinder args={[0.12, 0.15, 0.28]} position={[0, 0, 0.05]}>
          <meshStandardMaterial color="#ffffff" />
        </Cylinder>
      </group>

      {/* Rubik's Cube */}
      <Box args={[0.2, 0.2, 0.2]} position={[1, 1.2, -0.2]} rotation={[0, 0.4, 0]}>
        <meshStandardMaterial color="#3b82f6" />
      </Box>
    </group>
  );
};

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="home" className="h-screen bg-[#f4ece3] relative overflow-hidden flex items-center">
      
      {/* Full-width 3D Canvas - completely eliminates rug clipping when rotated */}
      <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0">
        <Canvas camera={{ position: isMobile ? [4.5, 4.2, 7.5] : [6.5, 4.2, 6.2], fov: isMobile ? 55 : 48 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          {/* Positioned centered on mobile, right side on desktop */}
          <group position={isMobile ? [0, -0.7, 0] : [3.6, 0.25, 0]}>
            <AbstractDesk />
          </group>
          <OrbitControls 
            target={isMobile ? [0, -0.7, 0] : [2.6, 0.25, 0]} 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={Math.PI / 4} 
          />
        </Canvas>
      </div>

      {/* Left Content Overlay */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex items-start md:items-center pointer-events-none pt-24 md:pt-0">
        <div className="w-full md:w-[50%] flex flex-col items-start pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start ml-0 md:-ml-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-bold text-gray-800 leading-[0.9] md:leading-[0.8] tracking-tighter mb-4 md:mb-8">
              Ly Tieu
              <br />
              Long
            </h1>
            
            <div className="bg-[#1e3a5f] border-2 md:border-4 border-yellow-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-2xl transform -rotate-2">
              <span className="text-base sm:text-xl md:text-2xl font-bold tracking-widest uppercase">
                Full Stack Development
              </span>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;

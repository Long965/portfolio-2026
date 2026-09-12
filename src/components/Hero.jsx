import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Text } from '@react-three/drei';
import { motion } from 'framer-motion';

// Particle system for music notes
const MusicNotes = () => {
  const notesRef = useRef([]);
  const notes = useMemo(() => Array.from({ length: 5 }).map(() => ({
    x: 1.2 + (Math.random() - 0.5) * 0.5,
    y: 1.5 + Math.random() * 0.5,
    z: -0.2 + (Math.random() - 0.5) * 0.2,
    speed: 0.8 + Math.random() * 0.5,
    char: Math.random() > 0.5 ? '♪' : '♫',
  })), []);

  useFrame((state, delta) => {
    notesRef.current.forEach((mesh, i) => {
      if (mesh) {
        notes[i].y += notes[i].speed * delta;
        if (notes[i].y > 4.0) {
          notes[i].y = 1.5;
          notes[i].x = 1.2 + (Math.random() - 0.5) * 0.5;
        }
        mesh.position.y = notes[i].y;
        mesh.position.x = notes[i].x;
        mesh.material.opacity = 1 - (notes[i].y - 1.5) / 2.5;
      }
    });
  });

  return (
    <group>
      {notes.map((note, i) => (
        <Text
          key={i}
          ref={(el) => (notesRef.current[i] = el)}
          position={[note.x, note.y, note.z]}
          fontSize={0.6}
          color="#f59e0b"
          outlineWidth={0.02}
          outlineColor="#78350f"
          material-transparent
        >
          {note.char}
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
    <Box args={[1.2, 0.05, 0.4]} position={[0, 1.12, 0.3]} rotation={[0.05, 0, 0]}>
      <meshStandardMaterial ref={materialRef} emissiveIntensity={1} roughness={0.2} />
    </Box>
  );
};

// Desk, Chair, Plant, Monitor, Speaker
const AbstractDesk = () => {
  const group = useRef();
  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  const codeText = `function code() {\n  return "awesome";\n}`;

  return (
    <group ref={group} position={[0, -1.5, 0]}>
      {/* Desk Base */}
      <Box args={[4, 0.2, 2]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#f472b6" /> {/* Pink */}
      </Box>
      {/* Desk Legs */}
      <Cylinder args={[0.08, 0.08, 2]} position={[-1.8, 0, -0.8]}>
        <meshStandardMaterial color="#fbcfe8" /> {/* Lighter Pink */}
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 2]} position={[1.8, 0, -0.8]}>
        <meshStandardMaterial color="#fbcfe8" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 2]} position={[-1.8, 0, 0.8]}>
        <meshStandardMaterial color="#fbcfe8" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 2]} position={[1.8, 0, 0.8]}>
        <meshStandardMaterial color="#fbcfe8" />
      </Cylinder>
      
      {/* Monitor Base */}
      <Box args={[0.3, 0.1, 0.3]} position={[0, 1.1, -0.5]}>
        <meshStandardMaterial color="#4b5563" />
      </Box>
      <Cylinder args={[0.05, 0.05, 0.4]} position={[0, 1.3, -0.5]}>
        <meshStandardMaterial color="#4b5563" />
      </Cylinder>
      {/* Monitor Screen */}
      <Box args={[2, 1.2, 0.1]} position={[0, 1.8, -0.5]} rotation={[0.05, 0, 0]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>
      <Box args={[1.9, 1.1, 0.11]} position={[0, 1.8, -0.5]} rotation={[0.05, 0, 0]}>
        <meshStandardMaterial color="#000000" />
      </Box>
      {/* Code on screen */}
      <Text position={[-0.8, 2.1, -0.42]} rotation={[0.05, 0, 0]} fontSize={0.12} color="#10b981" anchorX="left" anchorY="top">
        {codeText}
      </Text>

      {/* Keyboard */}
      <RGBKeyboard />
      
      {/* Mouse */}
      <Box args={[0.15, 0.08, 0.25]} position={[0.9, 1.14, 0.3]} rotation={[0, -0.1, 0]}>
        <meshStandardMaterial color="#4b5563" />
      </Box>

      {/* Speaker */}
      <Box args={[0.3, 0.5, 0.3]} position={[1.3, 1.35, -0.4]} rotation={[0, -0.2, 0]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>
      {/* Speaker Cone */}
      <Cylinder args={[0.1, 0.1, 0.31]} position={[1.3, 1.4, -0.4]} rotation={[Math.PI / 2, -0.2, 0]}>
        <meshStandardMaterial color="#374151" />
      </Cylinder>
      
      {/* Music Notes Emitter */}
      <MusicNotes />

      {/* Chair */}
      <group position={[0, -1, 1.5]} rotation={[0, 0.2, 0]}>
        {/* Seat */}
        <Box args={[1.2, 0.1, 1.2]} position={[0, 0.8, 0]}>
          <meshStandardMaterial color="#f472b6" /> {/* Pink */}
        </Box>
        {/* Backrest */}
        <Box args={[1.2, 1.2, 0.1]} position={[0, 1.4, 0.55]}>
          <meshStandardMaterial color="#f472b6" /> {/* Pink */}
        </Box>
        {/* Leg */}
        <Cylinder args={[0.1, 0.1, 0.8]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#fbcfe8" /> {/* Lighter Pink */}
        </Cylinder>
        {/* Base */}
        <Cylinder args={[0.6, 0.6, 0.05]} position={[0, 0.05, 0]}>
          <meshStandardMaterial color="#111827" />
        </Cylinder>
      </group>

      {/* Plant */}
      <group position={[-2.5, -1, -0.5]}>
        {/* Pot */}
        <Cylinder args={[0.4, 0.3, 0.6]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color="#d1d5db" />
        </Cylinder>
        {/* Leaves */}
        <Box args={[0.8, 0.8, 0.8]} position={[0, 0.9, 0]}>
          <meshStandardMaterial color="#84cc16" />
        </Box>
        <Box args={[0.6, 0.6, 0.6]} position={[0.2, 1.2, -0.2]} rotation={[0.2, 0.4, 0]}>
          <meshStandardMaterial color="#a3e635" />
        </Box>
      </group>

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
  return (
    <section id="home" className="h-screen bg-[#f4ece3] flex flex-col md:flex-row items-center justify-between px-6 md:px-12 overflow-hidden relative">
      
      {/* Left Content */}
      <div className="w-full md:w-[60%] z-10 flex flex-col justify-center h-full relative pl-0 mt-20 md:mt-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start ml-0 md:-ml-16"
        >
          <h1 className="text-7xl md:text-[8rem] font-bold text-black/10 leading-[0.8] tracking-tighter mb-8">
            Ly Tieu
            <br />
            Long
          </h1>
          
          <div className="bg-[#1e3a5f] border-4 border-yellow-500 text-white px-6 py-3 rounded-xl shadow-2xl transform -rotate-2">
            <span className="text-xl md:text-2xl font-bold tracking-widest uppercase">
              Lập Trình Viên Web
            </span>
          </div>
        </motion.div>
      </div>
      
      {/* Right Content - 3D Scene */}
      <div className="w-full md:w-[50%] h-[60vh] md:h-screen absolute right-0 bottom-0 md:top-0 cursor-grab active:cursor-grabbing z-0">
        <Canvas camera={{ position: [5, 4, 6], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          <group position={[0, -0.2, 0]}>
            <AbstractDesk />
          </group>
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
        </Canvas>
      </div>

    </section>
  );
};

export default Hero;

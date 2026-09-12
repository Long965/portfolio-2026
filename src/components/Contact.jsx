import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Link as LinkIcon, Globe, Phone } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Torus, Sphere, Cone } from '@react-three/drei';
import * as THREE from 'three';

// A playful 3D stack of sports equipment
const SportsEquipment = () => {
  const group = useRef();
  useFrame((state) => {
    // Base gentle floating rotation
    const time = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(time * 0.2) * 0.05;
  });

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* Basketball */}
      <Sphere args={[1, 32, 32]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#f97316" roughness={0.8} />
      </Sphere>
      
      {/* Badminton Racket */}
      <group position={[-1.5, 1.5, 0]} rotation={[0, 0, -0.5]}>
        {/* Handle */}
        <Cylinder args={[0.08, 0.08, 1]} position={[0, -1.5, 0]}>
          <meshStandardMaterial color="#1f2937" />
        </Cylinder>
        {/* Shaft */}
        <Cylinder args={[0.03, 0.03, 1.5]} position={[0, -0.25, 0]}>
          <meshStandardMaterial color="#d1d5db" />
        </Cylinder>
        {/* Head */}
        <Torus args={[0.6, 0.04, 16, 64]} position={[0, 1, 0]} scale={[1, 1.2, 1]}>
          <meshStandardMaterial color="#3b82f6" />
        </Torus>
      </group>

      {/* Shuttlecock */}
      <group position={[1.5, 0.5, 1]} rotation={[-0.5, 0, 0.5]}>
        {/* Base */}
        <Sphere args={[0.2, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>
        {/* Feathers */}
        <Cone args={[0.4, 0.8, 16]} position={[0, 0.4, 0]} rotation={[Math.PI, 0, 0]}>
          <meshStandardMaterial color="#f8fafc" transparent opacity={0.8} />
        </Cone>
      </group>
    </group>
  );
};

const WavingGrass = () => (
  <div className="absolute bottom-0 w-full overflow-hidden leading-[0] z-0 pointer-events-none">
    <motion.svg 
      className="relative block w-[200%] h-[15vh] md:h-[25vh]"
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
    >
      <path d="M0,120 V46.29 C150,50 300,10 450,20 C600,30 750,80 900,50 C1050,20 1200,60 1200,60 V120 H0 Z" fill="#84cc16" opacity="0.4" />
      <path d="M0,120 V50 C150,80 300,30 450,50 C600,70 750,20 900,30 C1050,40 1200,70 1200,70 V120 H0 Z" fill="#65a30d" opacity="0.6" />
      <path d="M0,120 V60 C200,80 300,40 500,70 C700,100 800,50 1000,60 C1200,70 1200,70 1200,70 V120 H0 Z" fill="#4d7c0f" opacity="0.8" />
      
      {/* Duplicated for seamless loop */}
      <path d="M1200,120 V60 C1350,50 1500,10 1650,20 C1800,30 1950,80 2100,50 C2250,20 2400,60 2400,60 V120 H1200 Z" fill="#84cc16" opacity="0.4" />
      <path d="M1200,120 V70 C1350,80 1500,30 1650,50 C1800,70 1950,20 2100,30 C2250,40 2400,70 2400,70 V120 H1200 Z" fill="#65a30d" opacity="0.6" />
      <path d="M1200,120 V70 C1400,80 1500,40 1700,70 C1900,100 2000,50 2200,60 C2400,70 2400,70 2400,70 V120 H1200 Z" fill="#4d7c0f" opacity="0.8" />
    </motion.svg>
  </div>
);

const Contact = () => {
  const socials = [
    { icon: Mail, href: "mailto:ltlong2020st@gmail.com" },
    { icon: LinkIcon, href: "https://github.com/Long965" },
    { icon: Globe, href: "https://www.linkedin.com/in/long-lý-tiểu-100730400" },
    { icon: Phone, href: "tel:0832582919" }
  ];

  return (
    <section id="contact" className="h-screen bg-[#f4ece3] relative overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-20 w-full flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start pt-20 md:pt-0">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-bold text-black/20 leading-[1.1] tracking-tighter mb-12"
          >
            Let's work
            <br />
            together!
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6 w-full max-w-md"
          >
            {socials.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a 
                  key={idx}
                  href={social.href}
                  className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-4 rounded-2xl hover:bg-white/60 transition-all shadow-lg hover:shadow-xl group"
                >
                  <div className="bg-black/80 p-3 rounded-full text-white group-hover:scale-110 group-hover:bg-orange-500 transition-all">
                    <Icon size={24} />
                  </div>
                  <span className="font-bold text-xl text-black/70 group-hover:text-black transition-colors">
                    {social.href.replace('mailto:', '').replace('https://', '').replace('tel:', '')}
                  </span>
                </a>
              );
            })}
          </motion.div>
        </div>

      </div>

      {/* Right Content - 3D Scene */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen absolute right-0 bottom-0 cursor-grab active:cursor-grabbing z-10">
        <Canvas camera={{ position: [5, 4, 8], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <SportsEquipment />
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
        </Canvas>
      </div>

      {/* Grass Effect */}
      <WavingGrass />

    </section>
  );
};

export default Contact;

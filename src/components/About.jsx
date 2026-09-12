import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, TorusKnot, Sphere, Stars } from '@react-three/drei';
import { MapPin } from 'lucide-react';

const ShootingStars = () => {
  const starsRef = useRef([]);
  const stars = useMemo(() => Array.from({ length: 8 }).map(() => ({
    x: 10 + Math.random() * 20,
    y: (Math.random() - 0.5) * 10,
    z: (Math.random() - 0.5) * 10 - 5,
    speed: 5 + Math.random() * 5,
    scale: 0.05 + Math.random() * 0.1,
  })), []);

  useFrame((state, delta) => {
    starsRef.current.forEach((mesh, i) => {
      if (mesh) {
        stars[i].x -= stars[i].speed * delta;
        if (stars[i].x < -15) {
          stars[i].x = 10 + Math.random() * 10;
          stars[i].y = (Math.random() - 0.5) * 10;
        }
        mesh.position.x = stars[i].x;
      }
    });
  });

  return (
    <group>
      {stars.map((star, i) => (
        <mesh key={i} ref={(el) => (starsRef.current[i] = el)} position={[star.x, star.y, star.z]}>
          <boxGeometry args={[star.scale * 10, star.scale, star.scale]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
};

const Hologram = () => {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  return (
    <TorusKnot ref={meshRef} args={[1.5, 0.4, 128, 32]} position={[0, 0, 0]}>
      <meshBasicMaterial color="#0ea5e9" wireframe={true} transparent opacity={0.6} />
    </TorusKnot>
  );
};

const About = () => {
  return (
    <section id="about" className="h-screen bg-[#061839] relative overflow-hidden flex items-center justify-center">
      {/* Grid Pattern */}
      <div className="bg-grid-pattern opacity-30"></div>
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing z-0">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <ambientLight intensity={1} />
          <Hologram />
          <ShootingStars />
          <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          {/* Base Platform */}
          <mesh position={[0, -2.5, 0]}>
            <cylinderGeometry args={[2.5, 2.8, 0.5, 32]} />
            <meshBasicMaterial color="#0ea5e9" wireframe={true} />
          </mesh>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>

      {/* Floating Info Cards */}
      <div className="relative z-10 w-full max-w-6xl mx-auto h-full pointer-events-none">
        
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute top-[20%] left-[5%] md:left-[10%] bg-[#082a5c]/80 backdrop-blur-sm border border-[#0ea5e9]/50 p-6 md:p-8 rounded-2xl w-72 md:w-80 pointer-events-auto shadow-2xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Ly Tieu Long</h2>
          <div className="flex items-center gap-2 text-[#0ea5e9] font-medium text-sm md:text-base">
            <MapPin size={20} />
            <span>Ho Chi Minh, Vietnam</span>
          </div>
          {/* Line pointing to center */}
          <div className="absolute top-1/2 -right-16 w-16 h-[2px] bg-[#0ea5e9]/50 hidden md:block">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#0ea5e9] shadow-[0_0_10px_#0ea5e9]"></div>
          </div>
        </motion.div>

        {/* Description Card */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-[15%] left-[5%] md:left-[10%] bg-[#082a5c]/80 backdrop-blur-sm border border-[#0ea5e9]/50 p-6 md:p-8 rounded-2xl w-80 md:w-96 pointer-events-auto shadow-2xl"
        >
          <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed">
            Information Technology student specializing in Cybersecurity and Software Engineering. 
            Builds interactive web applications and full-stack systems that are fast, secure, and user-friendly.
          </p>
          {/* Line pointing to center */}
          <div className="absolute top-1/2 -right-16 w-16 h-[2px] bg-[#0ea5e9]/50 hidden md:block">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#0ea5e9] shadow-[0_0_10px_#0ea5e9]"></div>
          </div>
        </motion.div>

        {/* Skills Card */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute top-[30%] right-[5%] md:right-[10%] bg-[#082a5c]/80 backdrop-blur-sm border border-[#0ea5e9]/50 p-6 md:p-8 rounded-2xl w-80 md:w-96 pointer-events-auto shadow-2xl"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Skills</h3>
          <ul className="space-y-4">
            {[
              "C++, Python & JavaScript",
              "Node.js & PHP",
              "PostgreSQL & MySQL",
              "React (Vite) & FastAPI",
              "AI Integration (OpenCV, PyTorch)"
            ].map((skill, idx) => (
              <li key={idx} className="flex items-center gap-3 text-white/90 text-sm md:text-base font-medium">
                <span className="w-2 h-2 bg-[#0ea5e9] rounded-full shadow-[0_0_8px_#0ea5e9]"></span>
                {skill}
              </li>
            ))}
          </ul>
          {/* Line pointing to center */}
          <div className="absolute top-1/2 -left-16 w-16 h-[2px] bg-[#0ea5e9]/50 hidden md:block">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#0ea5e9] shadow-[0_0_10px_#0ea5e9]"></div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default About;

import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Cylinder, Sphere, Cone, Torus, Stars } from '@react-three/drei';
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

// Friendly 3D Floating Robot with waving animation & glowing visor
const CuteRobot = () => {
  const robotRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Gentle floating bob
    if (robotRef.current) {
      robotRef.current.position.y = Math.sin(t * 1.5) * 0.2;
      robotRef.current.rotation.y = Math.sin(t * 0.6) * 0.25;
    }
    // Head tilt
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1.2) * 0.15;
      headRef.current.rotation.z = Math.cos(t * 0.9) * 0.05;
    }
    // Arms animation
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.3 + Math.sin(t * 2) * 0.15;
      leftArmRef.current.rotation.x = Math.cos(t * 1.5) * 0.2;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.6 + Math.sin(t * 3) * 0.35; // Friendly wave
    }
  });

  return (
    <group ref={robotRef} position={[0, 0, 0]} scale={1.2}>
      {/* Head Group */}
      <group ref={headRef} position={[0, 1.1, 0]}>
        {/* Head Shell */}
        <RoundedBox args={[1.5, 1.1, 1.1]} radius={0.3} smoothness={8}>
          <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.1} />
        </RoundedBox>

        {/* Visor Screen */}
        <RoundedBox args={[1.2, 0.75, 0.15]} radius={0.15} position={[0, 0, 0.52]}>
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </RoundedBox>

        {/* Glowing Eyes */}
        <Sphere args={[0.12, 32, 16]} position={[-0.32, 0.05, 0.62]} scale={[1.2, 0.8, 0.3]}>
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={3} />
        </Sphere>
        <Sphere args={[0.12, 32, 16]} position={[0.32, 0.05, 0.62]} scale={[1.2, 0.8, 0.3]}>
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={3} />
        </Sphere>

        {/* Headphone Ears */}
        <Cylinder args={[0.22, 0.22, 0.15, 32]} position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#0284c7" roughness={0.3} />
        </Cylinder>
        <Cylinder args={[0.22, 0.22, 0.15, 32]} position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#0284c7" roughness={0.3} />
        </Cylinder>

        {/* Cute Antenna */}
        <Cylinder args={[0.03, 0.03, 0.4, 16]} position={[0, 0.7, 0]}>
          <meshStandardMaterial color="#64748b" />
        </Cylinder>
        <Sphere args={[0.1, 16, 16]} position={[0, 0.95, 0]}>
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} />
        </Sphere>
      </group>

      {/* Neck joint */}
      <Cylinder args={[0.25, 0.25, 0.2, 16]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.3} />
      </Cylinder>

      {/* Body / Torso */}
      <group position={[0, -0.15, 0]}>
        <RoundedBox args={[1.3, 1.2, 0.9]} radius={0.3} smoothness={8}>
          <meshStandardMaterial color="#f8fafc" roughness={0.25} metalness={0.1} />
        </RoundedBox>

        {/* Chest Display Plate */}
        <RoundedBox args={[0.7, 0.5, 0.08]} radius={0.08} position={[0, 0.1, 0.44]}>
          <meshStandardMaterial color="#1e293b" />
        </RoundedBox>

        {/* Glowing Heart / Core Reactor */}
        <Sphere args={[0.14, 32, 16]} position={[0, 0.1, 0.48]}>
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={3} />
        </Sphere>
        <Torus args={[0.18, 0.02, 16, 32]} position={[0, 0.1, 0.48]}>
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1} />
        </Torus>

        {/* Floating Ring around waist */}
        <Torus args={[0.9, 0.04, 16, 64]} position={[0, -0.4, 0]} rotation={[Math.PI / 2 + 0.1, 0, 0]}>
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={2} />
        </Torus>

        {/* Jet Thruster Base underneath */}
        <Cone args={[0.35, 0.4, 32]} position={[0, -0.75, 0]} rotation={[Math.PI, 0, 0]}>
          <meshStandardMaterial color="#475569" metalness={0.6} />
        </Cone>
        {/* Thruster Glow Flame */}
        <Cone args={[0.22, 0.5, 32]} position={[0, -1.05, 0]}>
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={4} transparent opacity={0.8} />
        </Cone>
      </group>

      {/* Floating Left Arm */}
      <group ref={leftArmRef} position={[-0.9, 0.1, 0]}>
        <Sphere args={[0.18, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#0284c7" />
        </Sphere>
        <RoundedBox args={[0.26, 0.7, 0.26]} radius={0.1} position={[0, -0.4, 0]}>
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </RoundedBox>
        <Sphere args={[0.16, 16, 16]} position={[0, -0.85, 0]}>
          <meshStandardMaterial color="#0284c7" />
        </Sphere>
      </group>

      {/* Floating Right Arm (Waving!) */}
      <group ref={rightArmRef} position={[0.9, 0.1, 0]}>
        <Sphere args={[0.18, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#0284c7" />
        </Sphere>
        <RoundedBox args={[0.26, 0.7, 0.26]} radius={0.1} position={[0, -0.4, 0]}>
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </RoundedBox>
        <Sphere args={[0.16, 16, 16]} position={[0, -0.85, 0]}>
          <meshStandardMaterial color="#0284c7" />
        </Sphere>
      </group>
    </group>
  );
};

const About = () => {
  return (
    <section id="about" className="h-screen bg-[#061839] relative overflow-hidden flex items-center justify-center">
      {/* Grid Pattern */}
      <div className="bg-grid-pattern opacity-30"></div>
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing z-0">
        <Canvas camera={{ position: [0, 0.5, 7], fov: 45 }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} />
          <pointLight position={[0, 0, 2]} intensity={2} color="#38bdf8" />
          <CuteRobot />
          <ShootingStars />
          <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2 + 0.2} minPolarAngle={Math.PI / 3} />
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

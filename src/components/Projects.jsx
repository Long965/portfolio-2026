import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, colorFrom, colorTo, iconUrl }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="flex flex-col cursor-pointer group"
  >
    {/* Image Container */}
    <div className={`w-full h-64 md:h-72 rounded-[2rem] bg-gradient-to-br ${colorFrom} ${colorTo} p-8 relative overflow-hidden mb-4 shadow-xl`}>
      <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform duration-500">
         {/* Placeholder for project image/logo */}
         <div className="w-32 h-32 bg-white/20 rounded-3xl backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl">
            <span className="text-white text-5xl font-bold">{'</>'}</span>
         </div>
      </div>
    </div>
    
    {/* Text */}
    <h3 className="text-2xl font-bold text-[#f4ece3]">{title}</h3>
    <p className="text-[#f4ece3]/70 font-medium mt-1">{description}</p>
  </motion.div>
);

const Projects = () => {
  const projects = [
    {
      title: "Multimodal Fake News Detection",
      description: "AI-powered web application for credibility prediction",
      colorFrom: "from-blue-500",
      colorTo: "to-cyan-400",
    },
    {
      title: "Smart Greenhouse System",
      description: "Full-stack IoT management platform",
      colorFrom: "from-green-500",
      colorTo: "to-emerald-400",
    },
    {
      title: "OEM EV Warranty Management",
      description: "Backend architecture & Docker deployment",
      colorFrom: "from-purple-500",
      colorTo: "to-pink-500",
    },
    {
      title: "Crimes Alert Website",
      description: "Community report web application with RBAC",
      colorFrom: "from-orange-500",
      colorTo: "to-yellow-400",
    }
  ];

  return (
    <section id="projects" className="py-32 px-6 md:px-20 bg-[#322319] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-20 flex flex-col items-start relative pl-4 md:pl-0">
          <div className="bg-[#2563eb] text-white px-4 py-1 rounded-md transform -rotate-6 absolute -top-4 -left-4 shadow-lg z-10">
            <span className="text-sm font-bold uppercase tracking-wider">Selected</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-bold text-[#f4ece3] leading-none tracking-tighter ml-2 mt-4">
            Projects
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Projects;

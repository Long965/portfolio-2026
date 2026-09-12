import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const ProjectCard = ({ title, description, image, colorFrom, colorTo }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="flex flex-col cursor-pointer group"
  >
    {/* Image Container */}
    <div className={`w-full h-64 md:h-72 rounded-[2rem] bg-gradient-to-br ${colorFrom} ${colorTo} relative overflow-hidden mb-4 shadow-xl border border-white/10`}>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    
    {/* Text */}
    <h3 className="text-2xl font-bold text-[#f4ece3] group-hover:text-orange-400 transition-colors">{title}</h3>
    <p className="text-[#f4ece3]/70 font-medium mt-1">{description}</p>
  </motion.div>
);

// "Start a new project" dashed card matching reference image
const NewProjectCard = () => (
  <motion.a 
    href="#contact"
    whileHover={{ y: -10 }}
    className="flex flex-col cursor-pointer group"
  >
    {/* Dashed Rounded Container */}
    <div className="w-full h-64 md:h-72 rounded-[2rem] border-2 border-dashed border-[#8c7463] bg-[#271b13]/40 flex items-center justify-center mb-4 group-hover:border-orange-400 group-hover:bg-[#271b13]/70 transition-all shadow-xl">
      <div className="w-16 h-16 rounded-full flex items-center justify-center text-[#b8a18f] group-hover:text-orange-400 group-hover:scale-125 transition-all">
        <Plus size={48} strokeWidth={1.5} />
      </div>
    </div>
    
    {/* Text matching image exactly */}
    <h3 className="text-2xl font-bold text-[#f4ece3] group-hover:text-orange-400 transition-colors">
      Start a new project
    </h3>
  </motion.a>
);

const Projects = () => {
  const projects = [
    {
      title: "Multimodal Fake News Detection",
      description: "AI-powered web application for credibility prediction",
      image: "/projects/fake-news.jpg",
      colorFrom: "from-blue-600",
      colorTo: "to-cyan-500",
    },
    {
      title: "Smart Greenhouse System",
      description: "Full-stack IoT management platform",
      image: "/projects/greenhouse.jpg",
      colorFrom: "from-emerald-600",
      colorTo: "to-green-500",
    },
    {
      title: "OEM EV Warranty Management",
      description: "Backend architecture & Docker deployment",
      image: "/projects/ev-warranty.jpg",
      colorFrom: "from-purple-600",
      colorTo: "to-pink-500",
    },
    {
      title: "Crimes Alert Website",
      description: "Community report web application with RBAC",
      image: "/projects/crime-alert.jpg",
      colorFrom: "from-orange-600",
      colorTo: "to-amber-500",
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
          {/* New Project Placeholder Card */}
          <NewProjectCard />
        </div>
        
      </div>
    </section>
  );
};

export default Projects;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-3 md:py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between pointer-events-auto">
        {/* Logo Placeholder */}
        <a href="#home" className="w-11 h-11 md:w-12 md:h-12 bg-black/80 rounded-xl flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg">
          🐸
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center bg-black/80 rounded-full px-2 py-1.5 shadow-lg">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href}
                className={`px-6 py-2 rounded-full text-sm md:text-base font-bold transition-colors ${
                  activeSection === link.href.substring(1) 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          <a 
            href="#contact"
            className="hidden sm:inline-block px-5 md:px-6 py-2.5 md:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs md:text-sm font-bold transition-colors uppercase tracking-wider shadow-xl shadow-orange-500/30"
          >
            Get in touch
          </a>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-11 h-11 bg-black/80 rounded-xl flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mx-4 mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl pointer-events-auto flex flex-col gap-3"
          >
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-bold transition-colors flex items-center justify-between ${
                  activeSection === link.href.substring(1) 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{link.name}</span>
                {activeSection === link.href.substring(1) && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </a>
            ))}
            <a 
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-center py-3 bg-orange-500 text-white rounded-xl font-bold uppercase tracking-wider text-sm shadow-lg shadow-orange-500/30"
            >
              Get in touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

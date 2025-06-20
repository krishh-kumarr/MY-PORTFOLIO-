import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/globals.css';
import { RacingLines, MatrixRain } from './components/ui/Effects';
import { TypingAnimation, GlitchText } from './components/ui/Animations';
import Home from './components/Home';
import About from './components/About';
import Skillset from './components/Skillset';
import Projects from './components/Projects';
import Contact from './components/Contact';

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleNavigationEvent = (e) => {
      setCurrentSection(e.detail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('navigate', handleNavigationEvent);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('navigate', handleNavigationEvent);
    };
  }, []);

  const sections = [
    { id: 'home', label: 'HOME', icon: '🏁' },
    { id: 'about', label: 'ABOUT', icon: '👤' },
    { id: 'skillset', label: 'SKILLS', icon: '⚡' },
    { id: 'projects', label: 'PROJECTS', icon: '🚀' },
    { id: 'contact', label: 'CONTACT', icon: '📡' }
  ];

  const handleNavigation = (section) => {
    setCurrentSection(section);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bat-black flex items-center justify-center relative overflow-hidden">
        <RacingLines />
        <MatrixRain />
        
        {/* Loading Animation */}
        <motion.div 
          className="text-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-8 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-4 border-f1-red rounded-full border-t-transparent"></div>
            <div className="absolute inset-2 border-4 border-neon-cyan rounded-full border-r-transparent"></div>
            <div className="absolute inset-4 border-4 border-f1-orange rounded-full border-b-transparent"></div>
          </motion.div>
          
          <GlitchText className="text-4xl font-racing text-white mb-4">
            KRISH KUMAR
          </GlitchText>
          
          <TypingAnimation
            texts={['INITIALIZING...', 'LOADING SYSTEMS...', 'PREPARING INTERFACE...', 'READY TO RACE!']}
            className="text-neon-cyan font-secondary text-xl"
            speed={80}
          />
          
          <motion.div 
            className="mt-8 w-64 h-2 bg-bat-gray rounded-full mx-auto overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-f1-red via-f1-orange to-neon-green"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bat-black text-white relative overflow-hidden font-secondary">
      {/* Background Effects */}
      <RacingLines />
      <div className="racing-grid fixed inset-0 opacity-5"></div>
      
      {/* Mouse Follower */}
      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
      >
        <div className="w-full h-full border-2 border-neon-cyan rounded-full"></div>
      </motion.div>

      {/* Navigation Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-40 p-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div
            className="cursor-pointer"
            onClick={() => handleNavigation('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GlitchText className="text-3xl font-racing text-transparent bg-clip-text bg-f1-gradient">
              KRISH KUMAR
            </GlitchText>
            <div className="text-xs font-formula text-neon-cyan mt-1 tracking-widest">
              F1 TECH DEVELOPER
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-2">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                className={`px-6 py-3 rounded-lg font-racing text-sm tracking-wider transition-all duration-300 relative overflow-hidden ${
                  currentSection === section.id 
                    ? 'text-bat-black bg-gradient-to-r from-bat-blue to-f1-blue shadow-neon' 
                    : 'text-neon-cyan border border-neon-cyan hover:bg-neon-cyan hover:text-bat-black'
                }`}
                onClick={() => handleNavigation(section.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {section.icon} {section.label}
                </span>
                {currentSection === section.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-f1-red to-f1-orange"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-neon-cyan"
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className="w-full h-0.5 bg-current mb-1"></span>
              <span className="w-full h-0.5 bg-current mb-1"></span>
              <span className="w-full h-0.5 bg-current"></span>
            </div>
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 h-screen overflow-y-auto pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="min-h-screen"
          >
            {currentSection === 'home' && <Home />}
            {currentSection === 'about' && <About />}
            {currentSection === 'skillset' && <Skillset />}
            {currentSection === 'projects' && <Projects />}
            {currentSection === 'contact' && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Side Navigation Indicator */}
      <motion.div 
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              className={`block w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                currentSection === section.id 
                  ? 'bg-f1-red border-f1-red shadow-neon' 
                  : 'border-neon-cyan hover:border-f1-orange'
              }`}
              onClick={() => handleNavigation(section.id)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              title={section.label}
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom Status Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-r from-bat-black via-bat-gray to-bat-black border-t border-neon-cyan/20"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4 text-neon-cyan">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              SYSTEM ONLINE
            </span>
            <span>|</span>
            <span>VERSION 2.0.0</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 text-neon-cyan">
            <span>F1 TECH MODE</span>
            <span>|</span>
            <span>PERFORMANCE: OPTIMAL</span>
          </div>
          
          <div className="text-neon-cyan">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default App; 
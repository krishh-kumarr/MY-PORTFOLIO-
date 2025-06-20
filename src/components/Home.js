import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TypingAnimation, 
  FloatingElements, 
  SlideInFromLeft, 
  SlideInFromRight,
  CountUpAnimation
} from '../ui/Animations';
import { F1Card, NeonText } from '../ui/Effects';
import profileImage from '../assets/profile_new.png'

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeStats, setActiveStats] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Projects Completed', value: 25, suffix: '+', color: 'text-racing-red' },
    { label: 'Years Experience', value: 3, suffix: '+', color: 'text-accent-cyan' },
    { label: 'Technologies Mastered', value: 15, suffix: '+', color: 'text-racing-orange' },
    { label: 'Coffee Cups', value: 847, suffix: '', color: 'text-accent-green' }
  ];

  const skills = [
    'Full-Stack Developer',
    'AI/ML Engineer', 
    'Data Scientist',
    'F1 Data Analyst',
    'Crypto Trader',
    'Tech Innovator'
  ];

  return (
    <div className="min-h-screen flex flex-col px-6 lg:px-12 relative overflow-y-auto">
      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto w-full pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <SlideInFromLeft delay={0.2}>
              <div className="space-y-4">
                <motion.div
                  className="text-sm font-primary text-accent-cyan tracking-widest"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {'>'} LOADING PORTFOLIO...
                </motion.div>
                
                <h1 className="text-6xl lg:text-8xl font-primary font-bold leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-racing-red via-racing-orange to-accent-cyan">
                    KRISH
                  </span>
                  <br />
                  <span className="text-white">
                    KUMAR
                  </span>
                </h1>
                
                <div className="text-xl lg:text-2xl font-secondary text-accent-green">
                  <TypingAnimation
                    texts={skills}
                    speed={120}
                    deleteSpeed={80}
                    pauseDuration={2000}
                    prefix="// "
                  />
                </div>
              </div>
            </SlideInFromLeft>

            <SlideInFromLeft delay={0.6}>
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                  Welcome to my portfolio. I'm a passionate developer who combines the 
                  <NeonText color="racing-red"> precision of motorsport engineering </NeonText> 
                  with the 
                  <NeonText color="accent-cyan"> advanced tech of Gotham </NeonText>
                  to create cutting-edge digital solutions.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    className="f1-button rounded-lg px-8 py-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'projects' }))}
                  >
                    EXPLORE PROJECTS
                  </motion.button>
                  
                  <motion.button
                    className="px-8 py-4 border-2 border-neon-cyan text-neon-cyan rounded-lg font-racing hover:bg-neon-cyan hover:text-bat-black transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Create a download link for the resume
                      const link = document.createElement('a');
                      link.href = '/Krish_Kumar.pdf'; // Assuming you've added the PDF to the public folder
                      link.download = 'Krish_Kumar_Resume.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    DOWNLOAD CV
                  </motion.button>
                </div>
              </div>
            </SlideInFromLeft>
          </div>

          {/* Right Column - Visual Elements */}
          <SlideInFromRight delay={0.4}>
            <div className="relative">
              {/* Profile Image Container */}
              <div className="relative w-80 h-80 mx-auto">
                {/* Rotating Gradient Border */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-f1-red via-f1-orange to-neon-cyan"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Static Image Container */}
                <div className="absolute inset-1 rounded-full bg-bat-black overflow-hidden">
                  <img 
                    src={profileImage}
                    alt="Krish Kumar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating Tech Icons */}
              <FloatingElements className="absolute -top-4 -right-4">
                <div className="w-12 h-12 bg-gradient-to-r from-f1-red to-f1-orange rounded-lg flex items-center justify-center text-white font-bold">
                  JS
                </div>
              </FloatingElements>
              
              <FloatingElements className="absolute -bottom-4 -left-4">
                <div className="w-12 h-12 bg-gradient-to-r from-neon-cyan to-neon-green rounded-lg flex items-center justify-center text-black font-bold">
                  AI
                </div>
              </FloatingElements>
              
              <FloatingElements className="absolute top-8 -left-8">
                <div className="w-10 h-10 bg-gradient-to-r from-f1-blue to-f1-purple rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  F1
                </div>
              </FloatingElements>
            </div>
          </SlideInFromRight>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div 
        className="mt-12 mb-12 max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <F1Card 
              key={index}
              className="text-center cursor-pointer team-redbull relative overflow-hidden"
              onMouseEnter={() => setActiveStats(index)}
              onMouseLeave={() => setActiveStats(null)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative z-10"
              >
                <div className={`text-3xl lg:text-4xl font-racing font-bold ${stat.color} mb-2`}>
                  <CountUpAnimation end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-400 font-formula">
                  {stat.label}
                </div>
              </motion.div>
              
              {activeStats === index && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-f1-red/20 to-f1-orange/20 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </F1Card>
          ))}
        </div>
      </motion.div>

      {/* Quick Navigation */}
      <motion.div 
        className="mt-12 mb-20 max-w-4xl mx-auto w-full text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="text-sm text-neon-cyan font-racing mb-6 tracking-wider">
          QUICK ACCESS PANEL
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'VIEW PROJECTS', icon: '🚀', color: 'from-f1-red to-f1-orange', section: 'projects' },
            { label: 'SKILLS MATRIX', icon: '⚡', color: 'from-neon-cyan to-neon-green', section: 'skillset' },
            { label: 'CONTACT ME', icon: '📡', color: 'from-f1-blue to-f1-purple', section: 'contact' },
            { label: 'RESUME', icon: '📄', color: 'from-f1-orange to-f1-red', section: 'about' }
          ].map((item, index) => (
            <motion.button
              key={index}
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: item.section }))}
              className={`p-4 rounded-lg bg-gradient-to-r ${item.color} text-white font-racing text-xs hover:shadow-lg transition-all duration-300`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + index * 0.1 }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              {item.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Racing Lines Background Animation */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-0 w-2 h-32 bg-gradient-to-b from-transparent via-f1-red to-transparent"
          animate={{ y: [0, 400, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 right-16 w-1 h-24 bg-gradient-to-b from-transparent via-neon-cyan to-transparent"
          animate={{ y: [0, 300, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
        />
      </div>

      {/* Time Display */}
      <motion.div 
        className="absolute top-24 right-8 text-right text-neon-green font-racing text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div>SYSTEM TIME</div>
        <div className="text-lg">{currentTime.toLocaleTimeString()}</div>
      </motion.div>
    </div>
  );
};

export default Home;

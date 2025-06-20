import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FadeInUp, 
  SlideInFromLeft, 
  SlideInFromRight,
  StaggeredFadeIn,
  ScaleOnHover
} from '../ui/Animations';
import { F1Card, TechCard, NeonText } from '../ui/Effects';

const About = () => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [selectedInterest, setSelectedInterest] = useState(null);

  const timeline = [
    {
      year: '2021',
      title: 'The Beginning',
      description: 'Started my journey in computer science, fascinated by the intersection of technology and racing.',
      icon: '🚀',
      color: 'from-f1-red to-f1-orange'
    },
    {
      year: '2022',
      title: 'Full-Stack Development',
      description: 'Mastered modern web technologies and built my first major projects.',
      icon: '💻',
      color: 'from-neon-cyan to-neon-green'
    },
    {
      year: '2023',
      title: 'AI & Data Science',
      description: 'Dove deep into machine learning and AI, specializing in F1 data analytics.',
      icon: '🤖',
      color: 'from-f1-blue to-f1-purple'
    },
    {
      year: '2024',
      title: 'Tech Expert',
      description: 'Emerged as a full-stack developer, combining speed, precision, and innovation.',
      icon: '🦸‍♂️',
      color: 'from-f1-orange to-f1-red'
    }
  ];

  const interests = [
    {
      title: 'Formula 1 Racing',
      description: 'Passionate about F1 analytics, studying telemetry data and race strategies.',
      icon: '🏎️',
      details: 'Max Verstappen and Lewis Hamilton inspire my precision and relentless pursuit of excellence.',
      stats: '24 races analyzed this season'
    },
    {
      title: 'Artificial Intelligence',
      description: 'Building intelligent systems that can learn, adapt, and make decisions.',
      icon: '🧠',
      details: 'Specialized in neural networks, computer vision, and natural language processing.',
      stats: '15+ AI models deployed'
    },
    {
      title: 'Cryptocurrency',
      description: 'Developing trading algorithms and blockchain-based solutions.',
      icon: '₿',
      details: 'Created automated trading bots with 87% success rate in volatile markets.',
      stats: '$50K+ in automated trades'
    },
    {
      title: 'Cybersecurity',
      description: 'Technical approach to digital security and ethical hacking.',
      icon: '🛡️',
      details: 'Penetration testing, vulnerability assessment, and secure code development.',
      stats: '10+ security audits completed'
    }
  ];

  const values = [
    {
      title: 'Precision',
      description: 'Like an F1 driver hitting the apex, every line of code matters.',
      icon: '🎯'
    },
    {
      title: 'Speed',
      description: 'Fast execution without compromising quality or security.',
      icon: '⚡'
    },
    {
      title: 'Innovation',
      description: 'Pushing boundaries and exploring uncharted territories.',
      icon: '🚀'
    },
    {
      title: 'Excellence',
      description: 'Striving for pole position in every project I undertake.',
      icon: '🏆'
    }
  ];

  return (
    <div className="min-h-screen px-6 lg:px-12 py-12">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header Section */}
        <FadeInUp className="text-center space-y-6">
          <motion.div
            className="text-sm font-racing text-neon-cyan tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {'>'} LOADING PROFILE DATA...
          </motion.div>
          
          <h1 className="text-5xl lg:text-7xl font-racing font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-f1-red via-f1-orange to-neon-cyan">
              ABOUT
            </span>
            <br />
            <span className="text-white">THE TECH EXPERT</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm not just a developer—I'm a tech expert who operates at the intersection of 
            <NeonText color="f1-red"> Formula 1 precision </NeonText> and 
            <NeonText color="neon-cyan"> cutting-edge technology</NeonText>. 
            My mission: to build extraordinary digital experiences that push the boundaries of what's possible.
          </p>
        </FadeInUp>

        {/* Personal Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <SlideInFromLeft>
            <TechCard className="space-y-6" glow>
              <h2 className="text-3xl font-racing text-f1-orange mb-4">
                THE ORIGIN STORY
              </h2>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  My journey began with a simple fascination: watching Max Verstappen's 
                  surgical precision on the Monaco Grand Prix. That moment sparked something—
                  the realization that technology, like racing, requires split-second decisions, 
                  flawless execution, and relentless optimization.
                </p>
                
                <p>
                  Inspired by Lewis Hamilton's strategic brilliance and Verstappen's raw speed, 
                  I developed my own approach to development: combining technical precision 
                  with an F1 driver's precision. Every project is a race, every bug is an 
                  opponent to overtake.
                </p>
                
                <p>
                  Today, I operate in the shadows of the digital world, crafting solutions 
                  that are as elegant as they are powerful, as fast as they are secure.
                </p>
              </div>
              
              <div className="pt-4 border-t border-neon-cyan/20">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-neon-green">Status:</span>
                  <span className="text-white">Tech Expert</span>
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                </div>
              </div>
            </TechCard>
          </SlideInFromLeft>

          <SlideInFromRight>
            <div className="space-y-6">
              <h3 className="text-2xl font-racing text-neon-cyan">CORE VALUES</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <ScaleOnHover key={index}>
                    <F1Card className="text-center space-y-3 team-redbull">
                      <div className="text-3xl">{value.icon}</div>
                      <h4 className="font-racing text-f1-orange">{value.title}</h4>
                      <p className="text-sm text-gray-400">{value.description}</p>
                    </F1Card>
                  </ScaleOnHover>
                ))}
              </div>
            </div>
          </SlideInFromRight>
        </div>

        {/* Timeline Section */}
        <div className="space-y-8">
          <FadeInUp>
            <h2 className="text-4xl font-racing text-center text-transparent bg-clip-text bg-gradient-to-r from-f1-red to-neon-cyan">
              RACING TIMELINE
            </h2>
          </FadeInUp>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-f1-red via-f1-orange to-neon-cyan"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  onMouseEnter={() => setActiveTimeline(index)}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <F1Card className={`inline-block max-w-md cursor-pointer ${
                      activeTimeline === index ? 'scale-105 shadow-2xl' : ''
                    } transition-all duration-300`}>
                      <div className="space-y-3">
                        <div className={`text-2xl font-racing bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                          {item.year}
                        </div>
                        <h3 className="text-xl font-racing text-white">{item.title}</h3>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </F1Card>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10">
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Interests & Passions */}
        <div className="space-y-8">
          <FadeInUp>
            <h2 className="text-4xl font-racing text-center text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green">
              INTERESTS & PASSIONS
            </h2>
          </FadeInUp>

          <StaggeredFadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => setSelectedInterest(selectedInterest === index ? null : index)}
                  whileHover={{ y: -10 }}
                >
                  <TechCard className={`h-full transition-all duration-300 ${
                    selectedInterest === index ? 'border-f1-blue shadow-2xl' : ''
                  }`}>
                    <div className="space-y-4">
                      <div className="text-4xl text-center">{interest.icon}</div>
                      <h3 className="font-racing text-f1-orange text-center">{interest.title}</h3>
                      <p className="text-gray-400 text-sm text-center">{interest.description}</p>
                      
                      <AnimatePresence>
                        {selectedInterest === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-neon-cyan/20 pt-4 space-y-2"
                          >
                            <p className="text-xs text-gray-500">{interest.details}</p>
                            <div className="text-xs text-neon-green font-racing">
                              {interest.stats}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </TechCard>
                </motion.div>
              ))}
            </div>
          </StaggeredFadeIn>
        </div>

        {/* Quote Section */}
        <FadeInUp>
          <div className="text-center space-y-6 py-12">
            <motion.div
              className="text-3xl lg:text-5xl font-racing text-transparent bg-clip-text bg-gradient-to-r from-f1-red via-f1-orange to-neon-cyan"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              "PRECISION, SPEED, INNOVATION"
            </motion.div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              My development philosophy, inspired by the greatest F1 drivers: 
              Execute with precision, deliver with speed, innovate without limits.
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-neon-cyan">
              <span>- The Tech Expert</span>
              <div className="w-8 h-0.5 bg-f1-red"></div>
              <span>2024</span>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
};

export default About;

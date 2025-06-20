import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FadeInUp, 
  SlideInFromLeft, 
  StaggeredFadeIn,
  ScaleOnHover,
  RotatingGlow
} from '../ui/Animations';
import { F1Card, TechCard, NeonText } from '../ui/Effects';

const Skillset = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [skillProgress, setSkillProgress] = useState({});

  useEffect(() => {
    // Animate skill bars on component mount
    const timer = setTimeout(() => {
      const newProgress = {};
      const currentSkills = skillCategories[activeCategory].skills;
      currentSkills.forEach(skill => {
        newProgress[skill.name] = skill.level;
      });
      setSkillProgress(newProgress);
    }, 500);

    return () => clearTimeout(timer);
  }, [activeCategory]); // Removed skillCategories dependency as it's static

  const skillCategories = {
    frontend: {
      title: 'Frontend Arsenal',
      icon: '🎨',
      color: 'from-f1-red to-f1-orange',
      skills: [
        { name: 'React.js', level: 95, icon: '⚛️', description: 'Building dynamic UIs with hooks, context, and modern patterns' },
        { name: 'TypeScript', level: 90, icon: '📘', description: 'Type-safe development for scalable applications' },
        { name: 'Next.js', level: 88, icon: '▲', description: 'Full-stack React framework with SSR and SSG' },
        { name: 'Tailwind CSS', level: 92, icon: '🎨', description: 'Utility-first CSS for rapid UI development' },
        { name: 'Framer Motion', level: 85, icon: '🎭', description: 'Creating smooth animations and micro-interactions' },
        { name: 'Three.js', level: 75, icon: '🎮', description: '3D web graphics and immersive experiences' }
      ]
    },
    backend: {
      title: 'Backend Engine',
      icon: '⚙️',
      color: 'from-neon-cyan to-neon-green',
      skills: [
        { name: 'Node.js', level: 93, icon: '🟢', description: 'Server-side JavaScript for scalable applications' },
        { name: 'Python', level: 96, icon: '🐍', description: 'Data science, AI/ML, and backend development' },
        { name: 'PostgreSQL', level: 88, icon: '🗄️', description: 'Advanced database design and optimization' },
        { name: 'MongoDB', level: 85, icon: '🍃', description: 'NoSQL database for flexible data structures' },
        { name: 'GraphQL', level: 82, icon: '📊', description: 'Efficient API queries and data fetching' },
        { name: 'Docker', level: 87, icon: '🐳', description: 'Containerization and deployment automation' }
      ]
    },
    ai: {
      title: 'AI & Data Science',
      icon: '🤖',
      color: 'from-f1-blue to-f1-purple',
      skills: [
        { name: 'Machine Learning', level: 91, icon: '🧠', description: 'Predictive models and pattern recognition' },
        { name: 'TensorFlow', level: 87, icon: '🔶', description: 'Deep learning and neural network development' },
        { name: 'PyTorch', level: 84, icon: '🔥', description: 'Research-oriented deep learning framework' },
        { name: 'Data Analytics', level: 94, icon: '📈', description: 'Statistical analysis and data visualization' },
        { name: 'Computer Vision', level: 79, icon: '👁️', description: 'Image processing and object detection' },
        { name: 'NLP', level: 82, icon: '💬', description: 'Natural language processing and understanding' }
      ]
    },
    tools: {
      title: 'Tools & Technologies',
      icon: '🛠️',
      color: 'from-f1-orange to-f1-red',
      skills: [
        { name: 'Git/GitHub', level: 96, icon: '🔧', description: 'Version control and collaborative development' },
        { name: 'VS Code', level: 98, icon: '📝', description: 'Professional development environment' },
        { name: 'AWS', level: 81, icon: '☁️', description: 'Cloud infrastructure and services' },
        { name: 'Firebase', level: 86, icon: '🔥', description: 'Backend-as-a-Service for rapid development' },
        { name: 'Linux', level: 89, icon: '🐧', description: 'System administration and server management' },
        { name: 'Figma', level: 78, icon: '🎨', description: 'UI/UX design and prototyping' }
      ]
    }
  };

  const achievements = [
    {
      title: 'F1 Data Champion',
      description: 'Built ML models predicting race outcomes with 87% accuracy',
      icon: '🏆',
      color: 'text-f1-red'
    },
    {
      title: 'Full-Stack Expert',
      description: 'Deployed 25+ full-stack applications in production',
      icon: '🦸‍♂️',
      color: 'text-neon-cyan'
    },
    {
      title: 'AI Innovation Award',
      description: 'Created autonomous trading bot with 156% ROI',
      icon: '🚀',
      color: 'text-f1-orange'
    },
    {
      title: 'Code Velocity Master',
      description: 'Average 50+ commits per week across all projects',
      icon: '⚡',
      color: 'text-neon-green'
    }
  ];

  // Removed certifications section

  return (
    <div className="min-h-screen px-6 lg:px-12 py-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <FadeInUp className="text-center space-y-6">
          <motion.div
            className="text-sm font-racing text-neon-cyan tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {'>'} ANALYZING SKILL MATRIX...
          </motion.div>
          
          <h1 className="text-5xl lg:text-7xl font-racing font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-f1-red via-f1-orange to-neon-cyan">
              TECHNICAL
            </span>
            <br />
            <span className="text-white">ARSENAL</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My toolkit combines the 
            <NeonText color="f1-red"> speed of F1 technology </NeonText> 
            with the 
            <NeonText color="neon-cyan"> mastery of technical precision</NeonText>. 
            Every skill honed for maximum impact.
          </p>
        </FadeInUp>

        {/* Category Navigation */}
        <FadeInUp delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(skillCategories).map(([key, category]) => (
              <motion.button
                key={key}
                className={`px-6 py-3 rounded-lg font-racing text-sm transition-all duration-300 ${
                  activeCategory === key
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-bat-black'
                }`}
                onClick={() => setActiveCategory(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  {category.icon} {category.title}
                </span>
              </motion.button>
            ))}
          </div>
        </FadeInUp>

        {/* Skills Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <TechCard className={`transition-all duration-300 ${
                    hoveredSkill === skill.name ? 'border-f1-orange shadow-2xl scale-105' : ''
                  }`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{skill.icon}</span>
                          <h3 className="font-racing text-white text-lg">{skill.name}</h3>
                        </div>
                        <span className={`font-racing text-sm bg-gradient-to-r ${skillCategories[activeCategory].color} bg-clip-text text-transparent`}>
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="relative">
                        <div className="w-full h-2 bg-bat-gray rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skillCategories[activeCategory].color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${skillProgress[skill.name] || 0}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                        
                        {/* Skill Level Indicator */}
                        <motion.div
                          className="absolute top-0 w-2 h-2 bg-white rounded-full"
                          initial={{ left: 0 }}
                          animate={{ left: `${(skillProgress[skill.name] || 0) - 1}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                      
                      <p className="text-sm text-gray-400">{skill.description}</p>
                    </div>
                  </TechCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Achievements Section removed */}

        {/* Certifications section removed */}

        {/* Weapons of Choice */}
        <FadeInUp>
          <TechCard className="p-8 text-center" glow>
            <h2 className="text-3xl font-racing text-f1-orange mb-8">WEAPONS OF CHOICE</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
              {/* Programming Languages */}
              <div className="space-y-4">
                <h3 className="text-xl font-racing text-white mb-3">PROGRAMMING LANGUAGES</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {['C', 'C++', 'Java', 'JavaScript', 'Python', 'TypeScript'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white rounded text-sm font-racing shadow-md"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: "0 0 8px rgba(30, 144, 255, 0.8)",
                        borderColor: "#1E90FF" 
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <motion.span 
                    className="text-2xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🏎️
                  </motion.span>
                </div>
              </div>

              {/* Frameworks & Libraries */}
              <div className="space-y-4">
                <h3 className="text-xl font-racing text-white mb-3">FRAMEWORKS & LIBRARIES</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {['React', 'React Native', 'Django', 'FastAPI', 'Express.js'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white rounded text-sm font-racing shadow-md"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: "0 0 8px rgba(30, 144, 255, 0.8)",
                        borderColor: "#1E90FF" 
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <motion.span 
                    className="text-2xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    🦸‍♂️
                  </motion.span>
                </div>
              </div>

              {/* Cloud & Deployment */}
              <div className="space-y-4">
                <h3 className="text-xl font-racing text-white mb-3">CLOUD & DEPLOYMENT</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {['AWS', 'Azure', 'Vercel', 'Render'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white rounded text-sm font-racing shadow-md"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: "0 0 8px rgba(30, 144, 255, 0.8)",
                        borderColor: "#1E90FF" 
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <motion.span 
                    className="text-2xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    🛠️
                  </motion.span>
                </div>
              </div>

              {/* Databases & AI/ML */}
              <div className="space-y-4">
                <h3 className="text-xl font-racing text-white mb-3">DATABASES & AI/ML</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {['MongoDB', 'MySQL', 'Supabase', 'TensorFlow', 'Keras'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white rounded text-sm font-racing shadow-md"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: "0 0 8px rgba(30, 144, 255, 0.8)",
                        borderColor: "#1E90FF" 
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <motion.span 
                    className="text-2xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1] 
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    🧠
                  </motion.span>
                </div>
              </div>
            </div>
            
            {/* Design & Tools */}
            <div className="mt-8">
              <h3 className="text-xl font-racing text-white mb-3">DESIGN & TOOLS</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['Figma', 'Canva', 'Adobe', 'Arduino'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-white rounded text-sm font-racing shadow-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: "0 0 8px rgba(30, 144, 255, 0.8)",
                      borderColor: "#1E90FF" 
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </TechCard>
        </FadeInUp>
      </div>
    </div>
  );
};

export default Skillset;

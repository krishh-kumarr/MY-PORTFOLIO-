import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, FadeInUp, StaggerReveal, StaggerItem } from '../ui/Animations';
import { LampContainer } from '../ui/lamp';

const skillGroups = [
  {
    id: 'languages',
    category: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C', 'SQL'],
  },
  {
    id: 'frontend',
    category: 'Frontend',
    skills: ['React', 'React Native', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'],
  },
  {
    id: 'backend',
    category: 'Backend',
    skills: ['Node.js', 'Express', 'FastAPI', 'Django', 'GraphQL', 'REST APIs'],
  },
  {
    id: 'ai',
    category: 'AI / ML',
    skills: ['TensorFlow', 'PyTorch', 'OpenCV', 'LangChain', 'NLP', 'Computer Vision', 'Keras'],
  },
  {
    id: 'cloud',
    category: 'Cloud & Tools',
    skills: ['AWS', 'Azure', 'Firebase', 'Docker', 'Git', 'PostgreSQL', 'MongoDB', 'Supabase', 'Vercel'],
  },
];

const softSkills = [
  { title: 'Leadership', desc: 'Team management, delegation, motivation' },
  { title: 'Communication', desc: 'Technical writing, presentations' },
  { title: 'Problem-Solving', desc: 'Analytical thinking, root-cause analysis' },
  { title: 'Adaptability', desc: 'Rapid learning, working with ambiguity' },
  { title: 'Collaboration', desc: 'Cross-functional teamwork, active listening' },
];

const Skillset = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <LampContainer>
          <ScrollReveal className="text-center space-y-4">
            <div className="text-accent text-small font-medium tracking-widest uppercase">
              Skills
            </div>
            <h2 className="text-section text-text-primary">
              Technologies I work with
            </h2>
            <p className="text-text-secondary text-body max-w-2xl mx-auto">
              From building mobile apps to training machine learning models —
              a focused toolkit, not a buzzword list.
            </p>
          </ScrollReveal>
        </LampContainer>

        {/* Radio Tab Navigation */}
        <FadeInUp delay={0.1}>
          <div className="flex justify-center">
            <div className="skill-tabs no-scrollbar">
              {skillGroups.map((group, index) => (
                <React.Fragment key={group.id}>
                  <input
                    type="radio"
                    id={`skill-radio-${group.id}`}
                    name="skill-tabs"
                    checked={activeIndex === index}
                    onChange={() => setActiveIndex(index)}
                    className="skill-tab-radio"
                  />
                  <label
                    className="skill-tab-label"
                    htmlFor={`skill-radio-${group.id}`}
                  >
                    {group.category}
                  </label>
                </React.Fragment>
              ))}
              <span
                className="skill-tab-glider"
                style={{
                  transform: `translateX(${activeIndex * 100}%)`,
                  width: `${100 / skillGroups.length}%`,
                }}
              />
            </div>
          </div>
        </FadeInUp>

        {/* Active Skills Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="min-h-[140px]"
          >
            <div className="text-center mb-6">
              <span className="text-text-tertiary text-small font-medium">
                {skillGroups[activeIndex].category}
              </span>
            </div>
            <StaggerReveal className="flex flex-wrap justify-center gap-3">
              {skillGroups[activeIndex].skills.map((skill) => (
                <StaggerItem key={skill}>
                  <motion.span
                    className="glass-tag"
                    whileHover={{
                      y: -3,
                      background: 'rgba(78, 161, 255, 0.12)',
                      borderColor: 'rgba(78, 161, 255, 0.25)',
                      color: '#F8FAFC',
                      transition: { duration: 0.2 },
                    }}
                  >
                    {skill}
                  </motion.span>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </motion.div>
        </AnimatePresence>

        {/* Divider */}
        <div className="section-divider" />

        {/* Soft Skills */}
        <ScrollReveal className="space-y-10">
          <div className="text-center space-y-4">
            <div className="text-accent text-small font-medium tracking-widest uppercase">
              Beyond Code
            </div>
            <h3 className="text-2xl font-semibold text-text-primary">
              Soft Skills
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {softSkills.map((skill, index) => (
              <FadeInUp key={skill.title} delay={index * 0.06}>
                <motion.div
                  className="glass-card p-5 text-center h-full"
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                >
                  <h4 className="text-sm font-semibold text-text-primary mb-2">
                    {skill.title}
                  </h4>
                  <p className="text-xs text-text-tertiary leading-relaxed">
                    {skill.desc}
                  </p>
                </motion.div>
              </FadeInUp>
            ))}
          </div>
        </ScrollReveal>

        {/* Design & Tools Row */}
        <ScrollReveal>
          <div className="text-center space-y-5">
            <span className="text-text-tertiary text-small font-medium">
              Design & Tools
            </span>
            <div className="flex flex-wrap justify-center gap-3">
              {['Figma', 'Canva', 'Adobe', 'Arduino', 'Postman', 'VS Code'].map((tool) => (
                <motion.span
                  key={tool}
                  className="glass-tag text-xs"
                  whileHover={{ y: -2 }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Skillset;

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal, FadeInUp } from '../ui/Animations';
import { GlassCard, Trophy } from '../ui/Effects';
import { LampContainer } from '../ui/lamp';
import profileImage from '../assets/profile.jpg';

const achievements = [
  {
    year: '2024',
    title: 'Red Bull Basement Winner',
    description: 'National winner — built an innovative solution addressing real-world challenges at the international hackathon.',
    highlight: true,
  },
  {
    year: '2024–25',
    title: 'Academic Excellence Award',
    description: 'Recognized for outstanding academic performance at SRM University.',
  },
  {
    year: '2024–25',
    title: 'Smart India Hackathon',
    description: 'Internal round winner — competed among top engineering teams across India.',
  },
  {
    year: '2024',
    title: 'Ideathon Champion',
    description: 'First place for AI-powered solution design, pitch, and technical execution.',
  },
  {
    year: '3rd Year',
    title: 'Performance Scholarship',
    description: 'Performance-based scholarship awarded by SRM University for consistent excellence.',
  },
];

const About = () => {
  return (
    <div className="py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-32">
        {/* Section Header */}
        <LampContainer>
          <ScrollReveal className="text-center space-y-4">
            <div className="text-accent text-small font-medium tracking-widest uppercase">
              About
            </div>
            <h2 className="text-section text-text-primary">
              Engineer with a founder mindset
            </h2>
          </ScrollReveal>
        </LampContainer>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Left — Photo */}
          <FadeInUp className="lg:col-span-2" delay={0.1}>
            <div className="relative">
              <div className="glass-card overflow-hidden p-2">
                <img
                  src={profileImage}
                  alt="Krish Kumar"
                  className="w-full rounded-xl object-cover aspect-[3/4]"
                  loading="lazy"
                />
              </div>
              {/* Accent glow */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />
            </div>
          </FadeInUp>

          {/* Right — Story */}
          <FadeInUp className="lg:col-span-3 space-y-8" delay={0.2}>
            <div className="space-y-6 text-body text-text-secondary">
              <p>
                I'm an engineer who builds things from scratch. From AI platforms that help parents
                understand child development, to LLM-powered tools that optimize database queries —
                I'm driven by the intersection of{' '}
                <span className="text-text-primary font-medium">artificial intelligence</span>,{' '}
                <span className="text-text-primary font-medium">software engineering</span>, and{' '}
                <span className="text-text-primary font-medium">real-world impact</span>.
              </p>

              <p>
                I think like a founder. Every project starts with a problem worth solving,
                and I won't stop until the solution is shipped, tested, and in the hands of users.
                Winning Red Bull Basement validated that approach — building something that matters,
                under pressure, with a team that cares.
              </p>

              <p>
                Currently studying at SRM University with an Academic Excellence Award
                and a Performance Scholarship. Beyond code, I'm fascinated by astronomy, 
                startup culture, and the future of AI. I believe the best products come from 
                people who are deeply curious and relentlessly focused on craft.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {['AI/ML', 'Full-Stack', 'Mobile', 'Cloud', 'Startups', 'Astronomy'].map((tag) => (
                <motion.span
                  key={tag}
                  className="glass-tag"
                  whileHover={{ y: -2 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </FadeInUp>
        </div>

        {/* Achievements Spotlight */}
        <div className="space-y-12">
          <ScrollReveal className="text-center space-y-4">
            <div className="text-accent text-small font-medium tracking-widest uppercase">
              Achievements
            </div>
            <h2 className="text-section text-text-primary">
              Built to compete, built to win
            </h2>
          </ScrollReveal>

          {/* Featured — Red Bull */}
          <FadeInUp>
            <div className="glass-card overflow-hidden animated-border">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 lg:p-10 flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-3">
                    <Trophy />
                    <span className="text-accent text-small font-medium">2024 · National Winner</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-text-primary">
                    Red Bull Basement
                  </h3>
                  <p className="text-text-secondary text-body leading-relaxed">
                    Won the national Red Bull Basement hackathon — a global competition challenging
                    students to build innovative tech solutions that create positive impact. Built and
                    pitched a product under intense time pressure, competing against top teams nationwide.
                  </p>
                </div>
                <div className="p-8 lg:p-10 bg-gradient-to-br from-accent/[0.04] to-transparent flex items-center justify-center">
                  <motion.div
                    className="text-center space-y-4"
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="relative inline-block">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center">
                        <div className="trophy" style={{ transform: 'scale(1.5)' }}>
                          <div className="trophy-body" />
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                        <span className="text-primary text-xs font-bold">✓</span>
                      </div>
                    </div>
                    <div className="text-text-tertiary text-xs uppercase tracking-wider">
                      International Hackathon
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </FadeInUp>

          {/* Other achievements grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.filter(a => !a.highlight).map((item, index) => (
              <FadeInUp key={item.title} delay={index * 0.08}>
                <GlassCard className="p-6 h-full space-y-3">
                  <div className="flex items-center gap-2">
                    <Trophy />
                    <span className="text-accent text-xs font-medium">{item.year}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-text-tertiary text-xs leading-relaxed">
                    {item.description}
                  </p>
                </GlassCard>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

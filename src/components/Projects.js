import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal, FadeInUp } from '../ui/Animations';
import { GlassCard, PhoneMockup, MacBookMockup } from '../ui/Effects';
import { LampContainer } from '../ui/lamp';
import { IpadScroll } from '../ui/IpadScroll';
import { MacbookScroll } from '../ui/MacbookScroll';

const projects = [
  {
    id: 'sql-optimizer',
    title: 'LLM-Powered SQL Optimization',
    tagline: 'Intelligent Query Analysis & Performance Tuning',
    description:
      'An enterprise-grade tool that leverages Large Language Models to analyze SQL queries, detect performance bottlenecks, and generate optimized alternatives with detailed explanations.',
    problem: 'Database performance tuning requires deep expertise. Most developers write inefficient queries that slow down applications as data scales.',
    solution: 'Built an LLM-powered pipeline that takes raw SQL, analyzes execution patterns, identifies anti-patterns, and generates optimized queries with performance benchmarks.',
    techStack: ['Python', 'LangChain', 'OpenAI', 'PostgreSQL', 'FastAPI', 'React'],
    impact: 'Reduces average query execution time by 40-60%. Provides natural language explanations of optimization strategies.',
    link: 'https://github.com/krishh-kumarr/v7-sql-nlp',
    linkLabel: 'View on GitHub',
    layout: 'code',
  },
  {
    id: 'ip-tracker',
    title: 'IP Tracking Game',
    tagline: 'Multiplayer Location-Based Strategy Game',
    description:
      'A real-time multiplayer game that combines IP-based geolocation with competitive strategy mechanics, creating an engaging experience where geography meets gaming.',
    problem: 'Most browser-based games lack real-world context. Location-based gaming is dominated by mobile-only experiences.',
    solution: 'Built a web-based multiplayer system using IP geolocation, real-time socket communication, and competitive game logic.',
    techStack: ['Node.js', 'Socket.io', 'React', 'Express', 'MongoDB'],
    impact: 'Full multiplayer infrastructure with real-time state sync, location tracking, and competitive scoring.',
    link: '#',
    linkLabel: 'View Project',
    layout: 'game',
  },
];

const ProjectShowcase = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <FadeInUp delay={0.1}>
      <div className="glass-card overflow-hidden">
        <div className={`grid lg:grid-cols-2 gap-0 ${!isEven ? 'lg:direction-rtl' : ''}`}>
          {/* Visual Side */}
          <div className={`relative p-8 lg:p-12 flex items-center justify-center bg-gradient-to-br from-accent/[0.03] to-transparent min-h-[360px] ${!isEven ? 'lg:order-2' : ''}`}>
            {project.layout === 'phone' && <PhoneVisual />}
            {project.layout === 'code' && <CodeVisual />}
            {project.layout === 'game' && <GameVisual />}
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-accent/[0.06] rounded-full blur-[80px] pointer-events-none" />
          </div>

          {/* Content Side */}
          <div className={`p-8 lg:p-12 flex flex-col justify-center space-y-6 ${!isEven ? 'lg:order-1' : ''}`}>
            <div className="space-y-3">
              <div className="text-accent text-small font-medium tracking-wider uppercase">
                {project.tagline}
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
                {project.title}
              </h3>
              <p className="text-text-secondary text-body leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Problem / Solution */}
            <div className="space-y-4">
              <div className="glass-card-strong p-5 rounded-xl">
                <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">Problem</div>
                <p className="text-text-secondary text-small">{project.problem}</p>
              </div>
              <div className="glass-card-strong p-5 rounded-xl">
                <div className="text-xs font-semibold text-success uppercase tracking-wider mb-2">Solution</div>
                <p className="text-text-secondary text-small">{project.solution}</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="glass-tag text-xs">
                  {tech}
                </span>
              ))}
            </div>

            {/* Impact */}
            <p className="text-text-tertiary text-small italic">
              {project.impact}
            </p>

            {/* CTA */}
            {project.link !== '#' && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex self-start"
              >
                {project.linkLabel}
                <span className="ml-2">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </FadeInUp>
  );
};

/* --- Visual Components --- */

const PhoneVisual = () => (
  <div className="relative">
    <motion.div
      animate={{ y: [-6, 6, -6] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PhoneMockup className="w-[160px] shadow-glass-lg">
        <div className="bg-[#0D1117] aspect-[9/16] p-4 flex flex-col">
          {/* App Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center">
              <span className="text-primary text-[10px] font-bold">PB</span>
            </div>
            <div>
              <div className="text-[9px] text-text-primary font-medium">ParentBud</div>
              <div className="text-[7px] text-text-tertiary">Dashboard</div>
            </div>
          </div>
          {/* Mock Cards */}
          <div className="space-y-2 flex-1">
            <div className="bg-accent/10 rounded-lg p-2">
              <div className="text-[7px] text-accent font-medium">Milestone</div>
              <div className="text-[8px] text-text-primary mt-0.5">First Words</div>
              <div className="h-1 bg-accent/20 rounded-full mt-1">
                <div className="h-full bg-accent rounded-full w-3/4" />
              </div>
            </div>
            <div className="bg-white/[0.03] rounded-lg p-2">
              <div className="text-[7px] text-success font-medium">Growth</div>
              <div className="text-[8px] text-text-primary mt-0.5">On Track</div>
              <div className="flex gap-0.5 mt-1">
                {[40, 60, 45, 70, 55, 80, 65].map((h, i) => (
                  <div key={i} className="flex-1 bg-success/20 rounded-sm" style={{ height: `${h * 0.3}px` }}>
                    <div className="bg-success/40 rounded-sm w-full" style={{ height: `${h * 0.2}px`, marginTop: 'auto' }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/[0.03] rounded-lg p-2">
              <div className="text-[7px] text-text-tertiary font-medium">AI Insight</div>
              <div className="text-[7px] text-text-secondary mt-0.5 leading-snug">
                Your child is developing strong motor skills. Consider...
              </div>
            </div>
          </div>
          {/* Bottom Nav */}
          <div className="flex justify-around mt-2 pt-2 border-t border-white/[0.05]">
            {['Home', 'Track', 'AI', 'Profile'].map((tab) => (
              <div key={tab} className="text-[6px] text-text-tertiary text-center">
                <div className={`w-3 h-3 rounded-full mx-auto mb-0.5 ${tab === 'Home' ? 'bg-accent/30' : 'bg-white/[0.05]'}`} />
                {tab}
              </div>
            ))}
          </div>
        </div>
      </PhoneMockup>
    </motion.div>
  </div>
);

const CodeVisual = () => (
  <div className="w-full max-w-sm">
    <motion.div
      animate={{ y: [-4, 4, -4] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <MacBookMockup className="shadow-glass-lg">
        <div className="bg-[#0D1117] p-4 font-mono text-[10px] leading-relaxed">
          <div className="text-text-tertiary mb-2">-- Slow query (before optimization)</div>
          <div className="text-[#FF7B72]">SELECT</div>
          <div className="pl-3 text-text-primary">u.name, COUNT(o.id)</div>
          <div className="text-[#FF7B72]">FROM</div>
          <div className="pl-3 text-text-primary">users u, orders o</div>
          <div className="text-[#FF7B72]">WHERE</div>
          <div className="pl-3 text-text-primary">u.id = o.user_id</div>
          <div className="text-text-tertiary mt-3">⏱ Execution: 3.2s</div>
          <div className="section-divider my-3" />
          <div className="text-success mb-2">-- LLM Optimized ✓</div>
          <div className="text-[#FF7B72]">SELECT</div>
          <div className="pl-3 text-text-primary">u.name, COUNT(o.id)</div>
          <div className="text-[#FF7B72]">FROM</div>
          <div className="pl-3 text-text-primary">users u</div>
          <div className="text-[#79C0FF]">INNER JOIN</div>
          <div className="pl-3 text-text-primary">orders o ON u.id = o.user_id</div>
          <div className="text-[#FF7B72]">GROUP BY</div>
          <div className="pl-3 text-text-primary">u.name</div>
          <div className="text-success mt-3">⚡ Execution: 0.4s (87% faster)</div>
        </div>
      </MacBookMockup>
    </motion.div>
    {/* Flow diagram below */}
    <div className="flex items-center justify-center gap-2 mt-6">
      {['Input SQL', 'LLM Analysis', 'Optimization', 'Output'].map((step, i) => (
        <React.Fragment key={step}>
          <div className="glass-tag text-[10px] px-3 py-1.5">{step}</div>
          {i < 3 && <span className="text-accent text-xs">→</span>}
        </React.Fragment>
      ))}
    </div>
  </div>
);



const GameVisual = () => (
  <div className="w-full max-w-xs">
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <GlassCard className="p-6 space-y-4 animated-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-text-primary">Live Match</span>
          <span className="text-xs text-success flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
            Online
          </span>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Player 1', score: 2450, position: 'Mumbai, IN' },
            { name: 'Player 2', score: 2120, position: 'Delhi, IN' },
            { name: 'Player 3', score: 1890, position: 'Bangalore, IN' },
          ].map((player, i) => (
            <div key={player.name} className="flex items-center justify-between bg-white/[0.02] rounded-lg p-3">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold ${i === 0 ? 'text-accent' : 'text-text-tertiary'}`}>
                  #{i + 1}
                </span>
                <div>
                  <div className="text-xs font-medium text-text-primary">{player.name}</div>
                  <div className="text-[10px] text-text-tertiary">{player.position}</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-text-secondary">{player.score}</span>
            </div>
          ))}
        </div>
        <div className="text-center text-[10px] text-text-tertiary">
          Real-time multiplayer · IP Geolocation · Socket.io
        </div>
      </GlassCard>
    </motion.div>
  </div>
);

const Projects = () => (
  <div className="py-32 px-6 lg:px-12">
    <div className="max-w-6xl mx-auto space-y-20">
      {/* Section Header */}
      <LampContainer>
        <ScrollReveal className="text-center space-y-4">
          <div className="text-accent text-small font-medium tracking-widest uppercase">
            Projects
          </div>
          <h2 className="text-section text-text-primary">
            Shipped products, not side projects
          </h2>
          <p className="text-text-secondary text-body max-w-2xl mx-auto">
            Each project is a case study in solving real problems — from AI-powered platforms on the App Store
            to developer tools that make databases faster.
          </p>
        </ScrollReveal>
      </LampContainer>

      {/* ParentBud iPad Featured Animation */}
      <IpadScroll
        titleComponent={
          <>
            <h1 className="text-3xl md:text-5xl font-semibold text-text-primary">
              Featured Product <br />
              <span className="text-5xl md:text-[6rem] font-bold mt-2 leading-none text-accent block">
                ParentBud
              </span>
            </h1>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto">
              A comprehensive parenting companion that uses AI to track milestones and connect parents with expert guidance — live on the App Store.
            </p>
          </>
        }
        images={[
          '/pb1.png',
          '/pb2.png',
          '/pb3.png',
          '/pb4.png',
          '/pb5.png'
        ]}
      />

      {/* Vibeout Macbook Featured Animation */}
      <MacbookScroll
        titleComponent={
          <>
            <h1 className="text-3xl md:text-5xl font-semibold text-text-primary">
              Hardware & Systems <br />
              <span className="text-5xl md:text-[6rem] font-bold mt-2 leading-none text-success block">
                Vibeout
              </span>
            </h1>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto">
              Emotion-Based Fitness Platform powered by IoT hardware integration and a robust system architecture.
            </p>
          </>
        }
        images={[
          '/vibeout-setup.png',
          '/vibeout-architecture.png',
          '/vibeout-auth.png',
          '/vibeout-dashboard.png'
        ]}
      />

      {/* Project Showcases */}
      <div className="space-y-12">
        {projects.map((project, index) => (
          <ProjectShowcase key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  </div>
);

export default Projects;

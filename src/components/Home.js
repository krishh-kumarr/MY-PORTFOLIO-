import React from 'react';
import { motion } from 'framer-motion';
import { TypingText, ParallaxFloat } from '../ui/Animations';
import { MacBookMockup, PhoneMockup, GlassCard } from '../ui/Effects';

const Home = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex items-center px-6 lg:px-12 pt-20 pb-16">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — Text Content */}
          <div className="space-y-8 order-1 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6"
            >
              <h1 className="text-hero">
                <span className="text-text-primary">Krish Kumar</span>
              </h1>

              <div className="text-subtitle text-text-secondary">
                <TypingText
                  texts={[
                    'Engineer.',
                    'Founder.',
                    'Problem Solver.',
                    'Hackathon Winner.',
                  ]}
                  speed={90}
                />
              </div>

              <p className="text-body text-text-secondary max-w-lg leading-relaxed">
                Building intelligent products that combine AI, software engineering
                and real-world impact. Winner of Red Bull Basement. Passionate about
                turning ideas into products people love.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="btn-primary"
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="btn-secondary"
              >
                Get In Touch
              </button>
            </motion.div>

            {/* Subtle stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex gap-10 pt-4"
            >
              {[
                { value: '25+', label: 'Projects' },
                { value: '3+', label: 'Years Exp.' },
                { value: '5+', label: 'Hackathons Won' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-text-primary font-semibold text-xl">{stat.value}</div>
                  <div className="text-text-tertiary text-small">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Floating Workspace Scene */}
          <motion.div
            className="relative order-2 lg:order-2 mt-12 lg:mt-0 transform scale-[0.85] sm:scale-100 origin-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full max-w-lg mx-auto" style={{ minHeight: '420px' }}>
              {/* MacBook Mockup */}
              <ParallaxFloat offset={8} delay={0}>
                <div className="relative z-10">
                  <MacBookMockup className="shadow-glass-lg">
                    <div className="bg-[#0D1117] p-4 text-xs font-mono leading-relaxed">
                      <div className="text-text-tertiary mb-1">{'// ParentBud — AI Parenting Platform'}</div>
                      <div>
                        <span className="text-[#FF7B72]">const</span>{' '}
                        <span className="text-[#D2A8FF]">analyzeChild</span>{' '}
                        <span className="text-text-secondary">= </span>
                        <span className="text-[#FF7B72]">async</span>
                        <span className="text-text-secondary"> (</span>
                        <span className="text-[#FFA657]">data</span>
                        <span className="text-text-secondary">) =&gt; {'{'}</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-[#FF7B72]">const</span>{' '}
                        <span className="text-text-primary">insights</span>{' '}
                        <span className="text-text-secondary">= </span>
                        <span className="text-[#FF7B72]">await</span>{' '}
                        <span className="text-[#D2A8FF]">ai</span>
                        <span className="text-text-secondary">.</span>
                        <span className="text-[#D2A8FF]">predict</span>
                        <span className="text-text-secondary">(</span>
                        <span className="text-[#FFA657]">data</span>
                        <span className="text-text-secondary">);</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-[#FF7B72]">return</span>{' '}
                        <span className="text-[#D2A8FF]">generatePlan</span>
                        <span className="text-text-secondary">(</span>
                        <span className="text-text-primary">insights</span>
                        <span className="text-text-secondary">);</span>
                      </div>
                      <div>
                        <span className="text-text-secondary">{'}'}</span>
                      </div>
                    </div>
                  </MacBookMockup>
                </div>
              </ParallaxFloat>

              {/* Phone Mockup — floating to the right */}
              <ParallaxFloat offset={14} delay={1.5}>
                <div className="absolute -right-4 lg:-right-8 top-8 z-20 w-[120px]">
                  <PhoneMockup className="shadow-glass-lg">
                    <div className="bg-[#0D1117] aspect-[9/16] flex flex-col items-center justify-center p-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center mb-2">
                        <span className="text-primary font-bold text-xs">PB</span>
                      </div>
                      <div className="text-[8px] text-text-primary font-medium text-center">ParentBud</div>
                      <div className="text-[6px] text-text-tertiary text-center mt-1">AI Parenting</div>
                      <div className="mt-3 w-full space-y-1.5">
                        <div className="h-1 bg-accent/20 rounded-full w-full" />
                        <div className="h-1 bg-accent/15 rounded-full w-4/5" />
                        <div className="h-1 bg-accent/10 rounded-full w-3/5" />
                      </div>
                    </div>
                  </PhoneMockup>
                </div>
              </ParallaxFloat>

              {/* Terminal Window — floating bottom left */}
              <ParallaxFloat offset={10} delay={3}>
                <div className="absolute -left-4 lg:-left-8 bottom-0 z-20 w-[180px]">
                  <GlassCard className="p-3 shadow-glass animated-border">
                    <div className="text-[8px] text-accent font-medium mb-2 uppercase tracking-wider">Terminal</div>
                    <div className="font-mono text-[9px] space-y-1">
                      <div className="text-success">$ npm run build</div>
                      <div className="text-text-tertiary">✓ Compiled successfully</div>
                      <div className="text-text-tertiary">✓ 0 errors, 0 warnings</div>
                      <div className="text-accent">Bundle: 142kb gzipped</div>
                    </div>
                  </GlassCard>
                </div>
              </ParallaxFloat>

              {/* Accent glow behind the scene */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;

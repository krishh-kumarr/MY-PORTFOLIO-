import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import './styles/globals.css';
import { DotDistortion, MeshGradient, NoiseTexture, Loader, ScrollProgress } from './ui/Effects';
import { FloatingDock } from './ui/floating-dock';
import { Home as HomeIcon, User, Folder, Code, Mail } from 'lucide-react';

const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skillset'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));



const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const mainRef = useRef(null);

  const navItems = [
    { title: 'Home', icon: <HomeIcon size={20} strokeWidth={2} />, onClick: () => scrollToSection('home'), active: activeSection === 'home' },
    { title: 'About', icon: <User size={20} strokeWidth={2} />, onClick: () => scrollToSection('about'), active: activeSection === 'about' },
    { title: 'Projects', icon: <Folder size={20} strokeWidth={2} />, onClick: () => scrollToSection('projects'), active: activeSection === 'projects' },
    { title: 'Skills', icon: <Code size={20} strokeWidth={2} />, onClick: () => scrollToSection('skills'), active: activeSection === 'skills' },
    { title: 'Contact', icon: <Mail size={20} strokeWidth={2} />, onClick: () => scrollToSection('contact'), active: activeSection === 'contact' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    const sections = document.querySelectorAll('[data-section]');

    sections.forEach((section) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.section);
          }
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isLoading]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <AnimatePresence>
        <Loader key="loader" />
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-text-primary font-sans relative">
      {/* Background layers */}
      <MeshGradient />
      <DotDistortion />
      <NoiseTexture />

      {/* Scroll progress */}
      <ScrollProgress progress={scrollProgress} />

      {/* Floating Glass Navbar (MacOS Dock Style) */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingDock items={navItems} />
        </div>
      </div>

      {/* Main Content — Single-page scroll */}
      <main ref={mainRef} className="relative z-10">
        <Suspense fallback={null}>
          <section id="home" data-section="home">
            <Home />
          </section>

          <section id="about" data-section="about">
            <About />
          </section>

          <section id="projects" data-section="projects">
            <Projects />
          </section>

          <section id="skills" data-section="skills">
            <Skills />
          </section>

          <section id="contact" data-section="contact">
            <Contact />
          </section>
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-glass-border py-8 px-6 pb-28">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-text-tertiary text-small">
          <span>© {new Date().getFullYear()} Krish Kumar. Built with craft.</span>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/krishh-kumarr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/krish-kumar-1a119728a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:krishneerajkumar@gmail.com"
              className="hover:text-text-primary transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
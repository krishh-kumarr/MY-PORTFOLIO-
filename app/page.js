import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Recognition from '@/components/Recognition';
import Contact from '@/components/Contact';
import StoryGate from '@/components/story/StoryGate';
import Footer from '@/components/Footer';
import Peek from '@/components/Peek';
import HashScroll from '@/components/HashScroll';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Recognition />
        <Contact />
        <StoryGate />
      </main>
      <Footer />
      <Peek watch="top" hideOver="[data-story]" />
      <HashScroll />
    </>
  );
}

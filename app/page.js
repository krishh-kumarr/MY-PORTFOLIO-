import Nav from '@/components/Nav';
import Intro from '@/components/Intro';
import Story from '@/components/story/Story';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Recognition from '@/components/Recognition';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Peek from '@/components/Peek';
import HashScroll from '@/components/HashScroll';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Intro />
        <div id="story"><Story /></div>
        <Experience />
        <Projects />
        <Skills />
        <Recognition />
        <Contact />
      </main>
      <Footer />
      <Peek watch="top" hideOver="[data-chapter]" />
      <HashScroll />
    </>
  );
}

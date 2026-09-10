import Hero from '../components/Hero';
import About from '../components/About';
import Journey from '../components/Journey';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

/**
 * One page, five sections. Each component renders its own <section id>, which
 * is what the header links and the scroll-spy hook target.
 */
const HomePage = () => (
  <>
    <Hero />
    <About />
    {/* No id of its own: it belongs to "About", and the scroll-spy keeps
        that nav link lit while you read it. */}
    <Journey />
    <Projects />
    <Skills />
    <Contact />
  </>
);

export default HomePage;

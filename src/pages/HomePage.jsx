import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

const HomePage = () => {
    return (
        <div>
            <section className='bg1' id="home">
                <Hero />
            </section>
            <section className='bg1' id="about">
                <About />
            </section>
            <section className='bg1' id="projects">
                <Projects />
            </section>
            <section className='bg1' id="skills">
                <Skills />
            </section>
            <section className='bg1' id="contact">
                <Contact />
            </section>
        </div>
    );
};

export default HomePage;

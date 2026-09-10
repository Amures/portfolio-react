import { useEffect, useState } from 'react';
import imgAbout9 from '../assets/imgs-me/img-aboutMe9.jpg';
import imgAbout5 from '../assets/imgs-me/img-aboutMe5.jpg';
import cvPdf from '../assets/CV/Antonio-Mures-Software-Engineer-2026.pdf';
import { BOOKING_URL } from '../utils/booking';
import { useReveal } from '../hooks/useReveal';
import '../assets/styles/About.css';

const ABOUT_IMAGES = [imgAbout9, imgAbout5];
const ROTATION_MS = 6000;

const About = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const revealRef = useReveal();

  useEffect(() => {
    if (isPaused || ABOUT_IMAGES.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setInterval(() => {
      setImageIndex((index) => (index + 1) % ABOUT_IMAGES.length);
    }, ROTATION_MS);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section id="about" className="section about" ref={revealRef}>
      <div className="container about__inner">
        <div
          className="about__photo reveal"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {ABOUT_IMAGES.map((image, index) => (
            <img
              key={image}
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
              className={index === imageIndex ? 'is-current' : ''}
            />
          ))}
        </div>

        <div className="about__copy reveal">
          <p className="section-eyebrow">About me</p>
          <h2 className="section-title">Ideas, shipped.</h2>

          <p>
            I build web and mobile applications with an emphasis on clarity, performance and
            maintainability. Most of my work is end to end: I am as comfortable shaping the data
            model and the API as I am polishing the screen a user actually touches.
          </p>
          <p>
            Lately that has meant three products in production: a marketplace for pickup football,
            a voice-driven venue discovery platform, and a teleconsultation tool where a leak of
            clinical records is the worst thing that could happen, so the whole design is
            subordinated to preventing it.
          </p>

          <div className="about__actions">
            <a
              href={cvPdf}
              download="Antonio-Mures-Software-Engineer-2026.pdf"
              className="btn btn--primary"
            >
              Download CV
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

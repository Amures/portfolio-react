import heroIllustration from '../assets/imgs-hero/nbg-work.svg';
import { BOOKING_URL } from '../utils/booking';
import '../assets/styles/Hero.css';

const STACK = ['React', 'React Native', 'Next.js', 'Node · TypeScript', 'Python', 'PostgreSQL'];

const Hero = () => {
  return (
    <section id="home" className="section hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="section-eyebrow">Software developer · Uruguay</p>

          <h1 className="hero__title">
            Hi, I&apos;m Antonio Mures.
            <span className="hero__title-accent">I build products people actually use.</span>
          </h1>

          <p className="hero__lead">
            From the first sketch to the deployed app: web front ends, mobile apps, APIs and the
            infrastructure underneath. Three of my projects are live right now — a football
            marketplace, a venue discovery platform and a teleconsultation tool for therapists.
          </p>

          <div className="hero__actions">
            <a href="#work" className="btn btn--primary">
              See my work
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              Book a meeting
            </a>
          </div>

          <div className="hero__stack">
            <p className="hero__stack-label">Mostly working with</p>
            <ul className="hero__stack-list">
              {STACK.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero__art">
          <img
            src={heroIllustration}
            alt=""
            width="450"
            height="459"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

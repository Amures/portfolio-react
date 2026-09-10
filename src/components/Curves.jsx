import wave1 from '../assets/border-img/1.png';
import wave2 from '../assets/border-img/2.png';
import wave3 from '../assets/border-img/3.png';
import '../assets/styles/Curves.css';

/**
 * Decorative wave band that closes the page, just above the footer.
 *
 * It sits in the normal flow on purpose: as a fixed overlay the content
 * scrolled over it, which read as a glitch rather than as decoration.
 * The PNGs are used as alpha masks so the waves take the site palette
 * instead of their original off-white.
 */
export const Curves = () => (
  <div className="waves" aria-hidden="true">
    <div className="waves__layer waves__layer--1" style={{ '--wave': `url(${wave1})` }} />
    <div className="waves__layer waves__layer--2" style={{ '--wave': `url(${wave2})` }} />
    <div className="waves__layer waves__layer--3" style={{ '--wave': `url(${wave3})` }} />
  </div>
);

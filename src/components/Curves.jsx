import { useEffect, useRef, useState } from 'react';
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
 *
 * The drift animation only runs while the band is on screen. A masked
 * element cannot be composited, so every animated frame costs a style
 * recalculation on the main thread; leaving it running made the whole page
 * feel sluggish to scroll while the waves themselves were nowhere in sight.
 */
export const Curves = () => {
  const ref = useRef(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsOnScreen(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsOnScreen(entry.isIntersecting),
      { rootMargin: '200px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`waves ${isOnScreen ? 'is-active' : ''}`} aria-hidden="true">
      <div className="waves__layer waves__layer--1" style={{ '--wave': `url(${wave1})` }} />
      <div className="waves__layer waves__layer--2" style={{ '--wave': `url(${wave2})` }} />
      <div className="waves__layer waves__layer--3" style={{ '--wave': `url(${wave3})` }} />
    </div>
  );
};

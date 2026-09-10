import { useEffect, useState } from 'react';

/**
 * True once the page is scrolled past `threshold` pixels.
 *
 * Scroll events fire faster than the screen refreshes, so the read is
 * coalesced into one requestAnimationFrame per frame and the state only
 * changes when the flag actually flips.
 */
export function useScrollFlag(threshold) {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setIsPast(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return isPast;
}

import { useEffect, useRef } from 'react';

/**
 * Adds `is-visible` to every `.reveal` inside the returned ref once it scrolls
 * into view. Falls back to showing everything when IntersectionObserver is
 * unavailable or the visitor asked for reduced motion.
 */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = root.querySelectorAll('.reveal');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}

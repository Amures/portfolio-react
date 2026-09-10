import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently in the middle of the viewport.
 *
 * Uses IntersectionObserver rather than a scroll listener on purpose: reading
 * getBoundingClientRect() on every scroll event forced a style recalculation
 * per frame (the wave animation keeps styles dirty), which showed up as
 * sluggish scrolling. The observer costs nothing between crossings.
 */
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length || typeof IntersectionObserver === 'undefined') return;

    const visible = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });

        // Several sections can straddle the band; the first in document
        // order is the one the reader is actually on.
        const current = ids.find((id) => visible.has(id));
        if (current) setActiveId(current);
      },
      // A thin band across the middle of the viewport.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

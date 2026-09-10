import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently occupying the top of the viewport.
 * Used to highlight the matching link in the header.
 */
export function useScrollSpy(ids, offset = 120) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const onScroll = () => {
      let current = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }

      // Anything at the very bottom of the page counts as the last section.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      setActiveId(atBottom ? ids[ids.length - 1] : current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offset]);

  return activeId;
}

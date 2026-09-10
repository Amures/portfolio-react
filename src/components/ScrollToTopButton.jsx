import { useScrollFlag } from '../hooks/useScrollFlag';
import '../assets/styles/ScrollToTopButton.css';

const ScrollToTopButton = () => {
  const isVisible = useScrollFlag(400);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`to-top ${isVisible ? 'is-visible' : ''}`}
      aria-label="Back to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;

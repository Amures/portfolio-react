import { useEffect, useRef } from 'react';
import { ProjectThumb } from './ProjectThumb';
import '../assets/styles/Projects.css';

const GITHUB_USER = 'Amures';
/** Public repos — same list as https://github.com/Amures?tab=repositories */
const projects = [
  {
    slug: 'cv-analyzer-ai-portfolio',
    title: 'CV Analyzer AI',
    description: 'AI-powered CV analysis against job descriptions using Google Gemini.',
    liveUrl: 'https://cv-analyzer-ai-portfolio.vercel.app/',
  },
  {
    slug: 'TranscribeAI',
    title: 'TranscribeAI',
    description:
      'AI-powered audio/video transcription and translation using Whisper & MyMemory.',
    liveUrl: 'https://transcribe-ai-eight.vercel.app/',
  },
  {
    slug: 'React-MERN-backend',
    title: 'MERN backend',
    description: 'Backend for the MERN + React stack.',
  },
  {
    slug: 'react-MERN-frontend',
    title: 'MERN frontend',
    description: 'Calendar app — React frontend.',
  },
  {
    slug: 'journal-app',
    title: 'Journal app',
    description: 'Personal journal web app.',
  },
  {
    slug: 'custom-hooks',
    title: 'Custom hooks',
    description: 'Reusable React hooks collection.',
  },
  {
    slug: 'portfolio-react',
    title: 'Portfolio',
    description: 'This portfolio (React + Vite).',
  },
  {
    slug: 'react-gife-expert',
    title: 'GifExpert',
    description: 'GIF search demo app.',
  },
].map((p) => ({
  ...p,
  url: `https://github.com/${GITHUB_USER}/${p.slug}`,
}));

const Projects = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let intervalId;
    const isMobile = window.innerWidth <= 600;

    const startAutoPlay = () => {
      if (isMobile) {
        intervalId = setInterval(() => {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
          
          // If we reached the end, go back to the start
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Scroll by one card width (approx 85% of clientWidth + gap)
            scrollContainer.scrollBy({ left: clientWidth * 0.85 + 20, behavior: 'smooth' });
          }
        }, 4000);
      }
    };

    startAutoPlay();

    const stopAutoPlay = () => clearInterval(intervalId);

    scrollContainer.addEventListener('mouseenter', stopAutoPlay);
    scrollContainer.addEventListener('mouseleave', startAutoPlay);
    scrollContainer.addEventListener('touchstart', stopAutoPlay);
    scrollContainer.addEventListener('touchend', startAutoPlay);

    return () => {
      stopAutoPlay();
      scrollContainer.removeEventListener('mouseenter', stopAutoPlay);
      scrollContainer.removeEventListener('mouseleave', startAutoPlay);
      scrollContainer.removeEventListener('touchstart', stopAutoPlay);
      scrollContainer.removeEventListener('touchend', startAutoPlay);
    };
  }, []);

  return (
    <section className="projects-section">
      <h2>PROJECTS</h2>
      <p className="projects-intro">
        Public repositories from my{' '}
        <a
          href={`https://github.com/${GITHUB_USER}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="projects-intro-link"
        >
          GitHub profile
        </a>
        .
      </p>
      <div className="projects-grid" ref={scrollRef}>
        {projects.map((project) => (
          <article key={project.slug} className="project-card">
            <ProjectThumb slug={project.slug} />
            <h3>{project.title}</h3>
            <p className="project-card-desc">{project.description}</p>
            <div className="project-card-links">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-link"
                >
                  Live Demo
                </a>
              )}
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;

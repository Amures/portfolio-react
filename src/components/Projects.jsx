import { ProjectThumb } from './ProjectThumb';
import '../assets/styles/Projects.css';

const GITHUB_USER = 'Amures';
/** Public repos — same list as https://github.com/Amures?tab=repositories */
const projects = [
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
      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.slug} className="project-card">
            <ProjectThumb slug={project.slug} />
            <h3>{project.title}</h3>
            <p className="project-card-desc">{project.description}</p>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              Open on GitHub
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;

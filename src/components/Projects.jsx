import { ProjectThumb } from './ProjectThumb';
import { featuredProjects, repoProjects, githubProfileUrl, repoUrl } from '../data/projects';
import { useReveal } from '../hooks/useReveal';
import '../assets/styles/Projects.css';

const ExternalIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
    <path
      d="M6 3h7v7M13 3L4.5 11.5M11 9.5V13H3V5h3.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Projects = () => {
  const revealRef = useReveal();

  return (
    <section id="work" className="section section--center projects" ref={revealRef}>
      <div className="container">
        <div className="section-head reveal">
          <p className="section-eyebrow">Selected work</p>
          <h2 className="section-title">Products in production</h2>
          <p className="section-lead">
            Real applications with real users, not demos. Each one is live, so open it and have a
            look.
          </p>
        </div>

        <ul className="projects__grid">
          {featuredProjects.map((project) => (
            <li
              key={project.id}
              className="project-card reveal"
              style={{ '--card-accent': project.accent }}
            >
              <div className="project-card__cover">
                <ProjectThumb id={project.id} />
              </div>

              <div className="project-card__body">
                <p className="project-card__role">{project.role}</p>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__tagline">{project.tagline}</p>
                <p className="project-card__desc">{project.description}</p>

                <ul className="project-card__tech">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>

              <div className="project-card__links">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary project-card__cta"
                >
                  Visit site
                  <ExternalIcon />
                </a>
                {project.repo && (
                  <a
                    href={repoUrl(project.repo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost project-card__cta"
                  >
                    Code
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="repos reveal">
          <div className="repos__head">
            <h3 className="repos__title">Also on GitHub</h3>
            <a
              href={githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="repos__all"
            >
              All repositories
              <ExternalIcon />
            </a>
          </div>

          <ul className="repos__list">
            {repoProjects.map((repo) => (
              <li key={repo.slug}>
                <a href={repoUrl(repo.slug)} target="_blank" rel="noopener noreferrer">
                  <span className="repos__name">{repo.title}</span>
                  <span className="repos__desc">{repo.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Projects;

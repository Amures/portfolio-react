import React from 'react';
import ProjectCard from '../components/ProjectCard';
import '../assets/styles/Projects.css';

const Projects = () => {
  const projectList = [
    {
      title: 'Proyecto 1',
      description: 'Descripción del proyecto 1.',
      link: 'https://github.com/tu-usuario/proyecto1'
    },
    {
      title: 'Proyecto 2',
      description: 'Descripción del proyecto 2.',
      link: 'https://github.com/tu-usuario/proyecto2'
    }
    // Agrega más proyectos aquí
  ];

  return (
    <section>
      <h2>Proyectos</h2>
      <div className="projects">
        {projectList.map((project, index) => (
          <ProjectCard 
            key={index} 
            title={project.title} 
            description={project.description} 
            link={project.link} 
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;

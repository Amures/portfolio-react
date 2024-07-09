import Slider from 'react-slick';
import '../assets/styles/Projects.css';

const projects = [
  { name: 'example1', url: 'example1.com', logo: './src/assets/logos/example1.png' },
  { name: 'example2', url: 'example2.com', logo: './src/assets/logos/example2.png' },
  { name: 'example3', url: 'example3.com', logo: './src/assets/logos/example3.png' },
  { name: 'example4', url: 'example4.com', logo: './src/assets/logos/example4.png' },
  // Agrega más proyectos según sea necesario
];

const Projects = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className='projects-section'>
        <h2>PROJECTS</h2>
        <p>Selected work I've taken on in the past.</p>
        <div className='slider-container'>
          <Slider {...settings}>
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <img src={project.logo} alt={`${project.name} logo`} className="project-logo" />
                <h3>{project.name}</h3>
                <a href={`https://${project.url}`} target="_blank" rel="noopener noreferrer">{project.url}</a>
              </div>
            ))}
          </Slider>
        </div>
    </section>
  );
};

export default Projects;

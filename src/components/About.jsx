import React, { useState, useEffect } from 'react';
import '../assets/styles/About.css';

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = [
    'src/assets/imgs-me/img-aboutMe9.png',
    'src/assets/imgs-me/img-aboutMe5.png',
    'src/assets/imgs-me/img-aboutMe4.png'
  ];

  useEffect(() => {
    let imageTimer;
    if (!isHovered) {
      imageTimer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    }

    return () => clearInterval(imageTimer);
  }, [isHovered, images.length]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <article className='wrapContent bg1'>
      <div className='subWrapAM'>
        <div className='img-aboutMe' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className={`image ${index === currentImageIndex ? 'fade-in' : 'fade-out'}`}
            />
          ))}
        </div>

        <div className='content-aboutMe'>
          <h2>ABOUT ME</h2>
          <p>Soy un desarrollador de software con pasión por crear aplicaciones web modernas, eficientes pero sobre todo GANAR GUITA WACHOOOOOOOOOOOO. VOS DECIME QUE YO LO HAGO REALIDAD</p>
          <div className='btnContainer'>
            <a href="src/assets/CV/CV%20Antonio%20Mures.pdf" download="CV_Antonio_Mures.pdf">
              <button className='btnAboutMe'>RESUME</button>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default About;

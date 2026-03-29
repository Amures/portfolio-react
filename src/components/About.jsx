import { useState, useEffect } from 'react';
import imgAbout9 from '../assets/imgs-me/img-aboutMe9.png';
import imgAbout5 from '../assets/imgs-me/img-aboutMe5.png';

import cvPdf from '../assets/CV/CV Antonio Mures.pdf';
import '../assets/styles/About.css';

const ABOUT_IMAGES = [imgAbout9, imgAbout5];

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let imageTimer;
    if (!isHovered) {
      imageTimer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % ABOUT_IMAGES.length);
      }, 5000);
    }

    return () => clearInterval(imageTimer);
  }, [isHovered]);

  return (
    <article className="wrapContent bg1">
      <div className="subWrapAM">
        <div
          className="img-aboutMe"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {ABOUT_IMAGES.map((image, index) => (
            <img
              key={image}
              src={image}
              alt=""
              className={`image ${index === currentImageIndex ? 'fade-in' : 'fade-out'}`}
            />
          ))}
        </div>

        <div className="content-aboutMe">
          <h2>ABOUT ME</h2>
          <p>
            I build web applications with an emphasis on clarity, performance, and maintainability.
            I enjoy working with others to take ideas from early concept through to something
            people can actually use and rely on in production.
          </p>
          <div className="btnContainer">
            <a href={cvPdf} download="CV_Antonio_Mures.pdf">
              <button type="button" className="btnAboutMe">RESUME</button>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default About;

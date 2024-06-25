import React from 'react';
import '../assets/styles/About.css';

const About = () => {
  return (
    <article className='wrapContent bg1'>
      <div className='subWrapAM'>

        <div className='img-aboutMe'>
          <img src="src/assets/img-aboutMe.png" alt="" />
        </div>

        <div className='content-aboutMe'>
          <h2>ABOUT ME</h2>
          <p><p>Soy un desarrollador de software con pasión por crear aplicaciones web modernas y eficientes. Tengo experiencia en tecnologías como React, Vite, y más.</p></p>
          <div className='btnContainer'>
              <button className='btnAboutMe'>HIRE ME</button>
              <button className='btnAboutMe'>RESUME</button>
          </div>
        </div>

      </div>
    </article>
  );
};

export default About;



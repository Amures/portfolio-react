import React from 'react';
import '../assets/styles/Hero.css';

const Hero = () => {
  return (
    <section className="wrapContent bg1">
      <div className="heroContent">
        <div className="infoHero">
          <p className='imContent'>I'm a</p>
          <h1>
            SOFTWARE<br />
            <span className="developer">DEVELOPER <span className="heroPoint"></span></span>
          </h1>
          <button className="btnHero">PREVIOUS PROJECTS</button>
        </div>
        <div className="imgHero">
          <img src="src/assets/am-nb.png" alt="" />
        </div>
      </div>
    </section>
  );
}

export default Hero;

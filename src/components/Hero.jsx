import '../assets/styles/Hero.css';


const handleScheduleMeeting = () => {
  const calendlyUrl = "https://calendly.com/am-softwaresolutions4/30min";
  window.open(calendlyUrl, '_blank');
};

const Hero = () => {
  return (
    <section className="wrapContent bg1">
      <div className="heroContent">
        <div className="infoHero">
          <h2 className="ideaContent">
            <span className="highlight">Hi, I'm </span> Antonio Mures.
          </h2>
          <h1>
            SOFTWARE
            <span className="developer">DEVELOPER <span className="heroPoint"></span></span>
          </h1>
          <h2 className="ideaContent">We can make your ideas come true</h2>
          <button onClick={handleScheduleMeeting} className="btnHero">Book a meeting</button>
        </div>
        <div className="imgHero">
          <img src="src/assets/imgs-hero/nbg-work.svg" alt="" />
        </div>
      </div>
    </section>
  );
}

export default Hero;

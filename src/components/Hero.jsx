import heroIllustration from '../assets/imgs-hero/nbg-work.svg';
import { BOOKING_URL } from '../utils/booking';
import '../assets/styles/Hero.css';

const Hero = () => {
  return (
    <section className="wrapContent bg1">
      <div className="heroContent">
        <div className="infoHero">
          <h2 className="ideaContent">
            <span className="highlight">Hi, I&apos;m </span> Antonio Mures.
          </h2>
          <h1>
            SOFTWARE
            <span className="developer">DEVELOPER</span>
          </h1>
          <h2 className="ideaContent">We can make your ideas come true</h2>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btnHero"
          >
            Book a meeting
          </a>
        </div>
        <div className="imgHero">
          <img src={heroIllustration} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

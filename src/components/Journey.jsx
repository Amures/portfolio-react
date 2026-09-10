import { useReveal } from '../hooks/useReveal';
import '../assets/styles/Journey.css';

/**
 * The route so far. Deliberately no years: the stops and how long each one
 * lasted are what Antonio actually said, and inventing dates around them
 * would be worse than leaving them out.
 */
const STOPS = [
  {
    place: 'Interior of Uruguay',
    aside: 'Where I started',
    text: 'I grew up in the interior, a long way from anything that looked like a tech industry.',
  },
  {
    place: 'Montevideo',
    aside: 'Starting out',
    text: 'Moved to the capital to study and to get the first real experience under my belt.',
  },
  {
    place: 'Ireland',
    aside: 'Almost two years',
    text: 'Worked across several different fields and industries, and got my English to where I wanted it.',
  },
  {
    place: 'Poland',
    aside: 'Six months',
    text: 'A shorter stop before heading back.',
  },
  {
    place: 'Uruguay, again',
    aside: 'Home for a while',
    text: 'Back in my own country for a stretch, and building.',
  },
  {
    place: 'Wherever is next',
    aside: 'Still open',
    text: 'Getting ready to head out again.',
    isNext: true,
  },
];

const Journey = () => {
  const revealRef = useReveal();

  return (
    <section className="section journey" ref={revealRef}>
      <div className="container">
        <div className="section-head reveal">
          <p className="section-eyebrow">The route so far</p>
          <h2 className="section-title">A bit about me</h2>
          <p className="section-lead">
            I am Uruguayan, and I have taken a fairly long way round to get here.
          </p>
        </div>

        <ol className="journey__list">
          {STOPS.map((stop) => (
            <li
              key={stop.place}
              className={`journey__stop reveal ${stop.isNext ? 'journey__stop--next' : ''}`}
            >
              <span className="journey__marker" aria-hidden="true" />
              <p className="journey__aside">{stop.aside}</p>
              <h3 className="journey__place">{stop.place}</h3>
              <p className="journey__text">{stop.text}</p>
            </li>
          ))}
        </ol>

        <div className="journey__closing reveal">
          <p>
            What all of that has in common is freedom. I am ambitious, I like being thrown at a
            problem I have not solved before, and working out how to solve it is genuinely the part
            I enjoy most.
          </p>
          <p>
            So I am always learning, and not only in the professional sense. Every one of those
            moves taught me something that had nothing to do with code.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Journey;

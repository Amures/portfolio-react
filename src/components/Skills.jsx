import { useEffect, useRef } from 'react';
import iconCSharp from '../assets/icons/c-sharp.png';
import iconCpp from '../assets/icons/c-.png';
import iconCss from '../assets/icons/css.png';
import iconReact from '../assets/icons/react.png';
import iconHtml from '../assets/icons/html-5.png';
import iconJava from '../assets/icons/java.png';
import iconJs from '../assets/icons/js.png';
import iconSql from '../assets/icons/sql.png';
import iconPython from '../assets/icons/python.png';
import iconGit from '../assets/icons/git.png';
import iconUiPath from '../assets/icons/uipath.png';
import iconVb from '../assets/icons/visualBasic.png';
import '../assets/styles/Skills.css';

const skills = [
  { name: 'C#', icon: iconCSharp },
  { name: 'C++', icon: iconCpp },
  { name: 'CSS3', icon: iconCss },
  { name: 'React.JS', icon: iconReact },
  { name: 'HTML', icon: iconHtml },
  { name: 'Java', icon: iconJava },
  { name: 'JavaScript', icon: iconJs },
  { name: 'SQL', icon: iconSql },
  { name: 'Python', icon: iconPython },
  { name: 'Git', icon: iconGit },
  { name: 'UiPath', icon: iconUiPath },
  { name: 'VB', icon: iconVb },
];

const Skills = () => {
  const scrollRef = useRef(null);
  
  // Create a doubled array for infinite scrolling
  const infiniteSkills = [...skills, ...skills];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let intervalId;
    const isMobile = window.innerWidth <= 600;

    const startAutoPlay = () => {
      if (isMobile) {
        intervalId = setInterval(() => {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
          const halfWidth = scrollWidth / 2;
          
          // If we've scrolled past the first set, jump back instantly to the start of the second set
          if (scrollLeft >= halfWidth) {
            scrollContainer.scrollLeft = 0;
            // Then do the smooth scroll to the next item
            scrollContainer.scrollBy({ left: 160, behavior: 'smooth' });
          } else {
            scrollContainer.scrollBy({ left: 160, behavior: 'smooth' });
          }
        }, 3000);
      }
    };

    startAutoPlay();

    const stopAutoPlay = () => clearInterval(intervalId);

    scrollContainer.addEventListener('mouseenter', stopAutoPlay);
    scrollContainer.addEventListener('mouseleave', startAutoPlay);
    scrollContainer.addEventListener('touchstart', stopAutoPlay);
    scrollContainer.addEventListener('touchend', startAutoPlay);

    return () => {
      stopAutoPlay();
      scrollContainer.removeEventListener('mouseenter', stopAutoPlay);
      scrollContainer.removeEventListener('mouseleave', startAutoPlay);
      scrollContainer.removeEventListener('touchstart', stopAutoPlay);
      scrollContainer.removeEventListener('touchend', startAutoPlay);
    };
  }, []);

  return (
    <article className="wrapContent bg1">
      <div className="subWrapAM">
        <div>
          <h2>SKILLS</h2>
          <br />
          <div className="skills-grid" ref={scrollRef}>
            {(window.innerWidth <= 600 ? infiniteSkills : skills).map((skill, index) => (
              <div key={`${skill.name}-${index}`} className="skill-card">
                <img src={skill.icon} alt={`${skill.name} icon`} className="skill-icon" />
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Skills;

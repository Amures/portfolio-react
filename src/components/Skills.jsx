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
import { useReveal } from '../hooks/useReveal';
import '../assets/styles/Skills.css';

const GROUPS = [
  {
    title: 'Front end',
    items: [
      { name: 'React', icon: iconReact },
      { name: 'JavaScript', icon: iconJs },
      { name: 'HTML5', icon: iconHtml },
      { name: 'CSS3', icon: iconCss },
    ],
  },
  {
    title: 'Back end & data',
    items: [
      { name: 'Python', icon: iconPython },
      { name: 'SQL', icon: iconSql },
      { name: 'Java', icon: iconJava },
      { name: 'C#', icon: iconCSharp },
    ],
  },
  {
    title: 'Tooling & other',
    items: [
      { name: 'Git', icon: iconGit },
      { name: 'C++', icon: iconCpp },
      { name: 'UiPath', icon: iconUiPath },
      { name: 'Visual Basic', icon: iconVb },
    ],
  },
];

const Skills = () => {
  const revealRef = useReveal();

  return (
    <section id="skills" className="section section--center skills" ref={revealRef}>
      <div className="container">
        <div className="section-head reveal">
          <p className="section-eyebrow">Skills</p>
          <h2 className="section-title">The toolbox</h2>
          <p className="section-lead">
            The languages and tools I reach for most. The list is ordered by how often I actually
            use them, not by how good the logo looks.
          </p>
        </div>

        <div className="skills__groups">
          {GROUPS.map((group) => (
            <div key={group.title} className="skill-group reveal">
              <h3 className="skill-group__title">{group.title}</h3>
              <ul className="skill-group__list">
                {group.items.map((skill) => (
                  <li key={skill.name} className="skill-card">
                    <img
                      src={skill.icon}
                      alt=""
                      width="48"
                      height="48"
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

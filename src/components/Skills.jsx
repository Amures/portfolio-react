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
  return (
    <article className="wrapContent bg1">
      <div className="subWrapAM">
        <div>
          <h2>SKILLS</h2>
          <br />
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.name} className="skill-card">
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

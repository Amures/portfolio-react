import '../assets/styles/Skills.css';

const skills = [
  { name: 'C#', icon: './src/assets/icons/c-sharp.png' },
  { name: 'C++', icon: './src/assets/icons/c-.png' },
  { name: 'CSS3', icon: './src/assets/icons/css.png' },
  { name: 'React.JS', icon: './src/assets/icons/react.png' },
  { name: 'HTML', icon: './src/assets/icons/html-5.png' },
  { name: 'Java', icon: './src/assets/icons/java.png' },
  { name: 'JavaScript', icon: './src/assets/icons/js.png' },
  { name: 'SQL', icon: './src/assets/icons/sql.png' },
  { name: 'Python', icon: './src/assets/icons/python.png' },
  { name: 'Dart', icon: './src/assets/icons/Dart-logo.png' },
  { name: 'Git', icon: './src/assets/icons/git.png' },
  { name: 'Pascal', icon: './src/assets/icons/pascal.png' },
  { name: 'Flutter', icon: './src/assets/icons/flutter.png' },
  { name: 'UiPath', icon: './src/assets/icons/uipath.png' },
  { name: 'VB', icon: './src/assets/icons/visualBasic.png' }
];

const Skills = () => {
  return (
    <article className='wrapContent bg1'>
      <div className='subWrapAM'>
          <div>
            <h2>SKILLS</h2>
            <br />
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-card">
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

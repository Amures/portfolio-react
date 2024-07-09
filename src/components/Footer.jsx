import '../assets/styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer bg1 ">
      <div className='footersubWrapAM'>
        <ul>
          <li>
            <a href="https://www.linkedin.com/company/am-software-solut1ons" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/Amures" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/amsoftware_solutions" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} /> Instagram
            </a>
          </li>
          <li>
            <a href="mailto:am.softwaresolutions4@gmail.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </a>
          </li>
        </ul>
        <p>&copy; 2024 Antonio. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

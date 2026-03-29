import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo1 from '../assets/logo1.png';
import '../assets/styles/NavHeader.css';

const NavHeader = () => {
  return (
    <header className="wrapContent bg1">
      <nav className="nav-header">
        <div className="imgHeader">
          <Link to="/">
            <img src={logo1} alt="AM Software logo" />
          </Link>
        </div>
        <ul>
          <li>
            <HashLink to="#home" smooth className="btnHeader">
              Home
            </HashLink>
          </li>
          <li>
            <HashLink to="#about" smooth className="btnHeader">
              About
            </HashLink>
          </li>
          <li>
            <HashLink to="#projects" smooth className="btnHeader">
              Projects
            </HashLink>
          </li>
          <li>
            <HashLink to="#skills" smooth className="btnHeader">
              Skills
            </HashLink>
          </li>
          <li>
            <HashLink to="#contact" smooth className="btnHeader">
              Contact
            </HashLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavHeader;

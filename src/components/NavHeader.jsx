import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import '../assets/styles/NavHeader.css';  

const NavHeader = () => {
    return (
        <header className="wrapContent bg1">
            <nav className="nav-header">
                <div className='imgHeader'>
                    <a href='/'>
                        <img src="src/assets/logo1.png" alt="Logo" />
                    </a>
                </div>
                <ul>
                    <li>
                        <Link to="#home" smooth className="btnHeader">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="#about" smooth className="btnHeader">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="#projects" smooth className="btnHeader">
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link to="#skills" smooth className="btnHeader">
                            Skills
                        </Link>
                    </li>
                    <li>
                        <Link to="#contact" smooth className="btnHeader">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavHeader;

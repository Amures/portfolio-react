import { useEffect, useState } from 'react';
import logo from '../assets/logo1.png';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useScrollFlag } from '../hooks/useScrollFlag';
import '../assets/styles/NavHeader.css';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = LINKS.map((link) => link.id);

const NavHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useScrollFlag(12);
  const activeId = useScrollSpy(SECTION_IDS);

  // Lock the page behind the open drawer and allow Escape to close it.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header__inner container">
        <a href="#home" className="site-header__logo" aria-label="Antonio Mures, home">
          <img src={logo} alt="" width="120" height="34" />
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className={`nav-toggle__bars ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="primary-navigation"
          className={`site-nav ${isOpen ? 'is-open' : ''}`}
          aria-label="Primary"
        >
          <ul>
            {LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`site-nav__link ${activeId === id ? 'is-active' : ''}`}
                  aria-current={activeId === id ? 'true' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <button
        type="button"
        className={`nav-backdrop ${isOpen ? 'is-open' : ''}`}
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />
    </header>
  );
};

export default NavHeader;

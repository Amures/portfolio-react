import { LinkedInIcon, GitHubIcon, InstagramIcon, MailIcon } from './SocialIcons';
import '../assets/styles/Footer.css';

const LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/am-software-solut1ons',
    Icon: LinkedInIcon,
    external: true,
  },
  { label: 'GitHub', href: 'https://github.com/Amures', Icon: GitHubIcon, external: true },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/amsoftware_solutions',
    Icon: InstagramIcon,
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:am.softwaresolutions4@gmail.com',
    Icon: MailIcon,
    external: false,
  },
];

const Footer = () => (
  <footer className="site-footer">
    <div className="container site-footer__inner">
      <ul className="site-footer__links">
        {LINKS.map(({ label, href, Icon, external }) => (
          <li key={label}>
            <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              <Icon />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="site-footer__note">
        © {new Date().getFullYear()} Antonio Mures — built with React and Vite.
      </p>
    </div>
  </footer>
);

export default Footer;

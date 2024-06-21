import '../assets/styles/NavHeader.css';

const NavHeader = () => {
  return (
    <header className='wrapContent bg1'>
      <nav className='nav-header'>
        <div><h1>A.M</h1></div>
        <ul>
          <li><button className='btnHeader'>Home</button></li>
          <li><button className='btnHeader'>About</button></li>
          <li><button className='btnHeader'>Skills</button></li>
          <li><button className='btnHeader'>Projects</button></li>
          <li><button className='btnHeader'>CV</button></li>
          <li><button className='btnHeader'>Contact</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default NavHeader;

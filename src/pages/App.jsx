import NavHeader from '../components/NavHeader';
import HomePage from './HomePage';
import { Ocean } from '../components/Ocean';
import { Curves } from '../components/Curves';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Footer from '../components/Footer';

const App = () => (
  <>
    <a className="skip-link" href="#main">
      Skip to content
    </a>
    <Ocean />
    <NavHeader />
    <main id="main">
      <HomePage />
    </main>
    <Curves />
    <Footer />
    <ScrollToTopButton />
  </>
);

export default App;

import NavHeader from '../components/NavHeader';
import HomePage from './HomePage';
import { Curves } from '../components/Curves';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Footer from '../components/Footer';

const App = () => (
  <>
    <a className="skip-link" href="#main">
      Skip to content
    </a>
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

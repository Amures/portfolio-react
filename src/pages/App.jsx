import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavHeader from '../components/NavHeader';
import HomePage from './HomePage';
import { Curves } from '../components/Curves';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Footer from '../components/Footer';

const App = () => {
  return (
    <Router>
      <Curves />
      <NavHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </Router>
  );
};

export default App;

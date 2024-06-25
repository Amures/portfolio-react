import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './components/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import CV from './pages/CV';
import Contact from './pages/Contact';
import NavHeader from './components/NavHeader';
import Hero from './components/Hero';

const App = () => {
  return (
    <Router>
      <NavHeader />

      
      <Hero/>

      <About/>
      
      <Footer />
    </Router>
  );
};

export default App;

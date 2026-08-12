import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Docs from './pages/Docs';
import Downloads from './pages/Downloads';
import About from './pages/About';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
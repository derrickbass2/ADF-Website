// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage || module.default || module })));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage').then(module => ({ default: module.ServicesPage || module.default || module })));
const CaseStudiesPage = React.lazy(() => import('./pages/CaseStudiesPage').then(module => ({ default: module.CaseStudiesPage || module.default || module })));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

const App: React.FC = () => {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
};

export default App;
// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InteractiveNodeNavigation from './components/InteractiveNodeNavigation';
import { navigationNodeData } from './models/NodeTypes';
import ResearchTimeline from './components/ResearchTimeline';

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const CaseStudiesPage = React.lazy(() => import('./pages/CaseStudiesPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const SparkEnginePage = React.lazy(() => import('./pages/SparkEnginePage'));
const NeuroTechNetworkPage = React.lazy(() => import('./pages/NeuroTechNetworkPage'));
const AutonomousAgentGenomePage = React.lazy(() => import('./pages/AutonomousAgentGenomePage'));
const ResearchPage = React.lazy(() => import('./pages/ResearchPage')); // Updated import
const AboutUsPage = React.lazy(() => import('./pages/AboutUsPage'));

const App: React.FC = () => {
  return (
    <div className="app-container">
      <InteractiveNodeNavigation data={navigationNodeData} />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/spark-engine" element={<SparkEnginePage />} />
          <Route path="/neurotech" element={<NeuroTechNetworkPage />} />
          <Route path="/autonomous-agent-genome" element={<AutonomousAgentGenomePage />} />
          <Route path="/research/projects" element={<ResearchPage />} /> // Updated route
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>
      </React.Suspense>
    </div>
  );
};

export default App;
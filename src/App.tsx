// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { navigationNodeData, NodeData } from './models/NodeTypes';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import ContactPage from './pages/ContactPage';
import './styles/global.scss';

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const SparkEnginePage = React.lazy(() => import('./pages/SparkEnginePage'));
const NeuroTechNetworkPage = React.lazy(() => import('./pages/NeuroTechNetworkPage'));
const AutonomousAgentGenomePage = React.lazy(() => import('./pages/AutonomousAgentGenomePage'));
const ResearchPage = React.lazy(() => import('./pages/ResearchPage'));
// Uncomment if you add routes that use these components
// const AboutUsPage = React.lazy(() => import('./pages/AboutUsPage'));
// const CaseStudiesPage = React.lazy(() => import('./pages/CaseStudiesPage'));

// Define a type for route data transformation
interface RouteData {
  label?: string;
  link?: string;
  title?: string;
  description?: string;
  icon?: string;
  id?: string;
  name?: string;
  route?: string;
  children?: RouteData[];
}
const App: React.FC = () => {
  // Define selectedNode for the 404 page - using 'any' to avoid type errors
  const selectedNode: { name: string } | null = null;
  
  // Helper function to transform navigation node data for route props
  const transformRouteData = (node: NodeData): RouteData => ({
    label: node.name || '',
    link: node.id || '',
    title: node.name || '',
    description: node.description ?? '',
    icon: node.icon ?? '',
    id: node.id,
    name: node.name,
    route: node.route,
    children: node.children?.map(transformRouteData)
  });

  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    data={navigationNodeData[0].children}
                  />
                }
              />
              <Route
                path="/services"
                element={
                  <ServicesPage
                    data={navigationNodeData[0].children?.find(
                      (node: NodeData) => node.id === 'services'
                    )?.children as any}
                  />
                }
              />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/spark-engine" element={<SparkEnginePage />} />
              <Route path="/neurotech" element={<NeuroTechNetworkPage />} />
              <Route path="/autonomous-agent-genome" element={<AutonomousAgentGenomePage />} />
              <Route path="/research/projects" element={<ResearchPage />} />
              {/* 404 Route */}
              <Route
                path="*"
                element={
                  <div role="alert" aria-label="Page Not Found">
                    <h1>404 - Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                    <p>Selected Node: {selectedNode !== null ? (selectedNode as { name: string }).name : 'None'}</p>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
export default App;
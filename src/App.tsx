import React, { Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import InteractiveNodeNavigation from './components/InteractiveNodeNavigation';
import { navigationNodeData, NodeData } from './models/NodeTypes';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary/index.tsx';
import ContactPage from './pages/ContactPage';

// Define common page props interface
interface PageProps {
  data?: NodeData[];
  selectedNode?: NodeData | null;
}

// Define props for HomePage
interface HomePageProps {
  data?: NodeData[];
}

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const CaseStudiesPage = React.lazy(() => import('./pages/CaseStudiesPage'));
const SparkEnginePage = React.lazy(() => import('./pages/SparkEnginePage'));
const NeuroTechNetworkPage = React.lazy(() => import('./pages/NeuroTechNetworkPage'));
const AutonomousAgentGenomePage = React.lazy(() => import('./pages/AutonomousAgentGenomePage'));
const ResearchPage = React.lazy(() => import('./pages/ResearchPage'));
const AboutUsPage = React.lazy(() => import('./pages/AboutUsPage'));

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

interface ServicesPageProps {
  data?: NodeData[];
}

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  // Helper function to transform navigation node data for route props
  const transformRouteData = (node: NodeData): RouteData => ({
    label: node.name || '',
    link: node.id || '',
    title: node.name || '',
    description: node.description || '',
    icon: node.icon || '',
    id: node.id,
    name: node.name,
    route: node.route,
    children: node.children?.map(transformRouteData)
  });

  // Handler for node selection
  const handleNodeSelect = (node: NodeData) => {
    setSelectedNode(node);
  };

  return (
    <div className="app-container" role="application">
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <InteractiveNodeNavigation
          data={navigationNodeData}
          onNodeSelect={handleNodeSelect}
        />
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
                  data={navigationNodeData[0].children?.find((node: NodeData) => node.id === 'services')?.children as any}
                />
              }
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/spark-engine" element={<SparkEnginePage />} />
            <Route path="/neurotech" element={<NeuroTechNetworkPage />} />
            <Route path="/autonomous-agent-genome" element={<AutonomousAgentGenomePage />} />
            <Route path="/research/projects" element={<ResearchPage />} />
            <Route path="/about" element={<AboutUsPage />} />

            {/* 404 Route */}
            <Route
              path="*"
              element={
                <div role="alert" aria-label="Page Not Found">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you are looking for does not exist.</p>
                  <p>Selected Node: {selectedNode?.name || 'None'}</p>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;
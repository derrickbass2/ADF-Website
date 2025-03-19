// src/pages/HomePage/index.tsx
import React from 'react';
import { motion } from 'framer-motion';
import InteractiveNodeNavigation from '@components/InteractiveNodeNavigation';
import { navigationNodeData } from '@models/NodeTypes';
import NodeHomepage from '@components/NodeHomepage';
import { initialNodeData } from '@components/NodeHomepage/NodeTypes';
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  return (
    <motion.div 
      className={styles.homeContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <InteractiveNodeNavigation data={navigationNodeData} />
      
      <div className={styles.heroSection}>
        <h1>Adaptive Data Fusion</h1>
        <h2>Bridging AI Innovation and Human Potential</h2>
        <p>
          Transforming organizational capabilities through ethical, human-centered 
          artificial intelligence solutions
        </p>
      </div>
      
      <section className={styles.platformOverview}>
        <h3>Introducing Neurotech: The Future of Cognitive Computing</h3>
        <div className={styles.platformFeatures}>
          <div className={styles.feature}>
            <h4>Neural Network Innovation</h4>
            <p>
              Leveraging advanced neural network architectures to unlock 
              unprecedented AI capabilities across industries.
            </p>
          </div>
          <div className={styles.feature}>
            <h4>Ethical AI Integration</h4>
            <p>
              Ensuring transparent, fair, and accountable AI systems that 
              enhance human potential rather than replace it.
            </p>
          </div>
          <div className={styles.feature}>
            <h4>Adaptive Learning</h4>
            <p>
              Continuous evolution of AI models through neuroevolution 
              and genetic algorithms for optimal performance.
            </p>
          </div>
        </div>
      </section>

      <NodeHomepage data={initialNodeData} />
      
      <section className={styles.valueProposition}>
        <h2>Transforming Data into Actionable Intelligence</h2>
        <div className={styles.valueGrid}>
          <div className={styles.valueItem}>
            <h3>AI-Driven Insights</h3>
            <p>Leverage cutting-edge AI to uncover hidden patterns and opportunities.</p>
          </div>
          <div className={styles.valueItem}>
            <h3>Ethical Implementation</h3>
            <p>Ensure responsible and transparent AI solutions that align with your values.</p>
          </div>
          <div className={styles.valueItem}>
            <h3>Strategic Transformation</h3>
            <p>Reimagine your business processes with intelligent data fusion.</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
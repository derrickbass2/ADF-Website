// src/pages/AutonomousAgentGenomePage/index.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './AutonomousAgentGenomePage.module.scss';

const AutonomousAgentGenomePage: React.FC = () => {
  const coreCapabilities = [
    {
      id: 'alg-diversity',
      title: 'Algorithmic Diversity',
      description: 'Comprehensive suite of machine learning algorithms spanning traditional and deep learning approaches.',
      icons: ['brain', 'chart-line', 'network']
    },
    {
      id: 'transfer-learning',
      title: 'Transfer Learning',
      description: 'Advanced knowledge transfer techniques to accelerate model development and adaptation.',
      icons: ['exchange', 'sync', 'share']
    },
    {
      id: 'continuous-learning',
      title: 'Continuous Learning',
      description: 'Dynamic model updating and incremental learning capabilities.',
      icons: ['infinity', 'refresh', 'expand']
    }
  ];

  const algorithmCategories = [
    {
      id: 'traditional-ml',
      title: 'Traditional Machine Learning',
      algorithms: [
        {id: 'linear-regression', name: 'Linear Regression'},
        {id: 'decision-trees', name: 'Decision Trees'},
        {id: 'random-forests', name: 'Random Forests'},
        {id: 'svm', name: 'Support Vector Machines'},
        {id: 'naive-bayes', name: 'Naive Bayes'},
        {id: 'clustering', name: 'Clustering Algorithms'}
      ]
    },
    {
      id: 'deep-learning',
      title: 'Deep Learning Approaches',
      algorithms: [
        {id: 'cnn', name: 'Convolutional Neural Networks'},
        {id: 'rnn', name: 'Recurrent Neural Networks'},
        {id: 'transformers', name: 'Transformers'},
      ]
    }
  ];

  const interpretabilityFeatures = [
    {
      id: 'feature-importance',
      name: 'Feature Importance',
      description: 'Identify key factors influencing model predictions',
      technique: 'SHAP Values, Permutation Importance'
    },
    {
      id: 'local-explanations',
      name: 'Local Explanations',
      description: 'Understand individual prediction reasoning',
      technique: 'LIME (Local Interpretable Model-agnostic Explanations)'
    },
    {
      id: 'visual-interpretation',
      name: 'Visual Interpretation',
      description: 'Visualize model decision processes',
      technique: 'Partial Dependence Plots, Saliency Maps'
    }
  ];

  return (
    <motion.div 
      className={styles.autonomousAgentGenomeContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className={styles.heroSection}>
        <h1>Autonomous Agent (AA) Genome</h1>
        <div className={styles.capabilitiesContainer}>
          {coreCapabilities.map((capability) => (
            <div key={capability.id} className={styles.capabilityCard}>
              <div className={styles.capabilityIcons}>
                {capability.icons.map((icon: string) => (
                  <i key={`${capability.id}-${icon}`} className={`fas fa-${icon}`}></i>
                ))}
              </div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.algorithmsContainer}>
          {algorithmCategories.map((category) => (
            <div key={category.id} className={styles.algorithmCategory}>
              <h3>{category.title}</h3>
              <ul>
                {category.algorithms.map((algo) => (
                  <li key={algo.id}>{algo.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.interpretabilityContainer}>
          {interpretabilityFeatures.map((feature) => (
            <div key={feature.id} className={styles.interpretabilityCard}>
              <h3>{feature.name}</h3>
              <p>{feature.description}</p>
              <div className={styles.techniqueBadge}>
                {feature.technique}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.callToActionSection}>
        <h2>Transform Your AI Strategy</h2>
        <p>
          Unlock the potential of intelligent, adaptive autonomous agents 
          that learn, evolve, and drive business innovation.
        </p>
        <button className={styles.ctaButton}>Explore AA Genome</button>
      </section>
    </motion.div>
  );
};

export default AutonomousAgentGenomePage;
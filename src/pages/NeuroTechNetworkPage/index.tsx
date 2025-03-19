// src/pages/NeuroTechNetworkPage/index.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './NeuroTechNetworkPage.module.scss';

const NeuroTechNetworkPage: React.FC = () => {
  const coreCapabilities = [
    {
      title: 'Neural Network Architectures',
      description: 'Comprehensive support for advanced neural network models including CNNs, RNNs, LSTMs, and Transformers.',
      details: [
        'Feedforward networks',
        'Convolutional Neural Networks (CNNs)',
        'Recurrent Neural Networks (RNNs)',
        'Long Short-Term Memory (LSTM) Networks'
      ]
    },
    {
      title: 'Deep Learning Framework Integration',
      description: 'Seamless integration with leading deep learning frameworks like TensorFlow, PyTorch, and Keras.',
      details: [
        'Extensive pre-trained model libraries',
        'Advanced model training capabilities',
        'Cross-framework compatibility'
      ]
    },
    {
      title: 'Transfer Learning',
      description: 'Advanced transfer learning techniques to optimize model performance with limited labeled data.',
      details: [
        'Pre-trained model utilization',
        'Fine-tuning for specific domains',
        'Efficient knowledge transfer'
      ]
    }
  ];

  const technicalFeatures = [
    {
      title: 'Neuroevolution',
      description: 'Automated generation and optimization of neural network architectures using genetic algorithms.',
      key: 'Enables automatic model design and hyperparameter optimization'
    },
    {
      title: 'Reinforcement Learning',
      description: 'Advanced agents capable of learning through environmental interaction and feedback.',
      key: 'Supports complex sequential decision-making problems'
    },
    {
      title: 'Explainability',
      description: 'Advanced techniques for interpreting and understanding AI decision-making processes.',
      key: 'Provides transparency through attention mechanisms and saliency maps'
    }
  ];

  const performanceOptimizations = [
    {
      title: 'Hardware Acceleration',
      description: 'Optimized support for GPU and TPU computing',
      benefits: [
        'Accelerated neural network computations',
        'Efficient processing of large datasets',
        'Reduced training and inference times'
      ]
    },
    {
      title: 'Model Compression',
      description: 'Advanced techniques to reduce model size and improve efficiency',
      benefits: [
        'Reduced memory footprint',
        'Faster deployment',
        'Optimized performance on resource-constrained environments'
      ]
    }
  ];

  return (
    <motion.div 
      className={styles.neurotechNetworkContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className={styles.heroSection}>
        <h1>NeuroTech Network: Advancing Cognitive Computing</h1>
        <p>
          The third module of the Autonomous Design Foundry (ADF), 
          revolutionizing artificial intelligence through advanced neural networks 
          and brain-inspired computing.
        </p>
      </section>

      <section className={styles.coreCapabilitiesSection}>
        <h2>Core Capabilities</h2>
        <div className={styles.capabilitiesGrid}>
          {coreCapabilities.map((capability, index) => (
            <div key={index} className={styles.capabilityCard}>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <ul>
                {capability.details.map((detail, detailIndex) => (
                  <li key={detailIndex}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.technicalFeaturesSection}>
        <h2>Advanced Technical Features</h2>
        <div className={styles.featuresGrid}>
          {technicalFeatures.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className={styles.featureKey}>
                <strong>Key Benefit:</strong> {feature.key}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.performanceOptimizationSection}>
        <h2>Performance Optimizations</h2>
        <div className={styles.optimizationGrid}>
          {performanceOptimizations.map((optimization, index) => (
            <div key={index} className={styles.optimizationCard}>
              <h3>{optimization.title}</h3>
              <p>{optimization.description}</p>
              <ul>
                {optimization.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex}>{benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.callToActionSection}>
        <h2>Unlock the Potential of Cognitive Computing</h2>
        <p>
          Join the forefront of AI innovation with NeuroTech Network. 
          Transform your approach to artificial intelligence and 
          cognitive computing.
        </p>
        <button className={styles.ctaButton}>Explore NeuroTech</button>
      </section>
    </motion.div>
  );
};

export default NeuroTechNetworkPage;
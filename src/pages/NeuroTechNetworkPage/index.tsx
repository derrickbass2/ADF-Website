// src/pages/NeuroTechNetworkPage/index.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './NeuroTechNetworkPage.module.scss';

const NeuroTechNetworkPage: React.FC = () => {
  const coreCapabilities = [
    {
      id: 'neural-networks',
      title: 'Neural Network Architectures',
      description: 'Comprehensive support for advanced neural network models including CNNs, RNNs, LSTMs, and Transformers.',
      details: [
        { id: 'feedforward', text: 'Feedforward networks' },
        { id: 'cnn', text: 'Convolutional Neural Networks (CNNs)' },
        { id: 'rnn', text: 'Recurrent Neural Networks (RNNs)' },
        { id: 'lstm', text: 'Long Short-Term Memory (LSTM) Networks' }
      ]
    },
    {
      id: 'framework-integration',
      title: 'Deep Learning Framework Integration',
      description: 'Seamless integration with leading deep learning frameworks like TensorFlow, PyTorch, and Keras.',
      details: [
        { id: 'pretrained', text: 'Extensive pre-trained model libraries' },
        { id: 'training', text: 'Advanced model training capabilities' },
        { id: 'compatibility', text: 'Cross-framework compatibility' }
      ]
    },
    {
      id: 'transfer-learning',
      title: 'Transfer Learning',
      description: 'Advanced transfer learning techniques to optimize model performance with limited labeled data.',
      details: [
        { id: 'pretrained-models', text: 'Pre-trained model utilization' },
        { id: 'fine-tuning', text: 'Fine-tuning for specific domains' },
        { id: 'knowledge-transfer', text: 'Efficient knowledge transfer' }
      ]
    }
  ];

  const technicalFeatures = [
    {
      id: 'neuroevolution',
      title: 'Neuroevolution',
      description: 'Automated generation and optimization of neural network architectures using genetic algorithms.',
      key: 'Enables automatic model design and hyperparameter optimization'
    },
    {
      id: 'reinforcement-learning',
      title: 'Reinforcement Learning',
      description: 'Advanced agents capable of learning through environmental interaction and feedback.',
      key: 'Supports complex sequential decision-making problems'
    },
    {
      id: 'explainability',
      title: 'Explainability',
      description: 'Advanced techniques for interpreting and understanding AI decision-making processes.',
      key: 'Provides transparency through attention mechanisms and saliency maps'
    }
  ];

  const performanceOptimizations = [
    {
      id: 'hardware-acceleration',
      title: 'Hardware Acceleration',
      description: 'Optimized support for GPU and TPU computing',
      benefits: [
        { id: 'accel-compute', text: 'Accelerated neural network computations' },
        { id: 'data-processing', text: 'Efficient processing of large datasets' },
        { id: 'reduced-times', text: 'Reduced training and inference times' }
      ]
    },
    {
      id: 'model-compression',
      title: 'Model Compression',
      description: 'Advanced techniques to reduce model size and improve efficiency',
      benefits: [
        { id: 'memory-footprint', text: 'Reduced memory footprint' },
        { id: 'faster-deployment', text: 'Faster deployment' },
        { id: 'resource-constraint', text: 'Optimized performance on resource-constrained environments' }
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
          The third module of the Autonomous Design Foundry (ADF)
        </p>
        
        <div className={styles.capabilitiesSection}>
          {coreCapabilities.map((capability) => (
            <div key={capability.id} className={styles.capabilityCard}>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <ul>
                {capability.details.map((detail) => (
                  <li key={detail.id}>{detail.text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className={styles.featuresSection}>
          {technicalFeatures.map((feature) => (
            <div key={feature.id} className={styles.featureCard}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className={styles.featureKey}>
                <strong>Key Benefit:</strong> {feature.key}
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.optimizationsSection}>
          {performanceOptimizations.map((optimization) => (
            <div key={optimization.id} className={styles.optimizationCard}>
              <h3>{optimization.title}</h3>
              <p>{optimization.description}</p>
              <ul>
                {optimization.benefits.map((benefit) => (
                  <li key={benefit.id}>{benefit.text}</li>
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
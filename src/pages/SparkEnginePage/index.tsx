// src/pages/SparkEnginePage/index.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './SparkEnginePage.module.scss';

const SparkEnginePage: React.FC = () => {
  const keyCapabilities = [
    {
      title: 'Distributed Data Processing',
      description: 'Lightning-fast parallel processing of massive datasets using advanced distributed computing techniques.',
      icon: 'network'
    },
    {
      title: 'Customizable Data Pipelines',
      description: 'Flexible, configurable operations for data ingestion, transformation, querying, and advanced analytics.',
      icon: 'cogs'
    },
    {
      title: 'Machine Learning Integration',
      description: 'Built-in support for advanced machine learning algorithms and analytics functionalities.',
      icon: 'brain'
    },
    {
      title: 'Modular Extensibility',
      description: 'Seamless integration of custom algorithms, models, and extensions to suit unique business requirements.',
      icon: 'puzzle-piece'
    }
  ];

  const personas = [
    {
      name: 'Sarah',
      role: 'Small Business Owner',
      goal: 'Optimize inventory management and sales forecasting',
      challenges: [
        'Limited resources',
        'Lack of technical data analysis expertise'
      ],
      journey: [
        'Imports sales and inventory data',
        'Configures custom data processing pipeline',
        'Applies filtering and aggregation operations',
        'Runs pipeline to obtain refined dataset'
      ]
    },
    {
      name: 'David',
      role: 'Marketing Manager',
      goal: 'Enhance campaign performance and audience segmentation',
      challenges: [
        'Limited advanced analytics tools',
        'Need for precise targeting'
      ],
      journey: [
        'Leverages modular architecture',
        'Develops custom campaign optimization algorithm',
        'Integrates algorithm into Spark module',
        'Tests and evaluates algorithm performance'
      ]
    },
    {
      name: 'Lisa',
      role: 'HR Manager',
      goal: 'Streamline recruitment and talent management',
      challenges: [
        'Manual candidate screening',
        'Time-consuming talent evaluation'
      ],
      journey: [
        'Configures machine learning algorithms',
        'Adjusts performance and memory allocation',
        'Modifies evaluation metrics',
        'Deploys customized talent recommendation model'
      ]
    }
  ];

  const performanceMetrics = [
    {
      category: 'Data Ingestion',
      metrics: [
        'Throughput: Records per second',
        'Horizontal scalability',
        'Real-time data processing'
      ]
    },
    {
      category: 'Data Transformation',
      metrics: [
        'Processing speed (milliseconds)',
        'Resource utilization efficiency',
        'Complex transformation capabilities'
      ]
    },
    {
      category: 'Machine Learning',
      metrics: [
        'Model training time',
        'Inference speed',
        'Prediction accuracy'
      ]
    }
  ];

  return (
    <motion.div 
      className={styles.sparkEngineContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className={styles.heroSection}>
        <h1>Spark Engine: Revolutionary Data Processing</h1>
        <p>
          Unlocking the power of distributed data processing and analytics 
          to transform how businesses extract insights and drive decisions.
        </p>
      </section>

      <section className={styles.keyCapabilitiesSection}>
        <h2>Core Capabilities</h2>
        <div className={styles.capabilitiesGrid}>
          {keyCapabilities.map((capability) => (
            <div key={capability.title} className={styles.capabilityCard}>
              <div className={styles.capabilityIcon}>
                <i className={`fas fa-${capability.icon}`}></i>
              </div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.personasSection}>
        <h2>Real-World Use Cases</h2>
        <div className={styles.personasGrid}>
          {personas.map((persona) => (
            <div key={persona.name} className={styles.personaCard}>
              <h3>{persona.name} - {persona.role}</h3>
              <div className={styles.personaDetails}>
                <h4>Goal</h4>
                <p>{persona.goal}</p>
                
                <h4>Challenges</h4>
                <ul>
                  {persona.challenges.map((challenge) => (
                    <li key={challenge}>{challenge}</li>
                  ))}
                </ul>
                
                <h4>Journey</h4>
                <ol>
                  {persona.journey.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.performanceSection}>
        <h2>Performance Metrics</h2>
        <div className={styles.performanceGrid}>
          {performanceMetrics.map((category) => (
            <div key={category.category} className={styles.performanceCategory}>
              <h3>{category.category}</h3>
              <ul>
                {category.metrics.map((metric) => (
                  <li key={metric}>{metric}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.callToActionSection}>
        <h2>Transform Your Data Strategy</h2>
        <p>
          Join the data revolution. Leverage Spark Engine to unlock 
          unprecedented insights and drive intelligent decision-making.
        </p>
        <button className={styles.ctaButton}>Get Started</button>
      </section>
    </motion.div>
  );
};

export default SparkEnginePage;
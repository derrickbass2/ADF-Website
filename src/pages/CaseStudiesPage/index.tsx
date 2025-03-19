// src/pages/CaseStudiesPage/index.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './CaseStudiesPage.module.scss';

interface CaseStudy {
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: string[];
}

const caseStudies: CaseStudy[] = [
  {
    client: 'Sweetgreen',
    industry: 'Food Service',
    challenge: 'Optimize supply chain and customer demand prediction',
    solution: 'Implemented machine learning models for inventory and demand forecasting',
    impact: [
      '25% reduction in food waste',
      '18% improvement in supply chain efficiency',
      'Enhanced customer satisfaction through more accurate inventory management'
    ]
  },
  {
    client: 'Compass Group',
    industry: 'Hospitality',
    challenge: 'Improve operational efficiency across multiple facilities',
    solution: 'Developed AI-driven operational analytics platform',
    impact: [
      '30% reduction in operational costs',
      'Real-time performance monitoring',
      'Predictive maintenance scheduling'
    ]
  }
];

const CaseStudiesPage: React.FC = () => {
  return (
    <motion.div 
      className={styles.caseStudiesContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Case Studies</h1>
      {caseStudies.map((study, index) => (
        <div key={index} className={styles.caseStudyCard}>
          <h2>{study.client}</h2>
          <h3>{study.industry}</h3>
          <div className={styles.caseStudyDetails}>
            <h4>Challenge</h4>
            <p>{study.challenge}</p>
            <h4>Solution</h4>
            <p>{study.solution}</p>
            <h4>Impact</h4>
            <ul>
              {study.impact.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

eport default CaseStudiesPage;
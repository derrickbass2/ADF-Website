// src/components/LoadingSpinner/index.tsx
import React from 'react';
import styles from './LoadingSpinner.module.scss';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
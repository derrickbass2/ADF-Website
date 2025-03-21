// Example component template
import React from 'react';
import { motion } from 'framer-motion';
import styles from './ComponentName.module.scss';

interface ComponentNameProps {
  // Define prop types here
}

const ComponentName: React.FC<ComponentNameProps> = () => {
  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Component content */}
    </motion.div>
  );
};

export default ComponentName;
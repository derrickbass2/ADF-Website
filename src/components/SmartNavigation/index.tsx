// src/components/SmartNavigation/index.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { NodeData } from '../../models/NodeTypes';
import styles from './SmartNavigation.module.scss';

interface SmartNavigationProps {
  nodes: NodeData[];
}

const SmartNavigation: React.FC<SmartNavigationProps> = ({ nodes }) => {
  const [activeNode, setActiveNode] = useState<NodeData | null>(null);
  const [contextualSuggestions, setContextualSuggestions] = useState<NodeData[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // AI-Powered Contextual Navigation
  useEffect(() => {
    const currentPath = location.pathname;
    const currentNode = findNodeByRoute(currentPath, nodes);
    
    if (currentNode) {
      setActiveNode(currentNode);
      
      // Generate contextual suggestions based on current node
      const suggestions = generateContextualSuggestions(currentNode, nodes);
      setContextualSuggestions(suggestions);
    }
  }, [location, nodes]);

  const generateContextualSuggestions = (
    currentNode: NodeData, 
    allNodes: NodeData[]
  ): NodeData[] => {
    // Advanced suggestion algorithm
    return allNodes.filter(node => 
      node.category === currentNode.category || 
      node.tags?.some(tag => 
        currentNode.tags?.includes(tag)
      )
    ).slice(0, 3);
  };

  return (
    <motion.nav 
      className={styles.smartNavigation}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.currentContext}>
        {activeNode && (
          <motion.div 
            className={styles.activeNodeInfo}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h3>{activeNode.name}</h3>
            <p>{activeNode.description}</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {contextualSuggestions.length > 0 && (
          <motion.div 
            className={styles.contextualSuggestions}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <h4>Recommended Exploration</h4>
            {contextualSuggestions.map(suggestion => (
              <motion.button
                key={suggestion.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(suggestion.route)}
                className={styles.suggestionButton}
              >
                <span>{suggestion.name}</span>
                <small>{suggestion.description}</small>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default SmartNavigation;
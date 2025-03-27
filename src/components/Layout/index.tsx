// src/components/Layout/index.tsx
import React, { ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    console.log('Layout component mounted');
    console.log('Children present:', !!children);
  }, [children]);

  return (
    <div className={styles.layoutContainer} role="application">
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/" aria-label="Go to home page">
            <img 
              src="/logo.png" 
              alt="ADF Logo"
              onError={(e) => {
                console.error('Logo failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
          </Link>
        </div>
        <nav className={styles.mainNav} aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/research/projects">Research</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      
      <main className={styles.mainContent}>
        {children || (
          <div style={{padding: '20px'}}>
            <p>No content is being rendered. Check your routes and component props.</p>
          </div>
        )}
      </main>
      
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Adaptive Data Fusion. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
// src/models/ResearchModel.ts
export interface ResearchProject {
    id: string;
    title: string;
    domain: 'IO Psychology' | 'Technology Adoption' | 'Leadership' | 'AI Ethics';
    status: 'Dissertation Prospectus' | 'In Progress' | 'Completed';
    abstract: string;
    keyFindings?: string[];
    potentialImpact: string;
    advisors?: string[];
    keywords: string[];
  }
  
  // src/pages/ResearchProjectsPage/index.tsx
  import React, { useState } from 'react';
  import { motion } from 'framer-motion';
  import styles from './ResearchProjectsPage.module.scss';
  
  const researchProjects: ResearchProject[] = [
    {
      id: 'dissertation-prospectus',
      title: 'Leadership Acceptance and Artificial Intelligence Adoption in the Hospitality Industry',
      domain: 'IO Psychology',
      status: 'Dissertation Prospectus',
      abstract: `Investigating the critical relationships between leadership psychological readiness and organizational AI implementation effectiveness in hospitality contexts.`,
      keyFindings: [
        'Identified significant gaps in leadership technological competency',
        'Revealed psychological barriers to AI adoption',
        'Proposed comprehensive leadership development frameworks'
      ],
      potentialImpact: 'Transforming leadership preparation for technological integration in service industries',
      advisors: ['Dr. Dissertation Advisor'],
      keywords: ['AI Adoption', 'Leadership Psychology', 'Hospitality Technology']
    }
  ];
  
  const ResearchProjectsPage: React.FC = () => {
    const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  
    const filteredProjects = selectedDomain 
      ? researchProjects.filter(project => project.domain === selectedDomain)
      : researchProjects;
  
    return (
      <motion.div 
        className={styles.researchProjectsContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section className={styles.heroSection}>
          <h1>Research Projects</h1>
          <p>
            Advancing understanding at the intersection of leadership, 
            technology adoption, and organizational psychology
          </p>
        </section>
  
        <section className={styles.domainFilter}>
          <h2>Filter by Domain</h2>
          <div className={styles.filterButtons}>
            {['IO Psychology', 'Technology Adoption', 'Leadership', 'AI Ethics'].map(domain => (
              <button 
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={selectedDomain === domain ? styles.activeFilter : ''}
              >
                {domain}
              </button>
            ))}
            <button onClick={() => setSelectedDomain(null)}>All Projects</button>
          </div>
        </section>
  
        <section className={styles.projectsGrid}>
          {filteredProjects.map(project => (
            <div key={project.id} className={styles.projectCard}>
              <h3>{project.title}</h3>
              <div className={styles.projectMeta}>
                <span className={styles.domain}>{project.domain}</span>
                <span className={styles.status}>{project.status}</span>
              </div>
              <p>{project.abstract}</p>
              {project.keyFindings && (
                <div className={styles.keyFindings}>
                  <h4>Key Findings</h4>
                  <ul>
                    {project.keyFindings.map((finding, index) => (
                      <li key={index}>{finding}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className={styles.projectFooter}>
                <p><strong>Potential Impact:</strong> {project.potentialImpact}</p>
                {project.keywords && (
                  <div className={styles.keywords}>
                    {project.keywords.map(keyword => (
                      <span key={keyword} className={styles.keyword}>{keyword}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
      </motion.div>
    );
  };
  
  export default ResearchProjectsPage;
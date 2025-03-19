// src/pages/AboutUsPage/index.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './AboutUsPage.module.scss';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 'derrick-bass',
    name: 'Derrick Bass',
    role: 'Founder & Chief AI Strategist',
    bio: 'Pioneering expert in AI-driven organizational transformation with a track record of innovative solutions.',
    image: '/path/to/derrick-bass-image.jpg'
  },
  // Add more team members as needed
];

const AboutUsPage: React.FC = () => {
  return (
    <motion.div 
      className={styles.aboutContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className={styles.missionStatement}>
        <h1>About Adaptive Data Fusion</h1>
        <p>
          We are a cutting-edge AI consultancy dedicated to bridging the gap between 
          technological innovation and human potential. Our mission is to empower 
          organizations to leverage artificial intelligence ethically and strategically.
        </p>
      </section>

      <section className={styles.teamSection}>
        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <div key={member.id} className={styles.teamMemberCard}>
              <img 
                src={member.image} 
                alt={member.name} 
                className={styles.memberImage}
              />
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.valuesSection}>
        <h2>Our Core Values</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueItem}>
            <h3>Ethical AI</h3>
            <p>Committed to responsible and transparent AI development</p>
          </div>
          <div className={styles.valueItem}>
            <h3>Innovation</h3>
            <p>Continuously pushing the boundaries of AI capabilities</p>
          </div>
          <div className={styles.valueItem}>
            <h3>Human-Centric</h3>
            <p>Focusing on AI that enhances human potential</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUsPage;
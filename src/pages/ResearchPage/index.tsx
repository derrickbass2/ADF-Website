// /Users/dbass/Documents/GitHub/ADF-Website/src/pages/ResearchPage/index.tsx
import React from "react";
import { motion } from "framer-motion";
import styles from "./ResearchPage.module.scss";

interface ResearchProject {
  title: string;
  description: string;
  publicationDate: string;
  authors: string[];
  domain: string;
  link?: string;
}

const researchProjects: ResearchProject[] = [
  {
    title: "Human-Centered AI Adoption Strategies",
    description:
      "Comprehensive meta-analysis exploring ethical AI integration and organizational transformation.",
    publicationDate: "March 2023",
    authors: ["Derrick Bass", "Dr. Emily Chen"],
    domain: "Organizational AI Ethics",
    link: "/research/human-centered-ai-adoption",
  },
  {
    title: "Neuroevolution in Autonomous Agent Design",
    description:
      "Advanced research on genetic algorithms and neural network optimization for adaptive learning systems.",
    publicationDate: "November 2022",
    authors: ["Derrick Bass", "Prof. Michael Rodriguez"],
    domain: "Machine Learning Architectures",
    link: "/research/neuroevolution-autonomous-agents",
  },
  {
    title: "Explainable AI: Transparency in Decision-Making",
    description:
      "Developing frameworks for interpreting and understanding AI model decisions using advanced attribution techniques.",
    publicationDate: "July 2022",
    authors: ["Derrick Bass", "Dr. Sarah Thompson"],
    domain: "AI Interpretability",
    link: "/research/explainable-ai-frameworks",
  },
];

const ResearchPage: React.FC = () => {
  return (
    <motion.div
      className={styles.researchContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className={styles.heroSection}>
        <h1>Adaptive Data Fusion Research</h1>
        <p>
          Pioneering research at the intersection of artificial intelligence,
          ethical implementation, and transformative organizational strategies.
        </p>
      </section>

      <section className={styles.publicationsSection}>
        <h2>Cutting-Edge Publications</h2>
        <div className={styles.publicationGrid}>
          {researchProjects.map((project) => (
            <div key={project.title} className={styles.publicationCard}>
              <div className={styles.publicationHeader}>
                <h3>{project.title}</h3>
                <span className={styles.domainTag}>{project.domain}</span>
              </div>
              <p>{project.description}</p>
              <div className={styles.publicationMeta}>
                <div className={styles.metaItem}>
                  <strong>Published:</strong> {project.publicationDate}
                </div>
                <div className={styles.metaItem}>
                  <strong>Authors:</strong> {project.authors.join(", ")}
                </div>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.readMoreLink}
                >
                  Explore Full Research
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.researchApproachSection}>
        <h2>Our Research Methodology</h2>
        <div className={styles.approachGrid}>
          <div className={styles.approachItem}>
            <h3>Interdisciplinary Collaboration</h3>
            <p>
              Uniting experts from AI, ethics, cognitive science, and
              domain-specific fields to drive holistic research and innovation.
            </p>
          </div>
          <div className={styles.approachItem}>
            <h3>Data-Driven Insights</h3>
            <p>
              Leveraging comprehensive data analysis, meta-studies, and advanced
              statistical techniques to derive meaningful research conclusions.
            </p>
          </div>
          <div className={styles.approachItem}>
            <h3>Practical Application</h3>
            <p>
              Focusing on research with direct, actionable implications that
              bridge theoretical advancements and real-world implementation.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ResearchPage;

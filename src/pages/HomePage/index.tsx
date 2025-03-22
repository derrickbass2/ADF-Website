// src/pages/HomePage/index.tsx
import React from "react";
import { motion } from "framer-motion";
import styles from "./HomePage.module.scss";
import InteractiveNodeNavigation from "@components/InteractiveNodeNavigation";
import ResearchTimeline from "@components/ResearchTimeline";
import { NodeData } from "src/models/NodeTypes";

interface HomePageProps {
  data?: NodeData[];
}
export interface NavigationNode {
  id: string;
  name: string;
  route: string;
  icon?: string;
  children?: NavigationNode[];
}

interface HomePageProps {}

const navigationNodeData: NavigationNode[] = [
  { id: "1", name: "Home", route: "/" },
  { id: "2", name: "Services", route: "/services" },
  { id: "3", name: "Contact", route: "/contact" },
  { id: "4", name: "Research", route: "/research" },
  { id: "5", name: "Case Studies", route: "/case-studies" },
  { id: "6", name: "About Us", route: "/about" },
  { id: "7", name: "Spark Engine", route: "/spark-engine" },
  {
    id: "8",
    name: "Autonomous Agent Genome",
    route: "/autonomous-agent-genome",
  },
  { id: "9", name: "NeuroTech Network", route: "/neurotech" },
];

export interface InteractiveNodeNavigationProps {
  data: NavigationNode[];
}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <motion.div
      className={styles.homeContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <InteractiveNodeNavigation data={navigationNodeData} />
      <div className={styles.contentContainer}>
        <section className={styles.heroSection}>
          <p>
            Discover the power of our hybrid modular learning system for data
            analysis and insights generation.
          </p>
        </section>

        <section className={styles.coreModulesSection}>
          <h2>Core Modules of Adaptive Data Fusion</h2>
          <div className={styles.moduleGrid}>
            <div className={styles.moduleCard}>
              <h3>Spark Engine</h3>
              <p>Powerful data processing engine for real-time analytics.</p>
              <a href="/spark-engine" className={styles.moduleLink}>
                Learn More
              </a>
            </div>
            <div className={styles.moduleCard}>
              <h3>Autonomous Agent Genome</h3>
              <p>
                Advanced AI algorithms for adaptive learning and
                decision-making.
              </p>
              <a href="/autonomous-agent-genome" className={styles.moduleLink}>
                Learn More
              </a>
            </div>
            <div className={styles.moduleCard}>
              <h3>NeuroTech Network</h3>
              <p>Neural network architecture for complex data analysis.</p>
              <a href="/neurotech" className={styles.moduleLink}>
                Learn More
              </a>
            </div>
          </div>
        </section>

        <section className={styles.researchSection}>
          <h2>Research Journey</h2>
          <ResearchTimeline />
        </section>

        <section className={styles.additionalSections}>
          <h2>Explore More</h2>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionCard}>
              <h3>About Us</h3>
              <p>Learn more about our mission and team.</p>
              <a href="/about" className={styles.sectionLink}>
                Visit Page
              </a>
            </div>
            <div className={styles.sectionCard}>
              <h3>Case Studies</h3>
              <p>Explore real-world applications of our technology.</p>
              <a href="/case-studies" className={styles.sectionLink}>
                Visit Page
              </a>
            </div>
            <div className={styles.sectionCard}>
              <h3>Services</h3>
              <p>Discover our range of AI and data fusion services.</p>
              <a href="/services" className={styles.sectionLink}>
                Visit Page
              </a>
            </div>
            <div className={styles.sectionCard}>
              <h3>Contact</h3>
              <p>Get in touch with us for inquiries and collaborations.</p>
              <a href="/contact" className={styles.sectionLink}>
                Visit Page
              </a>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default HomePage;

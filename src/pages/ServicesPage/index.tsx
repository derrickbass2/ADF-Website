// src/pages/ServicesPage/index.tsx
import React from "react";
import { motion } from "framer-motion";
import styles from "./ServicesPage.module.scss";

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

interface ServicesPageProps {
  data: ServiceItem[];
}

const services: ServiceItem[] = [
  {
    title: "AI Consulting",
    description:
      "Strategic guidance to integrate AI into your business model, ensuring ethical and effective implementation.",
    icon: "brain",
  },
  {
    title: "Predictive Modeling",
    description:
      "Advanced statistical and machine learning models to forecast trends and optimize decision-making.",
    icon: "chart-line",
  },
  {
    title: "Data Strategy",
    description:
      "Comprehensive data architecture and governance strategies to maximize your data assets.",
    icon: "database",
  },
  {
    title: "Ethical AI Implementation",
    description:
      "Develop AI solutions that are transparent, fair, and aligned with your organizational values.",
    icon: "balance-scale",
  },
];

const ServicesPage: React.FC<ServicesPageProps> = ({ data }) => {
  return (
    <motion.div
      className={styles.servicesContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Our Services</h1>
      {data.map((service) => (
        <div key={service.title} className={styles.serviceItem}>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </div>
      ))}
    </motion.div>
  );
};

// Example usage of ServicesPage component
export const App: React.FC = () => {
  return <ServicesPage data={services} />;
};

export default ServicesPage;

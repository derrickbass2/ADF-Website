// src/pages/ContactPage/index.tsx
import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import styles from "./ContactPage.module.scss";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Implement form submission logic
    console.log("Form submitted", formData);
  };

  return (
    <motion.div
      className={styles.contactContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.contactContent}>
        <h1>Contact Adaptive Data Fusion</h1>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
          />
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactPage;

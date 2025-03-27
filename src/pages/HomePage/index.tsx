// src/pages/HomePage/index.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./HomePage.module.scss";
import InteractiveNodeNavigation from "@components/InteractiveNodeNavigation";
import { NodeData } from "../../models/NodeTypes"; // Import NodeData type

// Define props interface to accept data prop
interface HomePageProps {
  data?: NodeData[]; // Make it optional with ?
}

const navigationNodeData = [
  { id: "1", name: "Home", route: "/" },
  { id: "2", name: "About ADF", route: "/about" },
  { id: "3", name: "Challenges & Solutions", route: "/challenges" },
  { id: "4", name: "Our Process", route: "/process" },
  { id: "5", name: "Case Studies", route: "/case-studies" },
  { id: "6", name: "Get in Touch", route: "/contact" },
];

// Update component signature to use HomePageProps
const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const [questionType, setQuestionType] = useState("general");

  // Use provided data or fall back to default navigation data
  const displayData = data || navigationNodeData;

  const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestionType(e.target.value);
  };

  return (
    <motion.div
      className={styles.homeContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <InteractiveNodeNavigation data={displayData} />
      <div className={styles.contentContainer}>
        <section className={styles.heroSection}>
          <h1 className={styles.headline}>ADF: Transforming Adaptive Intelligence Through Data Fusion</h1>
          <h2 className={styles.subHeadline}>Bridging the Gap between People and AI</h2>
          <div className={styles.ctaButtons}>
            <button className={`${styles.button} ${styles.primaryButton}`}>Get Started</button>
            <button className={`${styles.button} ${styles.secondaryButton}`}>Learn More</button>
          </div>
          <div className={styles.heroAnimation}>
            {/* Placeholder for Lottie animation or AI-generated video */}
            <div className={styles.animationPlaceholder}></div>
          </div>
        </section>

        <section className={styles.aboutSection}>
          <h2 className={styles.sectionHeadline}>What is ADF?</h2>
          <p className={styles.bodyContent}>
            At Adaptive Data Fusion (ADF), we believe AI should work for your people—not the other way around. Our patented technology simplifies AI adoption by focusing on what matters most: empowering your team to thrive in a tech-driven world.
          </p>
          <div className={styles.keyFeatures}>
            <div className={styles.feature}>
              <img src="/path/to/hybrid-icon.png" alt="Hybrid Modular Learning System" />
              <p>Hybrid modular learning system</p>
            </div>
            <div className={styles.feature}>
              <img src="/path/to/insights-icon.png" alt="Real-time Actionable Insights" />
              <p>Real-time actionable insights</p>
            </div>
            <div className={styles.feature}>
              <img src="/path/to/strategies-icon.png" alt="Proven Strategies" />
              <p>Proven strategies rooted in human behavior</p>
            </div>
          </div>
          <button className={`${styles.button} ${styles.primaryButton}`}>About ADF</button>
        </section>

        <section className={styles.challengesSection}>
          <h2 className={styles.sectionHeadline}>Overcoming the Barriers to AI Adoption</h2>
          <p className={styles.bodyContent}>
            Investing in AI technology is only the first step. Without proper integration, organizations face challenges like employee adoption rates lower than expected or expensive and unused AI programs without clear a return on your investment, the path to AI adoption isn't always easy. We've seen Common Challenges in every industry:
          </p>
          <ul className={styles.challengeList}>
            <li>From employees: "I just don't see how this will help day-to-day."</li>
            <li>From management: "I don't see the value of learning how to use AI tools."</li>
            <li>From stakeholders: "We need to see results sooner rather than later."</li>
          </ul>
          <p className={styles.bodyContent}>
            Our solution lies in a tailored approach helps businesses turn these challenges into opportunities for growth. With an emphasis on the human behavior that affects employee adoption and a patented hybrid modular learning system, ADF aligns your AI investment to your organization's unique culture, goals, and strengths.
          </p>
          <button className={`${styles.button} ${styles.primaryButton}`}>See all Solutions</button>
        </section>

        <section className={styles.processSection}>
          <h2 className={styles.sectionHeadline}>The ADF 3-Week AI Transformation</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <h3>Week 1: Discovery & Alignment</h3>
              <p>We start by actively listening to uncover your organization's strengths, challenges, and opportunities. We assess your organization by analyzing organizational performance appraisal systems, employee data, and training materials.</p>
            </div>
            <div className={styles.timelineItem}>
              <h3>Week 2: Strategy in Action</h3>
              <p>Next, we co-create an action-oriented AI adoption roadmap, that prioritizes quick wins to build leadership confidence and excitement.</p>
            </div>
            <div className={styles.timelineItem}>
              <h3>Week 3: Kickstart & Empower</h3>
              <p>Finally, we provide hands-on guidance and leadership coaching workshops that brings your adoption strategy to life, as well as a 30-60-90-day game plan for continued success.</p>
            </div>
          </div>
          <button className={`${styles.button} ${styles.primaryButton}`}>Get Started</button>
        </section>

        <section className={styles.caseStudiesSection}>
          <h2 className={styles.sectionHeadline}>Real Stories. Real Impact.</h2>
          <p className={styles.bodyContent}>
            At ADF, we measure success not just by numbers but by the real experiences of the people we serve. Here's how we've helped organizations like yours achieve their goals.
          </p>
          <div className={styles.highlights}>
            <div className={styles.highlight}>
              <img src="/path/to/engagement-icon.png" alt="Employee Engagement" />
              <p>A 35% increase in employee engagement within one month</p>
            </div>
            <div className={styles.highlight}>
              <img src="/path/to/alignment-icon.png" alt="Team Alignment" />
              <p>Improved alignment across teams, reducing project timelines by 20%</p>
            </div>
            <div className={styles.highlight}>
              <img src="/path/to/leadership-icon.png" alt="Leadership Confidence" />
              <p>Leaders reporting greater confidence in driving innovation</p>
            </div>
          </div>
          <button className={`${styles.button} ${styles.primaryButton}`}>Success Stories</button>
        </section>

        <section className={styles.contactSection}>
          <h2 className={styles.sectionHeadline}>Ready to Transform Your AI Adoption Journey?</h2>
          <p className={styles.bodyContent}>
            Let's create a future where technology and human potential work hand in hand. Contact us to schedule a free 30-min consultation to learn exactly how we can help your organization utilize Adaptive Intelligence today.
          </p>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input type="text" id="name" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input type="email" id="email" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="organization" className={styles.label}>Organization</label>
              <input type="text" id="organization" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="question-type" className={styles.label}>Question Type</label>
              <select id="question-type" className={styles.input} onChange={handleQuestionTypeChange} value={questionType} required>
                <option value="general">General</option>
                <option value="consultation">Schedule Consultation</option>
                <option value="beta-testers">Beta-Testers</option>
              </select>
            </div>
            {questionType === "general" && (
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea id="message" className={styles.input} required></textarea>
              </div>
            )}
            {questionType === "consultation" && (
              <>
                <div className={styles.formGroup}>
                  <label htmlFor="consultation-date" className={styles.label}>Date</label>
                  <input type="date" id="consultation-date" className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="consultation-time-1" className={styles.label}>Time 1</label>
                  <input type="time" id="consultation-time-1" className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="consultation-time-2" className={styles.label}>Time 2 (optional)</label>
                  <input type="time" id="consultation-time-2" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="consultation-time-3" className={styles.label}>Time 3 (optional)</label>
                  <input type="time" id="consultation-time-3" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="industry" className={styles.label}>Industry</label>
                  <select id="industry" className={styles.input} required>
                    <option value="tech">Tech</option>
                    <option value="retail">Retail</option>
                    <option value="education">Education</option>
                    <option value="finance">Finance</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="consultation-message" className={styles.label}>Message</label>
                  <textarea id="consultation-message" className={styles.input}></textarea>
                </div>
              </>
            )}
            {questionType === "beta-testers" && (
              <>
                <p>Interested in becoming a beta tester? <a href="/path/to/beta-tester-application">Apply here</a></p>
                <div className={styles.formGroup}>
                  <label htmlFor="beta-tester-message" className={styles.label}>Message (optional)</label>
                  <textarea id="beta-tester-message" className={styles.input}></textarea>
                </div>
              </>
            )}
            <button type="submit" className={`${styles.button} ${styles.primaryButton}`}>Contact Us</button>
          </form>
        </section>
      </div>
    </motion.div>
  );
};

export default HomePage;
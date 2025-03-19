// src/components/ResearchTimeline/index.tsx
import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import styles from './ResearchTimeline.module.scss';

interface ResearchNode {
  id: string;
  title: string;
  year: number;
  domain: string;
  description: string;
  link: string;
}

const researchNodes: ResearchNode[] = [
  {
    id: 'ai-employee-engagement',
    title: 'AI Driven Employee Engagement Analysis',
    year: 2024,
    domain: 'Organizational Psychology',
    description: 'Comprehensive guide to analyzing employee engagement through AI-driven methodologies',
    link: 'https://docs.google.com/document/d/1vdhu0qjllHbE-i9LPmmlviYqH4chrXuS/edit?usp=drive_link'
  },
  {
    id: 'adf-system-architecture',
    title: 'ADF System Architecture',
    year: 2024,
    domain: 'AI Systems Design',
    description: 'Detailed architectural overview of the Adaptive Data Fusion platform',
    link: 'https://docs.google.com/document/d/1IG2SmYadtgeFLZRsJFc6gEcI8TBYGzm6vbM6BitCazI/edit?usp=sharing'
  },
  {
    id: 'adf-comprehensive-overview',
    title: 'ADF Comprehensive Overview',
    year: 2024,
    domain: 'Technology Innovation',
    description: 'Comprehensive exploration of the Adaptive Data Fusion platform and its capabilities',
    link: 'https://docs.google.com/document/d/1g5fPUX3CbJg0WL_pCyXsyxhp5lg-qW9CFG36PbVGpjo/edit?usp=sharing'
  },
  {
    id: 'ai-impact-on-work',
    title: 'The Impact of AI on Work',
    year: 2023,
    domain: 'Future of Work',
    description: 'In-depth analysis of artificial intelligence\'s transformative effects on workplace dynamics',
    link: 'https://docs.google.com/document/d/1PLE_VkJdWPk_tfZqcXLokduOYOJjO8P5PP0uQJN5tCI/edit?usp=sharing'
  },
  {
    id: 'intrinsic-motivation-ai',
    title: 'Intrinsic Motivation and AI Adoption',
    year: 2023,
    domain: 'Organizational Psychology',
    description: 'Meta-analytic approach exploring intrinsic motivation factors in AI technology adoption',
    link: 'https://drive.google.com/file/d/1-TlmX-TPgNb_3EKLoVZd30itFDjnO7Xr/view?usp=sharing'
  },
  {
    id: 'hybrid-modular-learning',
    title: 'Hybrid Modular Learning System',
    year: 2023,
    domain: 'Machine Learning',
    description: 'Core architectural framework for Adaptive Data Fusion\'s learning system',
    link: 'https://drive.google.com/file/d/1-YOhRd86bPt28BPZ90BHf2IT7L5Wgluj/view?usp=sharing'
  },
  {
    id: 'ai-problems',
    title: 'Problems in AI',
    year: 2022,
    domain: 'AI Ethics',
    description: 'Critical analysis of challenges in artificial intelligence development and implementation',
    link: 'https://drive.google.com/file/d/1-QnC9aEGQyw9pX0x5oOUf3plvjsjbW9V/view?usp=sharing'
  }
];

const ResearchTimeline: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<ResearchNode | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = 500;

    // Clear previous rendering
    svg.selectAll('*').remove();

    // Create simulation
    const simulation = d3.forceSimulation(researchNodes)
      .force('charge', d3.forceCollide(80))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX(width / 2).strength(0.1))
      .force('y', d3.forceY(height / 2).strength(0.1));

    // Create links between nodes based on chronological order
    const links = researchNodes
      .slice(0, -1)
      .map((node, i) => ({ source: node, target: researchNodes[i + 1] }));

    const link = svg.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', styles.link)
      .attr('stroke', '#4F94DB')
      .attr('stroke-opacity', 0.6);

    const node = svg.selectAll('.node')
      .data(researchNodes)
      .enter()
      .append('g')
      .attr('class', styles.node)
      .call(d3.drag<SVGGElement, ResearchNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => {
        setSelectedNode(d);
      });

    node.append('circle')
      .attr('r', 30)
      .attr('fill', '#1E3A8A');

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .text(d => d.year)
      .attr('fill', 'white')
      .attr('font-size', '12px');

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node.attr('transform', d => `translate(${(d as any).x},${(d as any).y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      (event.subject as any).fx = (event.subject as any).x;
      (event.subject as any).fy = (event.subject as any).y;
    }

    function dragged(event: any) {
      (event.subject as any).fx = event.x;
      (event.subject as any).fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      (event.subject as any).fx = null;
      (event.subject as any).fy = null;
    }

  }, []);

  return (
    <motion.div 
      className={styles.researchTimelineContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Research Journey</h2>
      <div className={styles.timelineWrapper}>
        <svg ref={svgRef} width="100%" height="500"></svg>
      </div>

      {selectedNode && (
        <motion.div 
          className={styles.nodeDetails}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3>{selectedNode.title}</h3>
          <p>{selectedNode.description}</p>
          <div className={styles.nodeMeta}>
            <span>Year: {selectedNode.year}</span>
            <span>Domain: {selectedNode.domain}</span>
          </div>
          <a 
            href={selectedNode.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.researchLink}
          >
            View Full Research
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResearchTimeline;
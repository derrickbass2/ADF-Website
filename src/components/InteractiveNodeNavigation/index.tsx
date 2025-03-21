// src/components/InteractiveNodeNavigation/index.tsx
import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { useNavigate } from 'react-router-dom';
import styles from './InteractiveNodeNavigation.module.scss';
import { NodeData, NodeCategory } from '../../models/NodeTypes';

// Extended type to make NodeData compatible with D3's SimulationNodeDatum
type SimulationNodeData = NodeData & d3.SimulationNodeDatum & {
  fx?: number | null;
  fy?: number | null;
};

interface InteractiveNodeNavigationProps {
  data: NodeData[];
  onNodeSelect?: (node: NodeData) => void;
}

const InteractiveNodeNavigation: React.FC<InteractiveNodeNavigationProps> = ({ 
  data, 
  onNodeSelect 
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [layout, setLayout] = useState<'force' | 'radial'>('force');
  const [filter, setFilter] = useState<'all' | NodeCategory>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Advanced Radial Placement with More Sophisticated Positioning
  const createRadialPlacement = (nodes: SimulationNodeData[]) => {
    const width = svgRef.current?.clientWidth || window.innerWidth;
    const height = svgRef.current?.clientHeight || window.innerHeight;
    const center = { x: width / 2, y: height / 2 };
    const radius = Math.min(width, height) / 3;

    // Group nodes by category or artist
    const groupedNodes = d3.group(nodes, d => d.category || d.artist);
    const categories = Array.from(groupedNodes.keys());

    return nodes.map((node, index) => {
      const categoryIndex = categories.findIndex(cat => 
        cat === (node.category || node.artist)
      );
      
      const angle = (categoryIndex / categories.length) * Math.PI * 2;
      return {
        ...node,
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
        fx: layout === 'radial' ? center.x + radius * Math.cos(angle) : null,
        fy: layout === 'radial' ? center.y + radius * Math.sin(angle) : null
      };
    });
  };

  // Memoized filter function for performance
  const filteredNodes = useMemo(() => {
    return data[0]?.children?.filter(node => {
      const matchesCategory = 
        filter === 'all' || 
        node.category === filter;
      
      const matchesSearch = 
        !searchTerm || 
        node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.tags?.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    }) || [];
  }, [data, filter, searchTerm]);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear existing SVG
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Color scale based on node category
    const colorScale = d3.scaleOrdinal<string>()
      .domain(['core', 'service', 'research', 'support'])
      .range(['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD93D']);

    // Create force simulation
    const simulation = d3.forceSimulation(filteredNodes as SimulationNodeData[])
      .force('charge', d3.forceManyBody().strength(-150))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide(30));

    // Create nodes group
    const nodesG = svg.append('g');

    // Create nodes
    const node = nodesG.selectAll('g')
      .data(filteredNodes)
      .enter()
      .append('g')
      .call(d3.drag<SVGGElement, SimulationNodeData>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      )
      .on('click', (event, d) => {
        setSelectedNode(d);
        onNodeSelect?.(d);
        navigate(d.route);
      });

    // Add circles to nodes
    node.append('circle')
      .attr('r', d => Math.sqrt(d.playcount || 50) + 10)
      .attr('fill', d => colorScale(d.category || 'support'))
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    // Add labels to nodes
    node.append('text')
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .text(d => d.name)
      .attr('font-size', '10px')
      .attr('fill', 'black');

    // Simulation tick function
    simulation.on('tick', () => {
      node.attr('transform', (d: SimulationNodeData) => `translate(${d.x || 0},${d.y || 0})`);
    });

    // Drag functions
    function dragstarted(event: any, d: SimulationNodeData) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: SimulationNodeData) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: SimulationNodeData) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Apply radial layout if selected
    if (layout === 'radial') {
      const radialNodes = createRadialPlacement(filteredNodes as SimulationNodeData[]);
      simulation.nodes(radialNodes);
    }

    return () => {
      simulation.stop();
    };
  }, [filteredNodes, layout, onNodeSelect, navigate]);

  return (
    <div className={styles.navigationContainer}>
      <div className={styles.controls}>
        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value as 'force' | 'radial')}
        >
          <option value="force">Force Layout</option>
          <option value="radial">Radial Layout</option>
        </select>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | NodeCategory)}
        >
          <option value="all">All Nodes</option>
          <option value="core">Core Modules</option>
          <option value="service">Services</option>
          <option value="research">Research</option>
          <option value="support">Support</option>
        </select>
        <input
          type="text"
          placeholder="Search nodes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <svg ref={svgRef} width="100%" height="500px"></svg>
      {selectedNode && (
        <div className={styles.nodeDetails}>
          <h3>{selectedNode.name}</h3>
          <p>{selectedNode.description}</p>
          <div className={styles.nodeMetadata}>
            <span>Category: {selectedNode.category}</span>
            <span>Complexity: {selectedNode.complexity}/10</span>
          </div>
          <button onClick={() => navigate(selectedNode.route)}>
            Explore {selectedNode.name}
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveNodeNavigation;
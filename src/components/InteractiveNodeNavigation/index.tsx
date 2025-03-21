import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useNavigate } from 'react-router-dom';
import styles from './InteractiveNodeNavigation.module.scss';
import { NodeData } from '../../models/NodeTypes';

// Extended type to make NodeData compatible with D3's SimulationNodeDatum
type SimulationNodeData = NodeData & d3.SimulationNodeDatum;

interface InteractiveNodeNavigationProps {
  data: NodeData[];
  onNodeSelect: (node: NodeData) => void;
}

const InteractiveNodeNavigation: React.FC<InteractiveNodeNavigationProps> = ({ data, onNodeSelect }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [layout, setLayout] = useState<'force' | 'radial'>('force');
  const [filter, setFilter] = useState<'all' | 'popular' | 'obscure'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Radial Placement Helper
  const RadialPlacement = () => {
    const values = new Map<string, { x: number, y: number }>();
    const center = { x: 0, y: 0 };
    const radius = 300;
    let current = -120;
    const increment = 20;

    const setKeys = (keys: string[]) => {
      values.clear();

      keys.forEach((key, index) => {
        const angle = current + (index * increment);
        const x = center.x + radius * Math.cos(angle * Math.PI / 180);
        const y = center.y + radius * Math.sin(angle * Math.PI / 180);
        values.set(key, { x, y });
      });

      return values;
    };

    return { setKeys };
  };

  useEffect(() => {
    if (!svgRef.current) return;

    // Filter nodes based on current filter
    const filteredNodes = filterNodes(data);

    // Clear existing SVG
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Create force simulation
    const simulation = d3.forceSimulation(filteredNodes as SimulationNodeData[])
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink().distance(50));

    // Create links group
    const nodesG = svg.append('g');

    // Create nodes
    nodesG.selectAll('circle')
      .data(filteredNodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', 'steelblue')
      .on('click', (event, d: any) => {
        setSelectedNode(d);
        onNodeSelect(d);
      });

    // Node color scale

    // Update function
    const update = () => {
      // Position nodes based on layout
      if (layout === 'radial') {
        const artists = Array.from(new Set(filteredNodes
          .map(n => n.artist)
          .filter((artist): artist is string => artist !== undefined)));

        const radialPlacement = RadialPlacement().setKeys(artists);

        filteredNodes.forEach((node: any) => {
          const center = radialPlacement.get(node.artist);
          if (center) {
            node.x = center.x;
            node.y = center.y;
          }
        });
      }

      // Restart simulation
      simulation.nodes(filteredNodes as SimulationNodeData[]);
      simulation.alpha(1).restart();
    };

    // Simulation tick function
    simulation.on('tick', () => {
      nodesG.selectAll('circle')
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);
    });

    update();
  }, [data, layout, filter, searchTerm]);

  // Filter nodes based on current filter
  const filterNodes = (nodes: NodeData[]) => {
    return nodes.filter(node => {
      // Filter logic based on playcount
      const meetsPlaycountFilter =
        filter === 'all' ||
        (filter === 'popular' && (node.playcount || 0) > 50) ||
        (filter === 'obscure' && (node.playcount || 0) <= 50);

      // Search filter
      const meetsSearchFilter =
        !searchTerm ||
        node.name.toLowerCase().includes(searchTerm.toLowerCase());

      return meetsPlaycountFilter && meetsSearchFilter;
    });
  };

  // Calculate node radius based on playcount

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
          onChange={(e) => setFilter(e.target.value as 'all' | 'popular' | 'obscure')}
        >
          <option value="all">All Nodes</option>
          <option value="popular">Popular Nodes</option>
          <option value="obscure">Obscure Nodes</option>
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
          <button onClick={() => navigate(selectedNode.route)}>
            Explore {selectedNode.name}
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveNodeNavigation;
// src/components/InteractiveNodeNavigation/index.tsx
import React, { useRef, useEffect, useState } from 'react';
import { select, hierarchy, tree, linkHorizontal, HierarchyNode, svg } from 'd3';
import { useNavigate } from 'react-router-dom';

// Define NodeData interface directly since the module cannot be found
interface NodeData {
  id: string;
  name: string;
  route?: string;
  icon?: string;
  children?: NodeData[];
}

// Define styles as an object since the module cannot be found
const styles = {
  navigationContainer: 'interactive-node-navigation',
  link: 'interactive-node-link',
  node: 'interactive-node',
  selectedNodeCircle: 'interactive-node-selected',
  nodeCircle: 'interactive-node-circle',
  nodeLabel: 'interactive-node-label',
  nodeIcon: 'interactive-node-icon',
  svg: 'interactive-node-svg'
};

interface InteractiveNodeNavigationProps {
  data: NodeData[];
}

const InteractiveNodeNavigation: React.FC<InteractiveNodeNavigationProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  
  useEffect(() => {
    if (!svgRef.current) {
      return;
    }
    
    // Clear any existing elements
    select(svgRef.current).selectAll('*').remove();
    const height = svgRef.current.clientHeight === 0 || svgRef.current.clientHeight === null ? 600 : svgRef.current.clientHeight;
    const width = svgRef.current.clientWidth;
    
    // Create the SVG element
    const svg = select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(50, ${height / 2})`);
    
    // Create hierarchy from data
    const root = hierarchy(data[0]);
    
    // Create tree layout
    const treeLayout = tree<NodeData>()
      .size([height - 100, width - 200]);
    
    // Apply layout to data
    treeLayout(root);
    
    // Create links
    svg.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', styles.link)
      .attr('d', (d) => {
        const link = linkHorizontal<any, any>()
          .source((node) => [node.source.y || 0, node.source.x || 0])
          .target((node) => [node.target.y || 0, node.target.x || 0]);
        return link(d);
      });

    // Create nodes
    const node = svg.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', styles.node)
      .attr('transform', (d) => `translate(${d.y},${d.x})`)
      .on('click', (_event: React.MouseEvent<SVGGElement, MouseEvent>, d) => {
        if (d.data.route) {
          navigate(d.data.route);
        }
        setSelectedNode(d.data);
      });
    
    // Add circles to nodes
    node.append('circle')
      .attr('r', 10)
      .attr('class', (d) => 
        `${selectedNode?.id === d.data.id 
          ? styles.selectedNodeCircle 
          : styles.nodeCircle}`
      );

    // Node labels
    node.append('text')
      .attr('dy', '0.31em')
      .attr('x', (d) => d.children ? -15 : 15)
      .attr('text-anchor', (d) => d.children ? 'end' : 'start')
      .text((d) => d.data.name)
      .attr('class', styles.nodeLabel);
    
    // Optional: Add icons if available
    node.append('text')
      .attr('class', (d) => `fas ${d.data.icon} ${styles.nodeIcon}`)
      .attr('x', -20)
      .attr('y', 5);
  }, [data, navigate, selectedNode]);

  // Update selected node styling
  useEffect(() => {
    if (!svgRef.current) {
      return;
    }
    
    const svg = select(svgRef.current);
    svg.selectAll<SVGCircleElement, HierarchyNode<NodeData>>('circle')
      .attr('class', (d: HierarchyNode<NodeData>) => 
        `${selectedNode?.id === d.data.id 
          ? styles.selectedNodeCircle 
          : styles.nodeCircle}`
      );
  }, [selectedNode]);

  return (
    <div className={styles.navigationContainer}>
      <svg ref={svgRef} width="100%" height="100vh"></svg>
    </div>
  );
};

export default InteractiveNodeNavigation;
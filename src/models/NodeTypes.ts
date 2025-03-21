// src/models/NodeTypes.ts

export type NodeCategory = 
    | 'core' 
    | 'service' 
    | 'research' 
    | 'support' 
    | 'infrastructure';

export interface NodeData {
    id: string;
    name: string;
    route: string;
    artist?: string;
    playcount?: number;
    description?: string;
    children?: NodeData[];
    icon?: string;
    color?: string;
    category?: NodeCategory;
    tags?: string[];
    complexity?: number; // 1-10 scale of technical complexity
    maturityLevel?: 'experimental' | 'developing' | 'mature';
}

export const navigationNodeData: NodeData[] = [
    {
        id: 'root',
        name: 'Adaptive Data Fusion',
        route: '/',
        artist: 'Core',
        playcount: 100,
        description: 'Central hub of intelligent data analysis and AI-driven insights',
        category: 'core',
        tags: ['AI', 'data-fusion', 'innovation'],
        complexity: 9,
        maturityLevel: 'mature',
        children: [
            {
                id: 'spark-engine',
                name: 'Spark Engine',
                route: '/spark-engine',
                artist: 'Core Modules',
                playcount: 90,
                description: 'Powerful data processing engine for real-time analytics',
                icon: 'fa-bolt',
                color: '#FF6B6B',
                category: 'core',
                tags: ['data-processing', 'real-time', 'analytics'],
                complexity: 8,
                maturityLevel: 'mature'
            },
            {
                id: 'neurotech-network',
                name: 'NeuroTech Network',
                route: '/neurotech',
                artist: 'Core Modules',
                playcount: 85,
                description: 'Advanced neural network architecture for complex data analysis',
                icon: 'fa-brain',
                color: '#4ECDC4',
                category: 'core',
                tags: ['neural-networks', 'machine-learning', 'ai-architecture'],
                complexity: 9,
                maturityLevel: 'developing'
            },
            {
                id: 'autonomous-agent-genome',
                name: 'AA Genome',
                route: '/autonomous-agent-genome',
                artist: 'Core Modules',
                playcount: 80,
                description: 'Adaptive learning systems with advanced AI capabilities',
                icon: 'fa-dna',
                color: '#45B7D1',
                category: 'core',
                tags: ['autonomous-agents', 'adaptive-learning', 'ai-evolution'],
                complexity: 10,
                maturityLevel: 'experimental'
            },
            {
                id: 'services',
                name: 'Services',
                route: '/services',
                artist: 'Support',
                playcount: 70,
                description: 'Comprehensive AI and data fusion consulting services',
                icon: 'fa-cogs',
                category: 'service',
                tags: ['consulting', 'ai-strategy', 'digital-transformation'],
                complexity: 6,
                maturityLevel: 'mature',
                children: [
                    {
                        id: 'ai-consulting',
                        name: 'AI Consulting',
                        route: '/services/ai-consulting',
                        artist: 'Support',
                        playcount: 60,
                        description: 'Strategic AI implementation and advisory services',
                        category: 'service',
                        tags: ['strategy', 'ai-implementation', 'business-transformation'],
                        complexity: 5,
                        maturityLevel: 'mature'
                    },
                    {
                        id: 'predictive-modeling',
                        name: 'Predictive Modeling',
                        route: '/services/predictive-modeling',
                        artist: 'Support',
                        playcount: 55,
                        description: 'Advanced predictive analytics and machine learning models',
                        category: 'service',
                        tags: ['predictive-analytics', 'machine-learning', 'forecasting'],
                        complexity: 7,
                        maturityLevel: 'developing'
                    },
                    {
                        id: 'ethical-ai',
                        name: 'Ethical AI',
                        route: '/services/ethical-ai',
                        artist: 'Support',
                        playcount: 50,
                        description: 'Ensuring responsible and transparent AI development',
                        category: 'service',
                        tags: ['ai-ethics', 'responsible-ai', 'transparency'],
                        complexity: 6,
                        maturityLevel: 'developing'
                    }
                ]
            }
        ]
    }
];

export const initialNodeData: NodeData[] = [
    {
        id: 'initial',
        name: 'Welcome',
        description: 'Welcome to the Adaptive Data Fusion platform - Transforming Data into Intelligent Insights',
        route: '/',
        playcount: 100,
        category: 'core',
        tags: ['welcome', 'introduction', 'ai-platform'],
        complexity: 5,
        maturityLevel: 'mature'
    }
];

// Utility function to find a node by its route
export const findNodeByRoute = (route: string, nodes: NodeData[] = navigationNodeData): NodeData | undefined => {
    for (const node of nodes) {
        if (node.route === route) return node;
        if (node.children) {
            const childNode = findNodeByRoute(route, node.children);
            if (childNode) return childNode;
        }
    }
    return undefined;
};

// Utility function to get all leaf nodes
export const getAllLeafNodes = (nodes: NodeData[] = navigationNodeData): NodeData[] => {
    const leafNodes: NodeData[] = [];
    
    const traverse = (node: NodeData) => {
        if (!node.children || node.children.length === 0) {
            leafNodes.push(node);
        } else {
            node.children.forEach(traverse);
        }
    };

    nodes.forEach(traverse);
    return leafNodes;
};
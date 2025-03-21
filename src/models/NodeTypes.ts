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
}

export const navigationNodeData: NodeData[] = [
    {
        id: 'root',
        name: 'Adaptive Data Fusion',
        route: '/',
        artist: 'Core',
        playcount: 100,
        description: 'Central hub of intelligent data analysis',
        children: [
            {
                id: 'spark-engine',
                name: 'Spark Engine',
                route: '/spark-engine',
                artist: 'Core Modules',
                playcount: 90,
                description: 'Powerful data processing engine for real-time analytics',
                icon: 'fa-bolt',
                color: '#FF6B6B'
            },
            {
                id: 'neurotech-network',
                name: 'NeuroTech Network',
                route: '/neurotech',
                artist: 'Core Modules',
                playcount: 85,
                description: 'Neural network architecture for complex data analysis',
                icon: 'fa-brain',
                color: '#4ECDC4'
            },
            {
                id: 'autonomous-agent-genome',
                name: 'AA Genome',
                route: '/autonomous-agent-genome',
                artist: 'Core Modules',
                playcount: 80,
                description: 'Adaptive learning systems',
                icon: 'fa-dna',
                color: '#45B7D1'
            },
            {
                id: 'services',
                name: 'Services',
                route: '/services',
                artist: 'Support',
                playcount: 70,
                description: 'Comprehensive AI and data fusion services',
                icon: 'fa-cogs',
                children: [
                    {
                        id: 'ai-consulting',
                        name: 'AI Consulting',
                        route: '/services/ai-consulting',
                        artist: 'Support',
                        playcount: 60
                    },
                    {
                        id: 'predictive-modeling',
                        name: 'Predictive Modeling',
                        route: '/services/predictive-modeling',
                        artist: 'Support',
                        playcount: 55
                    },
                    {
                        id: 'ethical-ai',
                        name: 'Ethical AI',
                        route: '/services/ethical-ai',
                        artist: 'Support',
                        playcount: 50
                    }
                ]
            }
        ]
    }
];

export const initialNodeData = [
    {
        id: 'initial',
        name: 'Welcome',
        description: 'Welcome to the Adaptive Data Fusion platform',
        route: '/',
        playcount: 100
    }
];
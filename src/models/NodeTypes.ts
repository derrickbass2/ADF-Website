// src/models/NodeTypes.ts
export interface NodeData {
    id: string;
    name: string;
    route: string;
    children?: NodeData[];
    icon?: string;
}

export const navigationNodeData: NodeData[] = [
    {
        id: 'root',
        name: 'Adaptive Data Fusion',
        route: '/',
        children: [
            {
                id: 'spark-engine',
                name: 'Spark Engine',
                route: '/spark-engine',
                icon: 'fa-bolt'
            },
            {
                id: 'neurotech-network',
                name: 'NeuroTech Network',
                route: '/neurotech',
                icon: 'fa-brain'
            },
            {
                id: 'autonomous-agent-genome',
                name: 'AA Genome',
                route: '/autonomous-agent-genome',
                icon: 'fa-dna'
            },
            {
                id: 'services',
                name: 'Services',
                route: '/services',
                icon: 'fa-cogs',
                children: [
                    {
                        id: 'ai-consulting',
                        name: 'AI Consulting',
                        route: '/services/ai-consulting'
                    },
                    {
                        id: 'predictive-modeling',
                        name: 'Predictive Modeling',
                        route: '/services/predictive-modeling'
                    },
                    {
                        id: 'ethical-ai',
                        name: 'Ethical AI',
                        route: '/services/ethical-ai'
                    }
                ]
            },
            {
                id: 'research',
                name: 'Research',
                route: '/research',
                icon: 'fa-book-open',
                children: [
                    {
                        id: 'research-projects',
                        name: 'Research Projects',
                        route: '/research/projects'
                    },
                    {
                        id: 'publications',
                        name: 'Publications',
                        route: '/research/publications'
                    }
                ]
            },
            {
                id: 'case-studies',
                name: 'Case Studies',
                route: '/case-studies',
                icon: 'fa-chart-line',
                children: [
                    {
                        id: 'sweetgreen',
                        name: 'Sweetgreen',
                        route: '/case-studies/sweetgreen'
                    },
                    {
                        id: 'compass-group',
                        name: 'Compass Group',
                        route: '/case-studies/compass-group'
                    }
                ]
            },
            {
                id: 'about',
                name: 'About',
                route: '/about',
                icon: 'fa-users'
            },
            {
                id: 'contact',
                name: 'Contact',
                route: '/contact',
                icon: 'fa-envelope'
            }
        ]
    }
];

export const initialNodeData = [
    {
        id: 'initial',
        title: 'Welcome',
        content: 'Welcome to the Adaptive Data Fusion platform',
        // Add other required properties based on your NodeHomepage component
    }
];
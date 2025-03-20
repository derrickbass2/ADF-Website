// src/models/ResearchModel.ts
export interface ResearchProject {
    id: string;
    title: string;
    domain: 'IO Psychology' | 'Technology Adoption' | 'Leadership' | 'AI Ethics';
    status: 'Dissertation Prospectus' | 'In Progress' | 'Completed';
    abstract: string;
    keyFindings?: string[];
    potentialImpact: string;
    advisors?: string[];
    keywords: string[];
}
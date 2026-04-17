export type ProjectStatus = 'planning' | 'tendering' | 'in-progress' | 'completed';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  budget: number;
  completionPercentage: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  votes?: number;
  category: string;
  startDate?: string;
  endDate?: string;
  contractor?: string;
  milestones?: Milestone[];
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  votes: number;
  category: string;
  tags: string[];
  submittedBy: string;
  submittedDate: string;
  aiSummary?: string;
}

export interface Tender {
  id: string;
  projectId: string;
  title: string;
  description: string;
  maxBudget: number;
  deadline: string;
  status: 'open' | 'closed' | 'awarded';
  requirements: string[];
  bidsCount: number;
}

export interface Bid {
  id: string;
  tenderId: string;
  contractorName: string;
  cost: number;
  timeline: number; // in days
  materials: string;
  submittedDate: string;
  encrypted: boolean;
  verificationHash?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'submitted' | 'verified' | 'approved' | 'rejected';
  dueDate: string;
  completedDate?: string;
  proofPhotos: string[];
  aiVerified: boolean;
  paymentAmount: number;
  paymentReleased: boolean;
}

import { Project, Proposal, Tender, Bid } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Sector 4 Street Lighting Installation',
    description: 'Install energy-efficient LED streetlights across Sector 4 residential area',
    status: 'in-progress',
    budget: 250000,
    completionPercentage: 65,
    location: {
      lat: 28.5355,
      lng: 77.3910,
      address: 'Sector 4, Noida'
    },
    category: 'Infrastructure',
    votes: 342,
    startDate: '2025-01-15',
    contractor: 'Bright Solutions Ltd.',
    milestones: [
      {
        id: 'm1',
        title: 'Site Survey & Planning',
        description: 'Complete site survey and installation plan',
        status: 'approved',
        dueDate: '2025-01-20',
        completedDate: '2025-01-18',
        proofPhotos: ['https://images.unsplash.com/photo-1581094271901-8022df4466f9'],
        aiVerified: true,
        paymentAmount: 50000,
        paymentReleased: true
      },
      {
        id: 'm2',
        title: 'Pole Installation',
        description: 'Install light poles at designated locations',
        status: 'verified',
        dueDate: '2025-02-01',
        completedDate: '2025-01-30',
        proofPhotos: ['https://images.unsplash.com/photo-1513828583688-c52646db42da'],
        aiVerified: true,
        paymentAmount: 100000,
        paymentReleased: false
      },
      {
        id: 'm3',
        title: 'LED Fixtures Installation',
        description: 'Install LED fixtures and wiring',
        status: 'in-progress',
        dueDate: '2025-02-15',
        proofPhotos: [],
        aiVerified: false,
        paymentAmount: 75000,
        paymentReleased: false
      },
      {
        id: 'm4',
        title: 'Testing & Commissioning',
        description: 'Test all lights and commission the system',
        status: 'pending',
        dueDate: '2025-02-28',
        proofPhotos: [],
        aiVerified: false,
        paymentAmount: 25000,
        paymentReleased: false
      }
    ]
  },
  {
    id: '2',
    title: 'Community Park Renovation',
    description: 'Upgrade playground equipment, walking paths, and green spaces',
    status: 'tendering',
    budget: 500000,
    completionPercentage: 0,
    location: {
      lat: 28.5450,
      lng: 77.4000,
      address: 'Sector 12, Noida'
    },
    category: 'Recreation',
    votes: 567
  },
  {
    id: '3',
    title: 'Drainage System Repair - Block C',
    description: 'Repair and upgrade drainage infrastructure in Block C',
    status: 'completed',
    budget: 180000,
    completionPercentage: 100,
    location: {
      lat: 28.5250,
      lng: 77.3850,
      address: 'Block C, Sector 8, Noida'
    },
    category: 'Infrastructure',
    votes: 289,
    startDate: '2024-11-01',
    endDate: '2025-01-10',
    contractor: 'Urban Works Inc.'
  },
  {
    id: '4',
    title: 'Road Resurfacing - Main Avenue',
    description: 'Complete resurfacing of Main Avenue with pothole repairs',
    status: 'planning',
    budget: 350000,
    completionPercentage: 0,
    location: {
      lat: 28.5380,
      lng: 77.3920,
      address: 'Main Avenue, Sector 6, Noida'
    },
    category: 'Roads',
    votes: 823
  }
];

export const mockProposals: Proposal[] = [
  {
    id: 'p1',
    title: 'Install Speed Bumps Near School',
    description: 'We need speed bumps installed on the road near Greenfield School for child safety',
    votes: 456,
    category: 'Safety',
    tags: ['Traffic', 'Safety', 'Schools'],
    submittedBy: 'Rajesh Kumar',
    submittedDate: '2025-01-05',
    aiSummary: 'High priority safety concern related to child traffic safety near educational institution'
  },
  {
    id: 'p2',
    title: 'Public Wi-Fi in Community Center',
    description: 'Install free public Wi-Fi access points in the community center',
    votes: 234,
    category: 'Technology',
    tags: ['Digital Infrastructure', 'Community'],
    submittedBy: 'Priya Sharma',
    submittedDate: '2025-01-08',
    aiSummary: 'Digital inclusion initiative for community access to internet'
  },
  {
    id: 'p3',
    title: 'Repair Broken Sidewalks',
    description: 'Many sidewalks in Sector 5 are cracked and dangerous, especially for elderly residents',
    votes: 678,
    category: 'Infrastructure',
    tags: ['Pedestrian Safety', 'Accessibility', 'Infrastructure'],
    submittedBy: 'Amit Verma',
    submittedDate: '2025-01-10',
    aiSummary: 'Accessibility and safety issue affecting vulnerable populations'
  },
  {
    id: 'p4',
    title: 'Plant More Trees in Residential Areas',
    description: 'We need more shade trees planted along residential streets',
    votes: 392,
    category: 'Environment',
    tags: ['Green Spaces', 'Environment', 'Climate'],
    submittedBy: 'Sneha Patel',
    submittedDate: '2025-01-12',
    aiSummary: 'Environmental improvement initiative for urban greening'
  },
  {
    id: 'p5',
    title: 'Install CCTV Cameras',
    description: 'Need surveillance cameras at street corners for improved security',
    votes: 521,
    category: 'Safety',
    tags: ['Security', 'Surveillance', 'Safety'],
    submittedBy: 'Vikram Singh',
    submittedDate: '2025-01-15'
  }
];

export const mockTenders: Tender[] = [
  {
    id: 't1',
    projectId: '2',
    title: 'Community Park Renovation - Sector 12',
    description: 'Complete renovation of community park including playground equipment, walking paths, landscaping, and irrigation system',
    maxBudget: 500000,
    deadline: '2025-03-01',
    status: 'open',
    requirements: [
      'Minimum 5 years experience in park construction',
      'ISO certified materials only',
      'Completion within 90 days',
      'Warranty period: 2 years',
      'Safety certification required'
    ],
    bidsCount: 7
  },
  {
    id: 't2',
    projectId: '4',
    title: 'Road Resurfacing - Main Avenue',
    description: 'Complete resurfacing of 2km stretch with pothole repairs and road marking',
    maxBudget: 350000,
    deadline: '2025-02-25',
    status: 'open',
    requirements: [
      'Experience in road construction',
      'Use of bitumen grade VG-30',
      'Completion within 60 days',
      'Traffic management plan required',
      '1 year warranty on workmanship'
    ],
    bidsCount: 5
  },
  {
    id: 't3',
    projectId: '1',
    title: 'Sector 4 Street Lighting Installation',
    description: 'Install LED streetlights across Sector 4',
    maxBudget: 250000,
    deadline: '2025-01-10',
    status: 'closed',
    requirements: [
      'LED fixtures with minimum 50,000 hour lifespan',
      'Underground cabling',
      'Smart lighting control system'
    ],
    bidsCount: 12
  }
];

export const mockBids: Bid[] = [
  {
    id: 'b1',
    tenderId: 't1',
    contractorName: 'Green Spaces Ltd.',
    cost: 475000,
    timeline: 85,
    materials: 'ISO certified playground equipment, recycled rubber flooring, native plants',
    submittedDate: '2025-01-20',
    encrypted: true,
    verificationHash: '0x4f7a3b2c1d8e9f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b'
  },
  {
    id: 'b2',
    tenderId: 't1',
    contractorName: 'Urban Developers Inc.',
    cost: 490000,
    timeline: 90,
    materials: 'Premium grade equipment, eco-friendly materials, drought-resistant plants',
    submittedDate: '2025-01-22',
    encrypted: true,
    verificationHash: '0x8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d'
  }
];

export const topIssues = [
  {
    issue: 'Road Repairs & Maintenance',
    percentage: 34,
    count: 1247,
    sentiment: 'urgent'
  },
  {
    issue: 'Street Lighting & Safety',
    percentage: 28,
    count: 1023,
    sentiment: 'important'
  },
  {
    issue: 'Waste Management',
    percentage: 18,
    count: 658,
    sentiment: 'moderate'
  }
];

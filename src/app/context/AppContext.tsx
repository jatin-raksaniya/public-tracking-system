import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Tender, Bid, Proposal } from '../types';
import { mockProjects, mockTenders, mockBids, mockProposals } from '../data/mockData';

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'project' | 'tender' | 'general';
}

export interface PredefinedIssue {
  id: string;
  issue: string;
  votes: number;
}

export interface ProposedProject extends Project {
  isProposed: boolean;
  predefinedIssues: PredefinedIssue[];
  citizenSuggestions: string[];
}

interface AppContextType {
  projects: ProposedProject[];
  tenders: Tender[];
  bids: Bid[];
  proposals: Proposal[];
  notifications: SystemNotification[];
  addProject: (project: Omit<ProposedProject, 'id' | 'isProposed'>) => void;
  addNotification: (notification: Omit<SystemNotification, 'id' | 'date' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  voteOnProjectIssue: (projectId: string, issueId: string) => void;
  addProjectSuggestion: (projectId: string, suggestion: string) => void;
  approveProjectWork: (projectId: string, approvedWorkItems: string[]) => void;
  rejectProjectWork: (projectId: string, reason: string) => void;
  submitBid: (tenderId: string, bidData: Omit<Bid, 'id' | 'submittedDate' | 'tenderId'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'civic_chain_data';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  
  // Extend mock projects to include proposed fields for compatibility
  const initialProjects: ProposedProject[] = mockProjects.map(p => ({
    ...p,
    isProposed: false,
    predefinedIssues: [],
    citizenSuggestions: []
  }));

  const [projects, setProjects] = useState<ProposedProject[]>(initialProjects);
  const [tenders, setTenders] = useState<Tender[]>(mockTenders);
  const [bids, setBids] = useState<Bid[]>(mockBids);
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.tenders) setTenders(parsed.tenders);
        if (parsed.bids) setBids(parsed.bids);
        if (parsed.proposals) setProposals(parsed.proposals);
        if (parsed.notifications) setNotifications(parsed.notifications);
      }
    } catch (e) {
      console.error('Failed to load from local storage', e);
    }
    setDataLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (dataLoaded) {
      const stateToSave = { projects, tenders, bids, proposals, notifications };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    }
  }, [projects, tenders, bids, proposals, notifications, dataLoaded]);

  const addProject = (projectData: Omit<ProposedProject, 'id' | 'isProposed'>) => {
    const newProject: ProposedProject = {
      ...projectData,
      id: `proj-${Date.now()}`,
      isProposed: true,
    };
    setProjects(prev => [...prev, newProject]);
    
    // Automatically trigger notification for citizens
    addNotification({
      title: 'New Project Proposed in Your Area',
      message: `₹${projectData.budget.toLocaleString()} sanctioned for ${projectData.title} in ${projectData.location.address}. Give your suggestions!`,
      type: 'project',
    });
  };

  const addNotification = (notifData: Omit<SystemNotification, 'id' | 'date' | 'read'>) => {
    const newNotification: SystemNotification = {
      ...notifData,
      id: `notif-${Date.now()}`,
      date: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const voteOnProjectIssue = (projectId: string, issueId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
           ...p,
           predefinedIssues: p.predefinedIssues.map(i => i.id === issueId ? { ...i, votes: i.votes + 1 } : i)
        };
      }
      return p;
    }));
  };

  const addProjectSuggestion = (projectId: string, suggestion: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
           ...p,
           citizenSuggestions: [...p.citizenSuggestions, suggestion]
        };
      }
      return p;
    }));
  };

  const approveProjectWork = (projectId: string, approvedWorkItems: string[]) => {
    // Changing the project status from proposed to tendering
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          isProposed: false,
          status: 'tendering'
        };
      }
      return p;
    }));

    // Generate a New Tender for this approved work
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const newTender: Tender = {
      id: `tender-${Date.now()}`,
      projectId: project.id,
      title: project.title,
      description: project.description,
      maxBudget: project.budget,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      status: 'open',
      requirements: approvedWorkItems, // Use the approved work items as tender requirements
      bidsCount: 0
    };
    
    setTenders(prev => [...prev, newTender]);
    
    // Notify users
    addNotification({
      title: 'Tender Opened',
      message: `The project "${project.title}" has been approved. Requirements are listed in the tender.`,
      type: 'tender',
    });
  };

  const rejectProjectWork = (projectId: string, reason: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    // We can just keep it as proposed or archive it. Let's just log the reason or mark it.
    // For simplicity, we drop it from "proposed" queue but keep it as "rejected" if we had that state.
    // We will just add a notification for now.
    addNotification({
      title: 'Project Setup Rejected',
      message: `Admin rejected the work items for "${project.title}". Reason: ${reason}`,
      type: 'general',
    });
  };

  const submitBid = (tenderId: string, bidData: Omit<Bid, 'id' | 'submittedDate' | 'tenderId'>) => {
    const newBid: Bid = {
      ...bidData,
      id: `bid-${Date.now()}`,
      tenderId,
      submittedDate: new Date().toISOString(),
    };
    setBids(prev => [...prev, newBid]);
    
    // Update tender bid count
    setTenders(prev => prev.map(t => {
      if (t.id === tenderId) {
        return { ...t, bidsCount: t.bidsCount + 1 };
      }
      return t;
    }));
  };

  return (
    <AppContext.Provider value={{
      projects,
      tenders,
      bids,
      proposals,
      notifications,
      addProject,
      addNotification,
      markNotificationRead,
      voteOnProjectIssue,
      addProjectSuggestion,
      approveProjectWork,
      rejectProjectWork,
      submitBid
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

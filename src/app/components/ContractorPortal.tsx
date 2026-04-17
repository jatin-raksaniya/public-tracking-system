import { useState } from 'react';
import { FileText, Send, Building } from 'lucide-react';
import { TenderPortal } from './TenderPortal';
import { BiddingDashboard } from './BiddingDashboard';
import { ContractorWorkPortal } from './ContractorWorkPortal';

export function ContractorPortal() {
  const [activeTab, setActiveTab] = useState<'tenders' | 'bidding' | 'projects'>('tenders');

  return (
    <div className="space-y-6">
      
      {/* Tab Navigation */}
      <div className="flex bg-gray-100 p-1 rounded-lg w-max mx-auto mb-8">
        <button
          onClick={() => setActiveTab('tenders')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
            activeTab === 'tenders' 
              ? 'bg-white shadow-sm text-gray-900 border border-gray-200' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="h-4 w-4" />
          Open Tenders
        </button>
        <button
          onClick={() => setActiveTab('bidding')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
            activeTab === 'bidding' 
              ? 'bg-white shadow-sm text-gray-900 border border-gray-200' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Send className="h-4 w-4" />
          Submit Bid
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
            activeTab === 'projects' 
              ? 'bg-white shadow-sm text-gray-900 border border-gray-200' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Building className="h-4 w-4" />
          My Projects
        </button>
      </div>

      <div className="mt-8">
        {activeTab === 'tenders' && <TenderPortal />}
        {activeTab === 'bidding' && <BiddingDashboard />}
        {activeTab === 'projects' && <ContractorWorkPortal />}
      </div>
    </div>
  );
}

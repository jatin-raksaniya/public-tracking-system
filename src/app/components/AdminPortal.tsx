import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, AlertCircle, CheckCircle, Users, DollarSign, FileText, ThumbsUp, ThumbsDown, Plus, Sparkles, Loader2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { AddProjectModal } from './AddProjectModal';
import { topIssues } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

export function AdminPortal() {
  const { projects, addProject, tenders, bids, approveProjectWork, rejectProjectWork } = useAppContext();
  const [selectedTab, setSelectedTab] = useState<'insights' | 'bids' | 'approvals' | 'management'>('insights');
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState<Record<string, boolean>>({});
  const [aiAnalysisDone, setAiAnalysisDone] = useState<Record<string, string[]>>({});
  const [rejectionReason, setRejectionReason] = useState<Record<string, string>>({});

  const handleAddProject = (projectData: {
    title: string;
    description: string;
    budget: number;
    category: string;
    location: string;
  }) => {
    addProject({
      ...projectData,
      status: 'planning',
      completionPercentage: 0,
      location: {
        lat: 28.5, lng: 77.4, address: projectData.location
      },
      predefinedIssues: [],
      citizenSuggestions: []
    });
  };

  const handleGenerateAiSummary = (projectId: string) => {
    setIsAiLoading(prev => ({ ...prev, [projectId]: true }));
    
    // Simulate AI delay
    setTimeout(() => {
      setIsAiLoading(prev => ({ ...prev, [projectId]: false }));
      
      // Provide a mock summary list based on the project's type
      const summaryList = [
        "Procure high-grade eco-friendly materials as requested by 45 citizens.",
        "Ensure work is performed during off-peak hours to minimize traffic blockages.",
        "Include a 2-year warranty and routine maintenance checks."
      ];
      
      setAiAnalysisDone(prev => ({ ...prev, [projectId]: summaryList }));
    }, 3000);
  };

  const handleApproveWork = (projectId: string) => {
    const workItems = aiAnalysisDone[projectId] || [];
    approveProjectWork(projectId, workItems);
  };

  const handleRejectWork = (projectId: string) => {
    const reason = rejectionReason[projectId] || 'No specific reason provided.';
    rejectProjectWork(projectId, reason);
  };

  // Sentiment data for chart
  const sentimentData = [
    { name: 'Happy', value: 245, color: '#10b981' },
    { name: 'Neutral', value: 412, color: '#6b7280' },
    { name: 'Concerned', value: 198, color: '#f59e0b' },
    { name: 'Angry', value: 89, color: '#ef4444' }
  ];

  // Category distribution
  const categoryData = [
    { category: 'Infrastructure', count: 456 },
    { category: 'Safety', count: 389 },
    { category: 'Environment', count: 245 },
    { category: 'Recreation', count: 178 },
    { category: 'Technology', count: 132 }
  ];

  const adminProjects = projects.filter(p => !p.isProposed || (p.isProposed && p.status === 'planning'));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Governance tools, AI insights, and approval management
          </p>
        </div>
        <Button onClick={() => setShowAddProjectModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Propose New Project
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedTab('insights')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              selectedTab === 'insights'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Insights
          </button>
          <button
            onClick={() => setSelectedTab('bids')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              selectedTab === 'bids'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Bid Review
          </button>
          <button
            onClick={() => setSelectedTab('approvals')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              selectedTab === 'approvals'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Milestone Approvals
          </button>
          <button
            onClick={() => setSelectedTab('management')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              selectedTab === 'management'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Project Setup & Conversion
          </button>
        </div>
      </div>

      {/* AI Insights Tab */}
      {selectedTab === 'insights' && (
        <div className="space-y-8">
          {/* Sentiment Analysis */}
          <Card className="p-6">
            <h2 className="text-gray-900 mb-6">Citizen Sentiment Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-center space-y-3">
                {sentimentData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-gray-900">{item.value} responses</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Top Issues */}
          <Card className="p-6">
            <h2 className="text-gray-900 mb-6">Top Community Issues (AI Analyzed)</h2>
            <div className="space-y-4">
              {topIssues.map((issue, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-900">#{index + 1}</span>
                      <span className="text-gray-900">{issue.issue}</span>
                    </div>
                    <Badge className={
                      issue.sentiment === 'urgent' ? 'bg-red-100 text-red-800' :
                      issue.sentiment === 'important' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {issue.sentiment}
                    </Badge>
                  </div>
                  <Progress value={issue.percentage} />
                  <p className="text-sm text-gray-600">{issue.count} related proposals • {issue.percentage}% community support</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Category Distribution */}
          <Card className="p-6">
            <h2 className="text-gray-900 mb-6">Proposal Category Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* Bid Scoring Tab */}
      {selectedTab === 'bids' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-gray-900 mb-6">AI Bid Scoring & Ranking</h2>
            <p className="text-gray-600 mb-6">
              Bids are automatically ranked based on price, timeline, contractor history, and compliance
            </p>

            <div className="space-y-4">
              {bids.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-gray-50">
                  <p className="text-gray-600">No bids submitted yet.</p>
                </div>
              ) : bids.map((bid, index) => {
                const targetTender = tenders.find(t => t.id === bid.tenderId);
                const maxBudget = targetTender?.maxBudget || 100000;
                
                // Real evaluation simulation against parameters
                const priceScore = Math.max(0, 100 - ((bid.cost / maxBudget) * 40));
                const timelineScore = Math.max(0, 100 - ((bid.timeline / 90) * 30));
                // Add some arbitrary compliance score based on materials string length 
                const materialsScore = Math.min(100, 70 + (bid.materials.length > 20 ? 20 : 0));
                const overallScore = ((priceScore + timelineScore + materialsScore) / 3).toFixed(1);

                return (
                  <Card key={bid.id} className={`p-6 ${index === 0 ? 'border-2 border-green-400' : ''}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-gray-900">#{index + 1}</span>
                          <h3 className="text-gray-900">{bid.contractorName}</h3>
                          {index === 0 && (
                            <Badge className="bg-green-100 text-green-800">Best Match</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          For: {targetTender?.title || 'Unknown Tender'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">AI Score</p>
                        <p className="text-gray-900 font-bold text-lg">{overallScore}/100</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Bid Amount</p>
                        <p className="text-gray-900">₹{bid.cost.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Timeline</p>
                        <p className="text-gray-900">{bid.timeline} days</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Submitted</p>
                        <p className="text-gray-900">{new Date(bid.submittedDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Materials & Evaluation Report Reference</p>
                      <p className="text-sm text-gray-900">{bid.materials}</p>
                    </div>

                    <div className="space-y-2 mb-4 max-w-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Price Competitiveness</span>
                        <span className="text-gray-900">{priceScore.toFixed(0)}/100</span>
                      </div>
                      <Progress value={priceScore} />
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Timeline Efficiency</span>
                        <span className="text-gray-900">{timelineScore.toFixed(0)}/100</span>
                      </div>
                      <Progress value={timelineScore} />
                    </div>

                    {bid.verificationHash && (
                      <div className="pt-4 border-t flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600">Verified Hash: {bid.verificationHash.substring(0, 20)}...</span>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* Approvals Queue Tab (Legacy Milestone verification structure) */}
      {selectedTab === 'approvals' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-gray-900 mb-6">Milestone Approval Queue</h2>
            <p className="text-gray-600 mb-6">
              Review AI-verified milestones and approve payments across active projects.
            </p>
            {/* Same static UI as original for presentation */}
            <div className="space-y-4">
              <Card className="p-6 border-2 border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">Pole Installation - Sector 4 Lighting</h3>
                    <p className="text-sm text-gray-600">Contractor: Bright Solutions Ltd.</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">AI Verified</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Payment Amount</p>
                    <p className="text-gray-900">₹100,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completion Date</p>
                    <p className="text-gray-900">Jan 30, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">AI Confidence</p>
                    <p className="text-gray-900">96%</p>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-900 mb-2"><strong>AI Verification Report:</strong></p>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>✓ All 12 light poles detected in photos</li>
                        <li>✓ Poles match specified dimensions</li>
                        <li>✓ Location coordinates match project site</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1"><ThumbsDown className="h-4 w-4 mr-2" />Reject</Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700"><ThumbsUp className="h-4 w-4 mr-2" />Approve & Release Payment</Button>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      )}

      {/* Project Management & Setup Tab */}
      {selectedTab === 'management' && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900 mb-1">Proposed Projects Awaiting Setup</h2>
                <p className="text-sm text-gray-600">
                  Analyze citizen suggestions and approve work items to convert them into open tenders.
                </p>
              </div>
            </div>

            {projects.filter(p => p.isProposed).length === 0 ? (
              <div className="text-center py-12 border bg-gray-50 rounded-lg">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">No proposed projects awaiting setup.</p>
                <p className="text-sm text-gray-500">
                  Click "Propose New Project" button to sanction budget for an area.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.filter(p => p.isProposed).map((project) => (
                  <Card key={project.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-bold mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-600">{project.description}</p>
                      </div>
                      <Badge className="bg-cyan-100 text-cyan-800">Proposed / Sanctioned</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Budget</p>
                        <p className="text-gray-900 font-semibold">₹{project.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Citizen Suggestions</p>
                        <p className="text-gray-900">{(project.citizenSuggestions || []).length} received</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="text-gray-900">{project.location.address}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      {isAiLoading[project.id] ? (
                        <div className="flex items-center justify-center p-8 bg-blue-50/50 rounded-lg border border-blue-100">
                          <Loader2 className="h-6 w-6 text-blue-600 animate-spin mr-3" />
                          <span className="text-blue-900">AI is summarizing citizen feedback and building work list...</span>
                        </div>
                      ) : aiAnalysisDone[project.id] ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold text-gray-900">AI Generated Work Items</h3>
                          </div>
                          <ul className="space-y-2 list-disc pl-5">
                            {aiAnalysisDone[project.id].map((item, idx) => (
                              <li key={idx} className="text-gray-700 text-sm">{item}</li>
                            ))}
                          </ul>
                          <div className="flex gap-3 mt-4">
                            <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleApproveWork(project.id)}>
                              Approve Items & Create Tender
                            </Button>
                          </div>
                          <div className="flex gap-3 mt-2">
                             <input 
                               placeholder="Reason for rejection (if rejecting)" 
                               className="border rounded px-3 py-2 text-sm flex-1"
                               value={rejectionReason[project.id] || ''}
                               onChange={e => setRejectionReason({...rejectionReason, [project.id]: e.target.value})}
                             />
                             <Button variant="outline" className="w-1/3 text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleRejectWork(project.id)}>
                               Reject Setup
                             </Button>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700" 
                          onClick={() => handleGenerateAiSummary(project.id)}
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Setup & Work Items with AI
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={showAddProjectModal}
        onClose={() => setShowAddProjectModal(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
}
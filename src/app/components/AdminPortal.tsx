import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, AlertCircle, CheckCircle, Users, DollarSign, FileText, ThumbsUp, ThumbsDown, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { AddProjectModal } from './AddProjectModal';
import { mockProposals, mockTenders, mockBids, topIssues } from '../data/mockData';

export function AdminPortal() {
  const [selectedTab, setSelectedTab] = useState<'insights' | 'bids' | 'approvals' | 'management'>('insights');
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [addedProjects, setAddedProjects] = useState<Array<{
    id: string;
    title: string;
    description: string;
    budget: number;
    category: string;
    location: string;
    dateAdded: string;
  }>>([]);

  const handleAddProject = (project: {
    title: string;
    description: string;
    budget: number;
    category: string;
    location: string;
  }) => {
    const newProject = {
      id: `proj-${Date.now()}`,
      ...project,
      dateAdded: new Date().toISOString()
    };
    setAddedProjects([...addedProjects, newProject]);
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
          Add New Project
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
            Approvals
          </button>
          <button
            onClick={() => setSelectedTab('management')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              selectedTab === 'management'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Project Management
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
              {mockBids.map((bid, index) => {
                // Calculate score (simplified)
                const priceScore = 100 - ((bid.cost / 500000) * 40);
                const timelineScore = 100 - ((bid.timeline / 90) * 30);
                const overallScore = ((priceScore + timelineScore) / 2).toFixed(1);

                return (
                  <Card key={bid.id} className={`p-6 ${index === 0 ? 'border-2 border-green-400' : ''}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-gray-900">#{index + 1}</span>
                          <h3 className="text-gray-900">{bid.contractorName}</h3>
                          {index === 0 && (
                            <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          For: {mockTenders.find(t => t.id === bid.tenderId)?.title}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">AI Score</p>
                        <p className="text-gray-900">{overallScore}/100</p>
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
                      <p className="text-sm text-gray-600 mb-1">Materials & Approach</p>
                      <p className="text-sm text-gray-900">{bid.materials}</p>
                    </div>

                    <div className="space-y-2 mb-4">
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

                    <div className="pt-4 border-t flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">Verified Hash: {bid.verificationHash?.substring(0, 20)}...</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* Approvals Queue Tab */}
      {selectedTab === 'approvals' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-gray-900 mb-6">Milestone Approval Queue</h2>
            <p className="text-gray-600 mb-6">
              Review AI-verified milestones and approve payments
            </p>

            <div className="space-y-4">
              {/* Approval Item 1 */}
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
                      <p className="text-sm text-blue-900 mb-2">
                        <strong>AI Verification Report:</strong>
                      </p>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>✓ All 12 light poles detected in photos</li>
                        <li>✓ Poles match specified dimensions</li>
                        <li>✓ Installation depth verified</li>
                        <li>✓ Location coordinates match project site</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Proof Photos (2)</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-video bg-gray-200 rounded-lg" />
                    <div className="aspect-video bg-gray-200 rounded-lg" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Approve & Release Payment
                  </Button>
                </div>
              </Card>

              {/* Approval Item 2 */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">Site Survey - Community Park Renovation</h3>
                    <p className="text-sm text-gray-600">Contractor: Green Spaces Ltd.</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">AI Verified</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Payment Amount</p>
                    <p className="text-gray-900">₹50,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completion Date</p>
                    <p className="text-gray-900">Jan 28, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">AI Confidence</p>
                    <p className="text-gray-900">92%</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Approve & Release Payment
                  </Button>
                </div>
              </Card>

              {/* Warning Item */}
              <Card className="p-6 border-2 border-orange-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">Foundation Work - Block C Drainage</h3>
                    <p className="text-sm text-gray-600">Contractor: Urban Works Inc.</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Needs Review
                  </Badge>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-orange-900 mb-2">
                        <strong>AI Flagged Issues:</strong>
                      </p>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>⚠ Only 2 of 4 required photos submitted</li>
                        <li>⚠ Photo quality below threshold</li>
                        <li>⚠ Manual inspection recommended</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Request More Info
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button className="flex-1">
                    Schedule Inspection
                  </Button>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      )}

      {/* Project Management Tab */}
      {selectedTab === 'management' && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900 mb-1">Added Projects</h2>
                <p className="text-sm text-gray-600">
                  {addedProjects.length} project{addedProjects.length !== 1 ? 's' : ''} added by admin
                </p>
              </div>
            </div>

            {addedProjects.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">No projects added yet</p>
                <p className="text-sm text-gray-500">
                  Click "Add New Project" button to create your first project
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {addedProjects.map((project) => (
                  <Card key={project.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-600">{project.description}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Budget</p>
                        <p className="text-gray-900">₹{project.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="text-gray-900">{project.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="text-gray-900">{project.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date Added</p>
                        <p className="text-gray-900">
                          {new Date(project.dateAdded).toLocaleDateString()}
                        </p>
                      </div>
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
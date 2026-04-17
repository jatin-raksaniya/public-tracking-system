import { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Camera, ShieldCheck, DollarSign, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockProjects } from '../data/mockData';

export function ProjectStatusDashboard() {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]?.id || '');

  const project = mockProjects.find(p => p.id === selectedProject);
  const inProgressProjects = mockProjects.filter(p => p.status === 'in-progress' || p.status === 'completed');

  const getMilestoneStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'verified':
        return <ShieldCheck className="h-5 w-5 text-blue-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-purple-600" />;
      case 'submitted':
        return <Camera className="h-5 w-5 text-orange-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-400" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'verified':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'submitted':
        return 'bg-orange-100 text-orange-800';
      case 'pending':
        return 'bg-gray-100 text-gray-600';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-gray-900 mb-2">Project Status Tracker</h1>
        <p className="text-gray-600">
          Real-time tracking of project milestones with AI-verified proof of work
        </p>
      </div>

      {/* Project Selection */}
      <Card className="p-6">
        <label htmlFor="project-select" className="text-sm text-gray-600 mb-2 block">
          Select Project
        </label>
        <select
          id="project-select"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          {inProgressProjects.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.title} - {proj.completionPercentage}% Complete
            </option>
          ))}
        </select>
      </Card>

      {project && (
        <>
          {/* Project Overview */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-gray-900 mb-2">{project.title}</h2>
                <p className="text-gray-600">{project.description}</p>
              </div>
              <Badge className={
                project.status === 'completed' ? 'bg-green-100 text-green-800' :
                project.status === 'in-progress' ? 'bg-purple-100 text-purple-800' : ''
              }>
                {getStatusLabel(project.status)}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                <p className="text-gray-900">₹{project.budget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Contractor</p>
                <p className="text-gray-900">{project.contractor || 'Not assigned'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Start Date</p>
                <p className="text-gray-900">
                  {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Progress</p>
                <p className="text-gray-900">{project.completionPercentage}%</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Overall Progress</span>
                <span className="text-gray-900">{project.completionPercentage}%</span>
              </div>
              <Progress value={project.completionPercentage} className="h-3" />
            </div>
          </Card>

          {/* Milestone Timeline */}
          {project.milestones && project.milestones.length > 0 && (
            <div>
              <h2 className="text-gray-900 mb-4">Milestone Timeline</h2>
              
              <div className="space-y-6">
                {project.milestones.map((milestone, index) => (
                  <Card key={milestone.id} className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Status Icon */}
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {getMilestoneStatusIcon(milestone.status)}
                        </div>
                        {index < project.milestones!.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 mt-2" style={{ minHeight: '80px' }} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-gray-900 mb-1">{milestone.title}</h3>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                          </div>
                          <Badge className={getMilestoneStatusColor(milestone.status)}>
                            {getStatusLabel(milestone.status)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-gray-600">Due Date</p>
                              <p className="text-gray-900">
                                {new Date(milestone.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          {milestone.completedDate && (
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="text-gray-600">Completed</p>
                                <p className="text-gray-900">
                                  {new Date(milestone.completedDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-gray-600">Payment</p>
                              <p className="text-gray-900">₹{milestone.paymentAmount.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>

                        {/* AI Verification Badge */}
                        {milestone.aiVerified && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="h-5 w-5 text-blue-600" />
                              <div>
                                <p className="text-sm text-blue-900">AI Verified</p>
                                <p className="text-xs text-blue-700">
                                  Computer vision has verified the proof photos match the milestone requirements
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Proof Gallery */}
                        {milestone.proofPhotos.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Camera className="h-4 w-4 text-gray-600" />
                              <p className="text-sm text-gray-900">Proof of Work</p>
                              {milestone.aiVerified && (
                                <Badge className="bg-blue-100 text-blue-800 text-xs">
                                  <ShieldCheck className="h-3 w-3 mr-1" />
                                  AI Verified
                                </Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {milestone.proofPhotos.map((photo, photoIndex) => (
                                <div key={photoIndex} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors cursor-pointer group">
                                  <ImageWithFallback
                                    src={photo}
                                    alt={`Proof photo ${photoIndex + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                  {milestone.aiVerified && (
                                    <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                                      <CheckCircle className="h-4 w-4 text-white" />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Payment Status */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                Payment: ₹{milestone.paymentAmount.toLocaleString()}
                              </span>
                            </div>
                            <Badge className={milestone.paymentReleased ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {milestone.paymentReleased ? 'Released' : 'In Escrow'}
                            </Badge>
                          </div>
                          {!milestone.paymentReleased && milestone.status === 'verified' && (
                            <p className="text-xs text-gray-500 mt-2">
                              Payment will be released after admin approval
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <Card className="p-6 bg-gray-50">
            <h3 className="text-gray-900 mb-4">Financial Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                <p className="text-gray-900">₹{project.budget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Funds Released</p>
                <p className="text-gray-900">
                  ₹{project.milestones?.filter(m => m.paymentReleased).reduce((sum, m) => sum + m.paymentAmount, 0).toLocaleString() || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Funds in Escrow</p>
                <p className="text-gray-900">
                  ₹{project.milestones?.filter(m => !m.paymentReleased).reduce((sum, m) => sum + m.paymentAmount, 0).toLocaleString() || 0}
                </p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
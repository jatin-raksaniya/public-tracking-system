import { useState } from 'react';
import { Upload, Camera, CheckCircle, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { mockProjects } from '../data/mockData';

export function ContractorWorkPortal() {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]?.id || '');
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [uploadNotes, setUploadNotes] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const project = mockProjects.find(p => p.id === selectedProject);
  const contractorProjects = mockProjects.filter(p => p.contractor);

  const handlePhotoUpload = () => {
    // Simulate photo upload
    const newPhotos = [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5'
    ];
    setUploadedPhotos(newPhotos);
  };

  const handleSubmitMilestone = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedMilestone(null);
      setUploadNotes('');
      setUploadedPhotos([]);
    }, 3000);
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
        <h1 className="text-gray-900 mb-2">My Projects</h1>
        <p className="text-gray-600">
          Upload milestone progress and track payments
        </p>
      </div>

      {/* Project Selection */}
      <Card className="p-6">
        <label htmlFor="contractor-project-select" className="text-sm text-gray-600 mb-2 block">
          Select Your Project
        </label>
        <select
          id="contractor-project-select"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          {contractorProjects.map((proj) => (
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
            <h2 className="text-gray-900 mb-4">{project.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Contract Value</p>
                <p className="text-gray-900">₹{project.budget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Funds Released</p>
                <p className="text-green-600">
                  ₹{project.milestones?.filter(m => m.paymentReleased).reduce((sum, m) => sum + m.paymentAmount, 0).toLocaleString() || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Funds in Escrow</p>
                <p className="text-yellow-600">
                  ₹{project.milestones?.filter(m => !m.paymentReleased).reduce((sum, m) => sum + m.paymentAmount, 0).toLocaleString() || 0}
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

          {/* Milestones */}
          {project.milestones && project.milestones.length > 0 && (
            <div>
              <h2 className="text-gray-900 mb-4">Project Milestones</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.milestones.map((milestone) => (
                  <Card key={milestone.id} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-gray-900">{milestone.title}</h3>
                      <Badge className={getMilestoneStatusColor(milestone.status)}>
                        {getStatusLabel(milestone.status)}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{milestone.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Due Date</span>
                        <span className="text-gray-900">
                          {new Date(milestone.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Payment Amount</span>
                        <span className="text-gray-900">₹{milestone.paymentAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Payment Status</span>
                        <Badge className={milestone.paymentReleased ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {milestone.paymentReleased ? 'Released' : 'In Escrow'}
                        </Badge>
                      </div>
                    </div>

                    {milestone.status === 'in-progress' && (
                      <Button
                        onClick={() => setSelectedMilestone(milestone.id)}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Progress
                      </Button>
                    )}

                    {milestone.status === 'submitted' && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <p className="text-sm text-orange-800">Awaiting AI verification</p>
                        </div>
                      </div>
                    )}

                    {milestone.status === 'verified' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                          <p className="text-sm text-blue-800">AI verified - awaiting admin approval</p>
                        </div>
                      </div>
                    )}

                    {milestone.status === 'approved' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <p className="text-sm text-green-800">Approved - payment {milestone.paymentReleased ? 'released' : 'processing'}</p>
                        </div>
                      </div>
                    )}

                    {milestone.status === 'rejected' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <p className="text-sm text-red-800">Rejected - please re-submit with corrections</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMilestone(milestone.id)}
                          className="w-full mt-2"
                        >
                          Re-submit Work
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Upload Form Modal */}
          {selectedMilestone && (
            <Card className="p-6 border-2 border-blue-500">
              <div className="mb-6">
                <h2 className="text-gray-900 mb-2">Upload Milestone Proof</h2>
                <p className="text-gray-600">
                  {project.milestones?.find(m => m.id === selectedMilestone)?.title}
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2">Milestone Submitted!</h3>
                  <p className="text-gray-600">
                    Your proof photos are being processed by AI verification system
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Photo Upload */}
                  <div>
                    <label className="text-sm text-gray-900 mb-2 block">Upload Photos</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-2">Click to upload or drag photos here</p>
                      <p className="text-sm text-gray-500">Upload clear photos showing completed work</p>
                      <Button
                        onClick={handlePhotoUpload}
                        variant="outline"
                        size="sm"
                        className="mt-4"
                      >
                        Select Photos
                      </Button>
                    </div>

                    {uploadedPhotos.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">{uploadedPhotos.length} photos selected</p>
                        <div className="grid grid-cols-3 gap-2">
                          {uploadedPhotos.map((photo, index) => (
                            <div key={index} className="aspect-square rounded-lg bg-gray-200" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="upload-notes" className="text-sm text-gray-900 mb-2 block">
                      Notes (Optional)
                    </label>
                    <Textarea
                      id="upload-notes"
                      placeholder="Add any notes about the completed work..."
                      value={uploadNotes}
                      onChange={(e) => setUploadNotes(e.target.value)}
                      className="min-h-24"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900 mb-2">
                      <strong>What happens next?</strong>
                    </p>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• AI will verify your photos match milestone requirements</li>
                      <li>• Admin will review and approve if verification passes</li>
                      <li>• Payment will be released from escrow upon approval</li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedMilestone(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmitMilestone}
                      disabled={uploadedPhotos.length === 0}
                      className="flex-1"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Submit for Verification
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Payment Tracker */}
          <Card className="p-6 bg-gray-50">
            <h3 className="text-gray-900 mb-4">Payment Tracker</h3>
            <div className="space-y-3">
              {project.milestones?.map((milestone) => (
                <div key={milestone.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-900">{milestone.title}</p>
                      <p className="text-xs text-gray-600">₹{milestone.paymentAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  <Badge className={milestone.paymentReleased ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {milestone.paymentReleased ? 'Paid' : 'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

import { useState } from 'react';
import { MapPin, TrendingUp, Clock, DollarSign, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ProjectStatus } from '../types';
import { useAppContext } from '../context/AppContext';

export function ProjectExplorer() {
  const { projects } = useAppContext();
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all');

  // Also handling any proposed status so citizens can see newly created gov projects
  const filteredProjects = selectedStatus === 'all' 
    ? projects 
    : projects.filter(p => p.status === selectedStatus);

  const getStatusColor = (status: ProjectStatus | string) => {
    switch (status) {
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'tendering': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'proposed': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: ProjectStatus | string) => {
    switch (status) {
      case 'planning': return 'Planning';
      case 'tendering': return 'Tendering';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'proposed': return 'Proposed';
      default: return status;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-gray-900 mb-2">Project Explorer</h1>
        <p className="text-gray-600">Civic Chain: Track every project from proposal to completion</p>
      </div>

      {/* Map View Placeholder */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-gray-900">Project Map View</h2>
          <div className="flex gap-2 text-sm flex-wrap">
            {(['all', 'planning', 'tendering', 'in-progress', 'completed'] as const).map((status) => (
              <Badge
                key={status}
                variant={selectedStatus === status ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedStatus(status)}
              >
                {status === 'all' ? 'All' : getStatusLabel(status as ProjectStatus)}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Simple map visualization */}
        <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Interactive map showing all projects</p>
            </div>
          </div>
          {/* Project markers */}
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="absolute"
              style={{
                left: `${20 + (index % 5) * 15}%`,
                top: `${30 + (index % 3) * 20}%`
              }}
            >
              <div className="relative group cursor-pointer">
                <MapPin className={`h-8 w-8 ${
                  project.status === 'completed' ? 'text-green-600' :
                  project.status === 'in-progress' ? 'text-purple-600' :
                  project.status === 'tendering' ? 'text-blue-600' :
                  'text-yellow-600'
                }`} />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10 w-max">
                  <div className="bg-white rounded-lg shadow-lg p-3 text-xs border border-gray-200">
                    <p className="text-gray-900 font-medium mb-1 max-w-[200px] truncate">{project.title}</p>
                    <p className="text-gray-600">{project.location.address}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Project Cards */}
      <div>
        <h2 className="text-gray-900 mb-4">All Projects ({filteredProjects.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const displayStatus = project.isProposed ? 'proposed' : project.status;
            return (
            <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 mr-4">
                  <h3 className="text-gray-900 mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                </div>
                <Badge className={getStatusColor(displayStatus)}>
                  {getStatusLabel(displayStatus)}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 truncate">{project.location.address}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Budget: ₹{project.budget.toLocaleString()}</span>
                </div>

                {project.votes !== undefined && (
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{project.votes} citizen votes</span>
                  </div>
                )}

                {project.startDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      Started: {new Date(project.startDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {(project.status === 'in-progress' || project.status === 'completed') ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900">{project.completionPercentage}%</span>
                  </div>
                  <Progress value={project.completionPercentage} />
                </div>
              ) : null}

              {project.contractor && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Contractor: <span className="text-gray-900">{project.contractor}</span>
                  </p>
                </div>
              )}
            </Card>
          )})}
        </div>
      </div>
    </div>
  );
}
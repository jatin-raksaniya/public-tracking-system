import { useState } from 'react';
import { FileText, Calendar, DollarSign, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { useAppContext } from '../context/AppContext';

export function TenderPortal() {
  const { tenders } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTender, setSelectedTender] = useState<string | null>(null);

  const filteredTenders = tenders.filter(tender => 
    tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openTenders = filteredTenders.filter(t => t.status === 'open');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'awarded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-gray-900 mb-2">Open Tenders</h1>
        <p className="text-gray-600">
          Browse and bid on public infrastructure projects. All tenders are transparent and fair.
        </p>
      </div>

      {/* Search */}
      <Card className="p-6">
        <Input
          placeholder="Search tenders by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-1">Open Tenders</p>
          <p className="text-gray-900">{openTenders.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-1">Total Value</p>
          <p className="text-gray-900">
            ₹{(openTenders.reduce((sum, t) => sum + t.maxBudget, 0) / 100000).toFixed(2)} Lakhs
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-1">Total Bids Received</p>
          <p className="text-gray-900">{openTenders.reduce((sum, t) => sum + t.bidsCount, 0)}</p>
        </Card>
      </div>

      {/* Tenders List */}
      <div className="space-y-4">
        <h2 className="text-gray-900">Available Tenders ({openTenders.length})</h2>
        
        {openTenders.map((tender) => {
          const daysRemaining = getDaysRemaining(tender.deadline);
          const isExpiringSoon = daysRemaining <= 7;
          const isSelected = selectedTender === tender.id;

          return (
            <Card key={tender.id} className={`p-6 ${isSelected ? 'border-2 border-blue-500' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-gray-900">{tender.title}</h3>
                    <Badge className={getStatusColor(tender.status)}>
                      {tender.status.toUpperCase()}
                    </Badge>
                    {isExpiringSoon && (
                      <Badge className="bg-red-100 text-red-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Closing Soon
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600">{tender.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Max Budget</p>
                    <p className="text-gray-900">₹{tender.maxBudget.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Deadline</p>
                    <p className="text-gray-900">
                      {new Date(tender.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Bids Received</p>
                    <p className="text-gray-900">{tender.bidsCount} bids</p>
                  </div>
                </div>
              </div>

              {isExpiringSoon && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-800">
                      Only {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining to submit your bid
                    </p>
                  </div>
                </div>
              )}

              {/* Requirements */}
              {isSelected && (
                <div className="mb-4 space-y-4">
                  <div>
                    <p className="text-gray-900 mb-2">Project Requirements</p>
                    <ul className="space-y-2">
                      {tender.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-900 mb-2">Available Documents</p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Project Scope Document.pdf
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Site Survey Report.pdf
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Technical Specifications.pdf
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant={isSelected ? 'secondary' : 'outline'}
                  onClick={() => setSelectedTender(isSelected ? null : tender.id)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {isSelected ? 'Hide Details' : 'View Details'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Closed Tenders */}
      {filteredTenders.filter(t => t.status === 'closed').length > 0 && (
        <div className="space-y-4">
          <h2 className="text-gray-900">Recently Closed Tenders</h2>
          
          {filteredTenders.filter(t => t.status === 'closed').map((tender) => (
            <Card key={tender.id} className="p-6 opacity-60">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-gray-900">{tender.title}</h3>
                    <Badge className={getStatusColor(tender.status)}>
                      CLOSED
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">{tender.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span>Closed: {new Date(tender.deadline).toLocaleDateString()}</span>
                <span>•</span>
                <span>{tender.bidsCount} bids received</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { TrendingUp, ThumbsUp, Calendar, User, Sparkles, Lock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { mockProposals, topIssues } from '../data/mockData';

export function CommunityWishlist() {
  const [votedProposals, setVotedProposals] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'votes' | 'date'>('votes');

  const handleVote = (proposalId: string) => {
    setVotedProposals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(proposalId)) {
        newSet.delete(proposalId);
      } else {
        newSet.add(proposalId);
      }
      return newSet;
    });
  };

  const sortedProposals = [...mockProposals].sort((a, b) => {
    if (sortBy === 'votes') {
      return b.votes - a.votes;
    }
    return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
  });

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'important': return 'text-orange-600 bg-orange-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-gray-900 mb-2">Community Wishlist</h1>
        <p className="text-gray-600">
          Vote on proposals from your community. Top-voted projects move to implementation.
        </p>
      </div>

      {/* AI Summary Card */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <h2 className="text-gray-900">AI Analysis: Top Community Issues</h2>
        </div>
        <p className="text-gray-600 mb-6 text-sm">
          Our AI has analyzed all proposals and identified the most pressing concerns in your community
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topIssues.map((issue, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-900">#{index + 1}</span>
                <Badge className={getSentimentColor(issue.sentiment)}>
                  {issue.sentiment}
                </Badge>
              </div>
              <p className="text-gray-900 mb-3">{issue.issue}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Community Support</span>
                  <span className="text-gray-900">{issue.percentage}%</span>
                </div>
                <Progress value={issue.percentage} />
                <p className="text-xs text-gray-500">{issue.count} related proposals</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Voting Controls */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">
            {mockProposals.length} active proposals • {votedProposals.size} voted
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'votes' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('votes')}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Most Voted
          </Button>
          <Button
            variant={sortBy === 'date' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('date')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Recent
          </Button>
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {sortedProposals.map((proposal, index) => {
          const isTopProposal = sortBy === 'votes' && index === 0;
          
          return (
            <Card 
              key={proposal.id} 
              className={`p-6 ${isTopProposal ? 'border-2 border-purple-400 shadow-lg' : ''}`}
            >
              {isTopProposal && (
                <div className="flex items-center gap-2 mb-4 text-purple-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">Top Priority - Likely to be implemented</span>
                </div>
              )}
              
              <div className="flex items-start gap-6">
                {/* Vote Button */}
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant={votedProposals.has(proposal.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleVote(proposal.id)}
                    className="flex flex-col h-auto py-3 px-4"
                  >
                    <ThumbsUp className={`h-5 w-5 ${votedProposals.has(proposal.id) ? 'fill-current' : ''}`} />
                    <span className="mt-1">
                      {proposal.votes + (votedProposals.has(proposal.id) ? 1 : 0)}
                    </span>
                  </Button>
                  <span className="text-xs text-gray-500">votes</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-900">{proposal.title}</h3>
                    <Badge variant="outline">{proposal.category}</Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{proposal.description}</p>

                  {/* AI Summary */}
                  {proposal.aiSummary && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-900">AI Analysis</span>
                      </div>
                      <p className="text-sm text-blue-800">{proposal.aiSummary}</p>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proposal.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{proposal.submittedBy}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(proposal.submittedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Final Mandate View */}
      <Card className="p-6 bg-green-50 border-green-200">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-5 w-5 text-green-600" />
          <h2 className="text-gray-900">Approved Mandate: Ready for Tendering</h2>
        </div>
        <p className="text-gray-600 mb-4">
          The following project has received sufficient votes and has been officially approved for implementation
        </p>
        
        <div className="bg-white rounded-lg p-6 border-2 border-green-400">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-gray-900">Repair Broken Sidewalks - Sector 5</h3>
            <Badge className="bg-green-600 text-white">APPROVED</Badge>
          </div>
          <p className="text-gray-600 mb-4">
            Many sidewalks in Sector 5 are cracked and dangerous, especially for elderly residents
          </p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900">678 votes</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Approved: Jan 18, 2025</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              <strong>Status:</strong> Project locked and moved to tender phase. 
              Contractors can now submit bids.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

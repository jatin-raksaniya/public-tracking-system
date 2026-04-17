import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ThumbsUp, Send, AlertCircle, FileText } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Textarea } from './ui/textarea';

export function ProjectVoting() {
  const { projects, voteOnProjectIssue, addProjectSuggestion } = useAppContext();
  const [suggestions, setSuggestions] = useState<Record<string, string>>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Filter only proposed projects for voting
  const proposedProjects = projects.filter(p => p.isProposed);

  const handleVote = (projectId: string, issueId: string) => {
    voteOnProjectIssue(projectId, issueId);
  };

  const handleSuggestionSubmit = (projectId: string) => {
    const text = suggestions[projectId];
    if (text && text.trim().length > 0) {
      addProjectSuggestion(projectId, text.trim());
      setSuggestions(prev => ({ ...prev, [projectId]: '' }));
      
      setSubmittedMessage(`Suggestion submitted for project!`);
      setTimeout(() => setSubmittedMessage(null), 3000);
    }
  };

  if (proposedProjects.length === 0) {
    return (
      <Card className="p-8 text-center max-w-3xl mx-auto mt-8">
        <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-gray-900 mb-2">No Active Project Proposals</h2>
        <p className="text-gray-500">
          There are currently no new government proposals requiring citizen input in your area. 
          Check back later when new budgets are sanctioned.
        </p>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-gray-900 mb-2">Project Consultations</h1>
        <p className="text-gray-600">
          The government has sanctioned budget for the following projects. 
          Please vote on the key issues you want prioritized, or submit your own suggestions.
        </p>
      </div>

      {submittedMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md flex items-center gap-2">
          <ThumbsUp className="h-4 w-4" />
          {submittedMessage}
        </div>
      )}

      <div className="space-y-6">
        {proposedProjects.map(project => (
          <Card key={project.id} className="p-6 border-l-4 border-l-cyan-500">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
                  <Badge className="bg-cyan-100 text-cyan-800">New Proposal</Badge>
                </div>
                <p className="text-gray-600 mb-2">{project.description}</p>
                <div className="text-sm text-gray-500 border border-gray-100 bg-gray-50 p-2 rounded inline-block">
                  <span className="font-medium">Sanctioned Budget:</span> ₹{project.budget.toLocaleString()} | 
                  <span className="font-medium ml-2">Location:</span> {project.location.address}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                Vote on Priority Issues
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {(project.predefinedIssues || []).length > 0 ? (
                  project.predefinedIssues.map(issue => (
                    <div key={issue.id} className="flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm">
                      <span className="text-gray-800 font-medium">{issue.issue}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">{issue.votes} votes</span>
                        <Button size="sm" variant="outline" onClick={() => handleVote(project.id, issue.id)} className="hover:bg-blue-50 text-blue-600 border-blue-200">
                          <ThumbsUp className="h-4 w-4 mr-1" /> Vote
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No predefined issues for this project.</p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Have a specific suggestion?</h3>
                <div className="flex gap-3">
                  <Textarea 
                    placeholder="E.g., Please ensure the materials used are eco-friendly..."
                    value={suggestions[project.id] || ''}
                    onChange={(e) => setSuggestions({...suggestions, [project.id]: e.target.value})}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="flex justify-end mt-3">
                  <Button 
                    onClick={() => handleSuggestionSubmit(project.id)}
                    disabled={!(suggestions[project.id]?.trim().length > 0)}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Suggestion
                  </Button>
                </div>
              </div>
              
              {(project.citizenSuggestions || []).length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">Recent Suggestions</p>
                  <ul className="space-y-2">
                    {project.citizenSuggestions.slice(-3).map((sugg, idx) => (
                      <li key={idx} className="text-sm text-gray-700 bg-white border p-2 rounded shadow-sm">
                        "{sugg}"
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

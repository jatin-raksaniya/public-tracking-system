import { ArrowRight, Users, DollarSign, Workflow, Vote, FileText, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { mockProjects } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const activeProjects = mockProjects.filter(p => p.status === 'in-progress').length;
  const totalFunds = mockProjects.reduce((sum, p) => sum + p.budget, 0);
  const totalVotes = mockProjects.reduce((sum, p) => sum + (p.votes || 0), 0);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-gray-900 mb-4">
            Track Public Money from Vote to Pavement
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Complete transparency in civic projects. From citizen proposals to contractor execution,
            see exactly how your tax money is being used with our Civic Chain tracking system.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate('voice-needs')}>
              Submit a Proposal
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate('explorer')}>
              Explore Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Live Stats Dashboard */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-gray-900 mb-2">Live Platform Stats</h2>
          <p className="text-gray-600">Real-time transparency in action</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Workflow className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-gray-900">{activeProjects}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Funds Deployed</p>
                <p className="text-gray-900">₹{(totalFunds / 1000000).toFixed(2)}M</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Citizens Engaged</p>
                <p className="text-gray-900">{totalVotes.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-2">How Civic Chain Works</h2>
          <p className="text-gray-600">Three transparent steps from community voice to completed project</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="relative">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4">
                <Vote className="h-8 w-8" />
              </div>
              <h3 className="text-gray-900 mb-2">1. Vote</h3>
              <p className="text-gray-600 text-sm">
                Citizens submit and vote on project proposals. AI analyzes needs and priorities
                to create a democratic mandate.
              </p>
              <Button 
                variant="link" 
                className="mt-4"
                onClick={() => onNavigate('wishlist')}
              >
                See Community Wishlist →
              </Button>
            </div>
            <div className="hidden md:block absolute top-8 right-0 w-full h-0.5 bg-gray-200 -z-10" style={{ width: 'calc(100% + 2rem)' }} />
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-gray-900 mb-2">2. Bid</h3>
              <p className="text-gray-600 text-sm">
                Approved projects go to public tender. Contractors submit encrypted bids.
                Smart contracts ensure fairness.
              </p>
              <Button 
                variant="link" 
                className="mt-4"
                onClick={() => onNavigate('tender-portal')}
              >
                View Open Tenders →
              </Button>
            </div>
            <div className="hidden md:block absolute top-8 right-0 w-full h-0.5 bg-gray-200 -z-10" style={{ width: 'calc(100% + 2rem)' }} />
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-gray-900 mb-2">3. Build</h3>
              <p className="text-gray-600 text-sm">
                Track progress in real-time. AI verifies milestone photos. Payments released
                only after verified completion.
              </p>
              <Button 
                variant="link" 
                className="mt-4"
                onClick={() => onNavigate('project-status')}
              >
                Track Projects →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 rounded-lg p-12 text-center">
        <h2 className="text-gray-900 mb-4">Ready to Make Your Voice Heard?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of citizens shaping the future of your community. Every vote counts,
          every rupee is tracked.
        </p>
        <Button size="lg" onClick={() => onNavigate('voice-needs')}>
          Submit Your Proposal
        </Button>
      </section>
    </div>
  );
}
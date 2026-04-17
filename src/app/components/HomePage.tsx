import { ArrowRight, Users, ShieldAlert, EyeOff, FileText, Vote, Search, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useAppContext } from '../context/AppContext';
import BorderGlow from './BorderGlow';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { projects } = useAppContext();
  
  const safeProjects = Array.isArray(projects) ? projects : [];
  
  const activeProjects = safeProjects.filter(p => p && (p.status === 'in-progress' || p.status === 'tendering')).length;
  const totalFunds = safeProjects.reduce((sum, p) => sum + (typeof p?.budget === 'number' ? p.budget : 0), 0);
  const totalVotes = safeProjects.reduce((sum, p) => {
    if (!p) return sum;
    let predefinedVotes = 0;
    if (p.isProposed && Array.isArray(p.predefinedIssues)) {
      predefinedVotes = p.predefinedIssues.reduce((s, i) => s + (typeof i?.votes === 'number' ? i.votes : 0), 0);
    }
    return sum + (typeof p.votes === 'number' ? p.votes : 0) + predefinedVotes;
  }, 0);

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        {/* Background Decorative Blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold tracking-wide mb-6">
            A New Era of Civic Transparency
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Track Public Money <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              From Vote to Pavement
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Unveiling the mystery of civic development. From your neighborhood streets to city-wide infrastructure, know exactly where your tax money goes, who builds it, and why.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 shadow-lg shadow-blue-500/25" onClick={() => onNavigate('voice-needs')}>
              Pitch a New Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-gray-300" onClick={() => onNavigate('explorer')}>
              Explore Live Tracker
            </Button>
          </div>
        </div>
      </section>

      {/* Chapter 1: The Problem */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Status Quo is Broken</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">When your government builds around you, do you even know what's happening?</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BorderGlow 
            glowColor="0 90 60" 
            backgroundColor="rgba(255, 255, 255, 0.9)"
            animated={true}
            className="h-full"
          >
            <div className="p-8 h-full flex flex-col">
              <EyeOff className="h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Zero Transparency</h3>
              <p className="text-gray-600">Citizens are kept in the dark regarding timelines and astronomical budgets. Information is scattered and inaccessible.</p>
            </div>
          </BorderGlow>

          <BorderGlow 
            glowColor="30 95 55" 
            backgroundColor="rgba(255, 255, 255, 0.9)"
            animated={true}
            className="h-full"
          >
            <div className="p-8 h-full flex flex-col">
              <ShieldAlert className="h-10 w-10 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">High Corruption Risks</h3>
              <p className="text-gray-600">Without public oversight and transparent tendering, accountability vanishes and project costs artificially bloat.</p>
            </div>
          </BorderGlow>

          <BorderGlow 
            glowColor="210 20 60" 
            backgroundColor="rgba(255, 255, 255, 0.9)"
            animated={true}
            className="h-full"
          >
            <div className="p-8 h-full flex flex-col">
              <Users className="h-10 w-10 text-gray-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Public Voice</h3>
              <p className="text-gray-600">The primary consumers of the newly built infrastructure don't have a structured way to voice actual needs.</p>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* Chapter 2: The Solution (How it Works) */}
      <section className="bg-gray-50 py-20 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">A System That Rebuilds Trust</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Our transparent, three-step engine guarantees your tax money delivers real results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-200"></div>

            {/* Step 1 */}
            <div className="relative text-center z-10 group">
              <div className="h-24 w-24 rounded-2xl bg-white shadow-xl border border-gray-100 flex items-center justify-center mx-auto mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                <Vote className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Propose & Vote</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                You highlight community issues. AI summarizes the highest priority public needs into actionable proposals for the government to sanction.
              </p>
              <Button variant="link" className="text-blue-600 font-semibold" onClick={() => onNavigate('voice-needs')}>
                See Community Proposals →
              </Button>
            </div>

            {/* Step 2 */}
            <div className="relative text-center z-10 group">
              <div className="h-24 w-24 rounded-2xl bg-white shadow-xl border border-gray-100 flex items-center justify-center mx-auto mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                <FileText className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Open Tender Bid</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Sanctioned proposals turn into public tenders. Contractors place secure, verifiable bids while maintaining an even playing field.
              </p>
              <Button variant="link" className="text-indigo-600 font-semibold" onClick={() => onNavigate('explorer')}>
                Explore Active Tenders →
              </Button>
            </div>

            {/* Step 3 */}
            <div className="relative text-center z-10 group">
              <div className="h-24 w-24 rounded-2xl bg-white shadow-xl border border-gray-100 flex items-center justify-center mx-auto mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                <ShieldCheck className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Track & Verify</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                The winning contractor logs AI-verified milestones. You track the progress, and tax funds are safely held in escrow until completed.
              </p>
              <Button variant="link" className="text-emerald-600 font-semibold" onClick={() => onNavigate('project-status')}>
                Track Operations →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Live System Analytics */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-[100px] -z-10"></div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Transparency by the Numbers</h2>
              <p className="text-gray-600 text-lg mb-8">
                Every record is open to the public. Watch the ecosystem organically grow as more projects are actively deployed and monitored by the citizens they serve.
              </p>
              <Button onClick={() => onNavigate('explorer')} className="shadow-md">
                <Search className="h-4 w-4 mr-2" />
                Audit the Platform Data
              </Button>
            </div>

            <div className="flex-1 w-full grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
                <div className="text-4xl font-black text-blue-600 mb-2">{activeProjects}</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Active Deployments</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
                <div className="text-4xl font-black text-emerald-600 mb-2">₹{(isNaN(+totalFunds) ? 0 : (totalFunds / 10000000)).toFixed(1)}Cr</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Vetted Funds</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center col-span-2">
                <div className="text-4xl font-black text-indigo-600 mb-2">{isNaN(+totalVotes) ? 0 : totalVotes.toLocaleString()}+</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Civic Feedback Data Points</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Climax CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center mt-12 pb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Reclaim Your City's Future</h2>
        <p className="text-xl text-gray-600 mb-10">
          The power of oversight is now in your hands. Join your fellow citizens in ensuring fairness and demanding the high-quality development your taxes pay for.
        </p>
        <div className="flex justify-center flex-wrap gap-4">
           <Button size="lg" className="h-14 px-10 text-lg shadow-xl shadow-blue-500/20 bg-blue-600 hover:bg-blue-700" onClick={() => onNavigate('voice-needs')}>
            Log a Civic Requirement
           </Button>
        </div>
      </section>
    </div>
  );
}
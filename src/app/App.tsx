import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { ProjectExplorer } from './components/ProjectExplorer';
import { VoiceYourNeeds } from './components/VoiceYourNeeds';
import { CommunityWishlist } from './components/CommunityWishlist';
import { TenderPortal } from './components/TenderPortal';
import { BiddingDashboard } from './components/BiddingDashboard';
import { ProjectStatusDashboard } from './components/ProjectStatusDashboard';
import { ContractorWorkPortal } from './components/ContractorWorkPortal';
import { AdminPortal } from './components/AdminPortal';
import { LoginModal } from './components/LoginModal';
import { Chatbot } from './components/Chatbot';
import { Menu, LogOut, User } from 'lucide-react';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from './components/ui/sheet';
import { Badge } from './components/ui/badge';

export type UserRole = 'citizen' | 'contractor' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [userRole, setUserRole] = useState<UserRole>('citizen');
  const [isAuthenticated, setIsAuthenticated] = useState<{ contractor: boolean; admin: boolean }>({
    contractor: false,
    admin: false,
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginRole, setLoginRole] = useState<'admin' | 'contractor'>('contractor');

  const handleLogin = (username: string, password: string, role: 'admin' | 'contractor') => {
    setIsAuthenticated((prev) => ({ ...prev, [role]: true }));
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated({ contractor: false, admin: false });
    setUserRole('citizen');
    setCurrentPage('home');
  };

  const handleRoleChange = (role: UserRole) => {
    if (role === 'contractor' && !isAuthenticated.contractor) {
      setLoginRole('contractor');
      setShowLoginModal(true);
      return;
    }
    if (role === 'admin' && !isAuthenticated.admin) {
      setLoginRole('admin');
      setShowLoginModal(true);
      return;
    }
    setUserRole(role);
  };

  const handleNavigate = (page: string) => {
    // Check if navigation requires authentication
    const contractorPages = ['bidding', 'contractor-portal'];
    const adminPages = ['admin'];

    if (contractorPages.includes(page) && !isAuthenticated.contractor) {
      setLoginRole('contractor');
      setShowLoginModal(true);
      return;
    }

    if (adminPages.includes(page) && !isAuthenticated.admin) {
      setLoginRole('admin');
      setShowLoginModal(true);
      return;
    }

    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'explorer':
        return <ProjectExplorer />;
      case 'voice-needs':
        return <VoiceYourNeeds />;
      case 'wishlist':
        return <CommunityWishlist />;
      case 'tender-portal':
        return <TenderPortal />;
      case 'bidding':
        return isAuthenticated.contractor ? <BiddingDashboard /> : <TenderPortal />;
      case 'project-status':
        return <ProjectStatusDashboard />;
      case 'contractor-portal':
        return isAuthenticated.contractor ? <ContractorWorkPortal /> : <TenderPortal />;
      case 'admin':
        return isAuthenticated.admin ? <AdminPortal /> : <HomePage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const NavigationMenu = () => (
    <nav className="space-y-1">
      <div className="px-3 py-2">
        <p className="text-sm text-gray-500 mb-2">Public Pages</p>
        <Button
          variant={currentPage === 'home' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('home')}
        >
          Home
        </Button>
        <Button
          variant={currentPage === 'explorer' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('explorer')}
        >
          Project Explorer
        </Button>
      </div>

      <div className="px-3 py-2">
        <p className="text-sm text-gray-500 mb-2">Citizen Portal</p>
        <Button
          variant={currentPage === 'voice-needs' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('voice-needs')}
        >
          Voice Your Needs
        </Button>
        <Button
          variant={currentPage === 'wishlist' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('wishlist')}
        >
          Community Wishlist
        </Button>
      </div>

      <div className="px-3 py-2">
        <p className="text-sm text-gray-500 mb-2">Contractor Portal</p>
        <Button
          variant={currentPage === 'tender-portal' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('tender-portal')}
        >
          Open Tenders
        </Button>
        <Button
          variant={currentPage === 'bidding' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('bidding')}
        >
          Submit Bid
        </Button>
        <Button
          variant={currentPage === 'contractor-portal' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('contractor-portal')}
        >
          My Projects
        </Button>
      </div>

      <div className="px-3 py-2">
        <p className="text-sm text-gray-500 mb-2">Tracking</p>
        <Button
          variant={currentPage === 'project-status' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('project-status')}
        >
          Project Status
        </Button>
      </div>

      <div className="px-3 py-2">
        <p className="text-sm text-gray-500 mb-2">Administration</p>
        <Button
          variant={currentPage === 'admin' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('admin')}
        >
          Admin Dashboard
        </Button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SheetTitle>Navigation</SheetTitle>
                <div className="py-4">
                  <NavigationMenu />
                </div>
              </SheetContent>
            </Sheet>
            <div>
              <h1 className="text-gray-900">Civic Chain</h1>
              <p className="text-sm text-gray-600">Track public money from vote to pavement</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={userRole}
              onChange={(e) => handleRoleChange(e.target.value as UserRole)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="citizen">Citizen</option>
              <option value="contractor">Contractor</option>
              <option value="admin">Admin</option>
            </select>
            {userRole !== 'citizen' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="ml-2"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        role={loginRole}
      />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
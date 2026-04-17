import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { ProjectExplorer } from './components/ProjectExplorer';
import { VoiceYourNeeds } from './components/VoiceYourNeeds';
import { CommunityWishlist } from './components/CommunityWishlist';
import { ContractorPortal } from './components/ContractorPortal';
import { ProjectStatusDashboard } from './components/ProjectStatusDashboard';
import { AdminPortal } from './components/AdminPortal';
import { LoginModal } from './components/LoginModal';
import { Chatbot } from './components/Chatbot';
import { Menu, LogOut, User, Bell } from 'lucide-react';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from './components/ui/sheet';
import { Badge } from './components/ui/badge';
import { useAppContext } from './context/AppContext';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';

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
  
  const { notifications, markNotificationRead } = useAppContext();

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
    const contractorPages = ['contractor-portal'];
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
      case 'project-status':
        return <ProjectStatusDashboard />;
      case 'contractor-portal':
        // The ContractorPortal holds Open Tenders, Bidding, and My Projects tabs
        return isAuthenticated.contractor ? <ContractorPortal /> : <HomePage onNavigate={handleNavigate} />;
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
          variant={currentPage === 'contractor-portal' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentPage('contractor-portal')}
        >
          Contractor Dashboard
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

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Leftside: Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                  <SheetTitle className="mb-4">Navigation</SheetTitle>
                  <NavigationMenu />
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight text-blue-900 leading-none">Civic Chain</h1>
              <p className="text-[10px] uppercase tracking-wider text-blue-600 font-semibold hidden sm:block mt-1">Vote to Pavement</p>
            </div>
          </div>

          {/* Center: Desktop Navigation Bar */}
          <nav className="hidden md:flex items-center gap-1 mx-4">
            <Button variant={currentPage === 'home' ? 'secondary' : 'ghost'} onClick={() => handleNavigate('home')} className="text-sm font-medium">Home</Button>
            <Button variant={currentPage === 'explorer' ? 'secondary' : 'ghost'} onClick={() => handleNavigate('explorer')} className="text-sm font-medium">Explorer</Button>
            
            {userRole === 'citizen' && (
              <>
                <Button variant={currentPage === 'voice-needs' ? 'secondary' : 'ghost'} onClick={() => handleNavigate('voice-needs')} className="text-sm font-medium">Voice Needs</Button>
                <Button variant={currentPage === 'wishlist' ? 'secondary' : 'ghost'} onClick={() => handleNavigate('wishlist')} className="text-sm font-medium">Wishlist</Button>
              </>
            )}
            
            {userRole === 'contractor' && (
              <Button variant={currentPage === 'contractor-portal' ? 'secondary' : 'ghost'} onClick={() => handleNavigate('contractor-portal')} className="text-sm font-medium">Contractor Dashboard</Button>
            )}

            {userRole === 'admin' && (
              <Button variant={currentPage === 'admin' ? 'secondary' : 'ghost'} onClick={() => handleNavigate('admin')} className="text-sm font-medium">Admin Dashboard</Button>
            )}

            <Button variant={currentPage === 'project-status' ? 'secondary' : 'ghost'} onClick={() => handleNavigate('project-status')} className="text-sm font-medium">Project Status</Button>
          </nav>

          {/* Rightside: Controls */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {userRole === 'citizen' && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-9 w-9">
                    <Bell className="h-5 w-5 text-gray-600" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b bg-gray-50/50">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-500 text-sm">No notifications yet</div>
                    ) : (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer ${notif.read ? 'opacity-60 bg-white' : 'bg-blue-50/40'}`}
                          onClick={() => markNotificationRead(notif.id)}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-sm text-gray-900">{notif.title}</span>
                            {!notif.read && <span className="h-2 w-2 bg-blue-600 rounded-full mt-1.5 shadow-sm" />}
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-2 font-medium">{new Date(notif.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                        </div>
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )}
            
            <div className="relative inline-flex">
              <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none hidden sm:block" />
              <select
                value={userRole}
                onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                className="h-9 pl-3 sm:pl-9 pr-8 text-sm font-medium border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 bg-gray-50/50 hover:bg-gray-100 transition-colors cursor-pointer appearance-none"
              >
                <option value="citizen">Citizen Role</option>
                <option value="contractor">Contractor Role</option>
                <option value="admin">City Admin</option>
              </select>
            </div>

            {userRole !== 'citizen' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="h-9 px-3 gap-2 border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors hidden sm:flex"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden lg:inline">Logout</span>
              </Button>
            )}
            {userRole !== 'citizen' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="h-9 w-9 text-red-600 hover:bg-red-50 hover:text-red-700 sm:hidden"
              >
                <LogOut className="h-4 w-4" />
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
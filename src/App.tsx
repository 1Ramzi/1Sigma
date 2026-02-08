import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { ToastProvider } from './components/ui/Toast';
import { LanguageProvider } from './components/ui/LanguageSwitcher';
import { useUserStore } from './stores/userStore';
import { useDemoActivity } from './hooks/useDemoActivity';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Signals from './pages/Signals';
import SignalDetail from './pages/SignalDetail';
import Academy from './pages/Academy';
import Broker from './pages/Broker';
import Onboarding from './pages/Onboarding';

const publicPaths = ['/', '/login', '/register'];

function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <Sidebar mobile={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      <div className="flex-1 lg:ml-[220px] flex flex-col min-w-0">
        <TopBar onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const { isAuthenticated, hasCompletedOnboarding } = useUserStore();

  const isPublic = publicPaths.includes(location.pathname);

  // Show onboarding for new authenticated users
  if (isAuthenticated && !hasCompletedOnboarding && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  if (!isAuthenticated && !isPublic) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Onboarding */}
        <Route path="/onboarding" element={<Onboarding />} />
        {/* App - Simplified */}
        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/signals" element={<AppLayout><Signals /></AppLayout>} />
        <Route path="/signals/:id" element={<AppLayout><SignalDetail /></AppLayout>} />
        <Route path="/broker" element={<AppLayout><Broker /></AppLayout>} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <ToastProvider>
          <AppWithHooks />
        </ToastProvider>
      </LanguageProvider>
    </Router>
  );
}

function AppWithHooks() {
  useDemoActivity();
  return <AnimatedRoutes />;
}

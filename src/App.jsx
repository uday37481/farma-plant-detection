import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlantDetection from './components/PlantDetection';
import DetectionHistory from './components/DetectionHistory';
import Profile from './components/Profile';
import Settings from './components/Settings';
import AdminPanel from './components/AdminPanel';
import HelpSupport from './components/HelpSupport';

function AppContent() {
  const { user, loading } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    const demoUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (demoUsers.length === 0) {
      const users = [
        {
          id: 'admin-1',
          email: 'admin@test.com',
          password: 'password',
          fullName: 'Admin User',
          phone: '+91 9876543210',
          language: 'en',
          theme: 'light',
          notificationEnabled: true,
          isAdmin: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'user-1',
          email: 'user@test.com',
          password: 'password',
          fullName: 'Test User',
          phone: '+91 9876543211',
          language: 'en',
          theme: 'light',
          notificationEnabled: true,
          isAdmin: false,
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-600 font-medium"
          >
            Loading FarMa...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <AnimatePresence mode="wait">
        {showSignup ? (
          <Signup key="signup" onSwitchToLogin={() => setShowSignup(false)} />
        ) : (
          <Login key="login" onSwitchToSignup={() => setShowSignup(true)} />
        )}
      </AnimatePresence>
    );
  }

  const renderPage = () => {
    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };

    const pages = {
      dashboard: <Dashboard onNavigate={setCurrentPage} />,
      detect: <PlantDetection />,
      history: <DetectionHistory />,
      profile: <Profile />,
      settings: <Settings />,
      admin: <AdminPanel />,
      help: <HelpSupport />
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {pages[currentPage] || pages.dashboard}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
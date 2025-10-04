import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNotifications } from '../contexts/NotificationContext';
import {
  LayoutDashboard,
  Sprout,
  History,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  ChevronDown,
  Menu,
  X,
  Check,
  Trash2
} from 'lucide-react';

export default function Layout({ children, currentPage, onNavigate }) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAllNotifications } = useNotifications();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t.nav.dashboard },
    { id: 'history', icon: History, label: t.nav.history },
    { id: 'profile', icon: User, label: t.nav.profile },
    { id: 'settings', icon: Settings, label: t.nav.settings },
    { id: 'help', icon: HelpCircle, label: t.nav.help }
  ];

  const handleLogout = () => {
    if (confirm(t.auth.logoutConfirm)) {
      logout();
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-green-50'}`}>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={`fixed top-0 left-0 right-0 backdrop-blur-md shadow-lg z-50 border-b transition-colors duration-500 ${
          isDark
            ? 'bg-gray-800/90 border-gray-700'
            : 'bg-white/90 border-gray-200'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => onNavigate('dashboard')}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-xl shadow-lg"
              >
                <Sprout className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {t.appName}
                </h1>
                <p className={`text-xs transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.tagline}
                </p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-lg transition-colors duration-300 ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <Bell className={`w-6 h-6 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </motion.button>

              <div className={`hidden md:block h-8 w-px transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />

              <div className="hidden md:block relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMenuOpen(!menuOpen)}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-300 border ${
                    isDark
                      ? 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 border-gray-600'
                      : 'bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-green-200'
                  }`}
                >
                  <div className="text-right">
                    <p className={`text-sm font-semibold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                      {user?.fullName}
                    </p>
                    <p className={`text-xs transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {user?.email}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: menuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl border overflow-hidden transition-colors duration-300 ${
                        isDark
                          ? 'bg-gray-800 border-gray-700'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = currentPage === item.id;
                        return (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 5 }}
                            onClick={() => {
                              onNavigate(item.id);
                              setMenuOpen(false);
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 transition-all duration-200 ${
                              isActive
                                ? isDark
                                  ? 'bg-green-900/50 text-green-400'
                                  : 'bg-green-50 text-green-700'
                                : isDark
                                  ? 'text-gray-300 hover:bg-gray-700'
                                  : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${
                              isActive
                                ? isDark ? 'text-green-400' : 'text-green-600'
                                : isDark ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                            <span className="font-medium">{item.label}</span>
                          </motion.button>
                        );
                      })}
                      <div className={`border-t transition-colors duration-300 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={handleLogout}
                        className={`w-full flex items-center space-x-3 px-4 py-3 transition-all duration-200 ${
                          isDark
                            ? 'text-red-400 hover:bg-red-900/20'
                            : 'text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">{t.nav.logout}</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {menuOpen ? (
                  <X className={`w-6 h-6 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
                ) : (
                  <Menu className={`w-6 h-6 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4"
              >
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        onNavigate(item.id);
                        setMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? isDark
                            ? 'bg-green-900/50 text-green-400'
                            : 'bg-green-100 text-green-700'
                          : isDark
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${
                        isActive
                          ? isDark ? 'text-green-400' : 'text-green-600'
                          : isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
                <div className={`border-t my-2 transition-colors duration-300 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isDark
                      ? 'text-red-400 hover:bg-red-900/20'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">{t.nav.logout}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute right-4 top-20 shadow-2xl rounded-xl w-80 max-h-96 overflow-hidden border transition-colors duration-300 ${
                isDark
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className={`p-4 border-b flex items-center justify-between transition-colors duration-300 ${
                isDark
                  ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-700'
                  : 'bg-gradient-to-r from-green-50 to-emerald-50 border-gray-200'
              }`}>
                <h3 className={`font-semibold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                  {t.notifications.title}
                </h3>
                {notifications.length > 0 && (
                  <div className="flex space-x-2">
                    <button
                      onClick={markAllAsRead}
                      className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                        isDark
                          ? 'hover:bg-gray-600 text-gray-300'
                          : 'hover:bg-white text-gray-600'
                      }`}
                      title="Mark all as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={clearAllNotifications}
                      className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                        isDark
                          ? 'hover:bg-gray-600 text-gray-300'
                          : 'hover:bg-white text-gray-600'
                      }`}
                      title="Clear all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className={`p-8 text-center transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.notifications.noNotifications}
                  </p>
                ) : (
                  <div>
                    {notifications.slice(0, 10).map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => markAsRead(notification.id)}
                        className={`p-4 border-b transition-colors duration-200 cursor-pointer ${
                          !notification.isRead
                            ? isDark
                              ? 'bg-blue-900/20 border-gray-700'
                              : 'bg-blue-50 border-gray-100'
                            : isDark
                              ? 'border-gray-700 hover:bg-gray-700/50'
                              : 'border-gray-100 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <p className={`font-semibold text-sm transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                            {notification.title}
                          </p>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                          )}
                        </div>
                        <p className={`text-xs mt-1 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {notification.message}
                        </p>
                        <p className={`text-xs mt-1 transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="pt-24 px-4 pb-8 container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {(menuOpen || showNotifications) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setMenuOpen(false);
            setShowNotifications(false);
          }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        />
      )}
    </div>
  );
}
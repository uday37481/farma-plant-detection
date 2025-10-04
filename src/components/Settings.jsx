import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNotifications } from '../contexts/NotificationContext';
import { Globe, Palette, Bell, Moon, Sun, Plus, X, Calendar, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const { reminders, addReminder, deleteReminder } = useNotifications();
  const [settings, setSettings] = useState({
    notificationEnabled: user?.notificationEnabled ?? true
  });
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderForm, setReminderForm] = useState({
    title: '',
    description: '',
    date: '',
    time: ''
  });

  const handleNotificationToggle = () => {
    const newValue = !settings.notificationEnabled;
    setSettings({ ...settings, notificationEnabled: newValue });
    updateProfile({ notificationEnabled: newValue });
    toast.success(newValue ? 'Notifications enabled' : 'Notifications disabled');
  };

  const handleAddReminder = () => {
    if (!reminderForm.title || !reminderForm.date || !reminderForm.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    const dateTime = new Date(`${reminderForm.date}T${reminderForm.time}`);
    if (dateTime < new Date()) {
      toast.error('Please select a future date and time');
      return;
    }

    addReminder({
      title: reminderForm.title,
      description: reminderForm.description,
      date: dateTime.toISOString()
    });

    setReminderForm({ title: '', description: '', date: '', time: '' });
    setShowReminderForm(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants}>
        <h1 className={`text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent`}>
          {t.settings.title}
        </h1>
        <p className={`mt-2 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage your preferences
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className={`rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${
          isDark
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-3 mb-6">
          <Palette className={`w-6 h-6 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          <h2 className={`text-xl font-semibold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            {t.settings.theme}
          </h2>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleTheme}
            className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
              isDark
                ? 'border-green-500 bg-gradient-to-r from-gray-700 to-gray-600'
                : 'border-gray-200 hover:border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ rotate: isDark ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                  className={`p-3 rounded-lg ${
                    isDark
                      ? 'bg-gray-900'
                      : 'bg-white'
                  }`}
                >
                  {isDark ? (
                    <Moon className="w-6 h-6 text-blue-400" />
                  ) : (
                    <Sun className="w-6 h-6 text-yellow-500" />
                  )}
                </motion.div>
                <div className="text-left">
                  <p className={`font-semibold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                    {isDark ? 'Dark Mode' : 'Light Mode'}
                  </p>
                  <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                  isDark ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  animate={{ x: isDark ? 24 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-4 h-4 bg-white rounded-full"
                />
              </motion.div>
            </div>
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className={`rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${
          isDark
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-3 mb-6">
          <Globe className={`w-6 h-6 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          <h2 className={`text-xl font-semibold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            {t.settings.language}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { code: 'en', name: 'English', flag: '🇬🇧' },
            { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
            { code: 'mr', name: 'मराठी', flag: '🇮🇳' }
          ].map((lang) => (
            <motion.button
              key={lang.code}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changeLanguage(lang.code)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                language === lang.code
                  ? isDark
                    ? 'border-green-500 bg-green-900/30'
                    : 'border-green-600 bg-green-50'
                  : isDark
                    ? 'border-gray-700 hover:border-gray-600 bg-gray-700/30'
                    : 'border-gray-200 hover:border-gray-300 bg-gray-50'
              }`}
            >
              <div className="text-3xl mb-2">{lang.flag}</div>
              <p className={`font-medium transition-colors duration-300 ${
                language === lang.code
                  ? isDark ? 'text-green-400' : 'text-green-700'
                  : isDark ? 'text-gray-300' : 'text-gray-800'
              }`}>
                {lang.name}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className={`rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${
          isDark
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-3 mb-6">
          <Bell className={`w-6 h-6 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          <h2 className={`text-xl font-semibold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            {t.settings.notifications}
          </h2>
        </div>

        <div className="space-y-4">
          <motion.div
            whileHover={{ x: 5 }}
            className={`flex items-center justify-between p-4 rounded-lg transition-colors duration-300 ${
              isDark ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}
          >
            <div>
              <p className={`font-medium transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                {t.settings.enableNotifications}
              </p>
              <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Receive alerts for detection results
              </p>
            </div>
            <button
              onClick={handleNotificationToggle}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                settings.notificationEnabled ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: settings.notificationEnabled ? 24 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
              />
            </button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className={`rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${
          isDark
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className={`w-6 h-6 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            <h2 className={`text-xl font-semibold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              Plant Care Reminders
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowReminderForm(true)}
            className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        <AnimatePresence>
          {showReminderForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-4 p-4 rounded-lg border transition-colors duration-300 ${
                isDark
                  ? 'bg-gray-700/50 border-gray-600'
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Reminder title *"
                  value={reminderForm.title}
                  onChange={(e) => setReminderForm({ ...reminderForm, title: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors duration-300 ${
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                />
                <textarea
                  placeholder="Description (optional)"
                  value={reminderForm.description}
                  onChange={(e) => setReminderForm({ ...reminderForm, description: e.target.value })}
                  rows="2"
                  className={`w-full px-4 py-2 rounded-lg border resize-none transition-colors duration-300 ${
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={reminderForm.date}
                    onChange={(e) => setReminderForm({ ...reminderForm, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className={`px-4 py-2 rounded-lg border transition-colors duration-300 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-800'
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  <input
                    type="time"
                    value={reminderForm.time}
                    onChange={(e) => setReminderForm({ ...reminderForm, time: e.target.value })}
                    className={`px-4 py-2 rounded-lg border transition-colors duration-300 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-800'
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddReminder}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    Add Reminder
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowReminderForm(false)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                      isDark
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          {reminders.length === 0 ? (
            <p className={`text-center py-8 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No reminders set. Click + to add one.
            </p>
          ) : (
            reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`p-4 rounded-lg border transition-colors duration-300 ${
                  isDark
                    ? 'bg-gray-700/50 border-gray-600'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className={`font-semibold transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                      {reminder.title}
                    </p>
                    {reminder.description && (
                      <p className={`text-sm mt-1 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {reminder.description}
                      </p>
                    )}
                    <div className={`flex items-center space-x-4 mt-2 text-xs transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(reminder.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(reminder.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteReminder(reminder.id)}
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      isDark
                        ? 'hover:bg-red-900/30 text-red-400'
                        : 'hover:bg-red-50 text-red-600'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const NotificationContext = createContext(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [reminders, setReminders] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      const storedReminders = JSON.parse(
        localStorage.getItem(`reminders_${user.id}`) || '[]'
      );
      setReminders(storedReminders);

      const storedNotifications = JSON.parse(
        localStorage.getItem(`notifications_${user.id}`) || '[]'
      );
      setNotifications(storedNotifications);

      const interval = setInterval(checkReminders, 60000);
      checkReminders();

      return () => clearInterval(interval);
    }
  }, [user]);

  const checkReminders = () => {
    if (!user) return;

    const now = new Date();
    const storedReminders = JSON.parse(
      localStorage.getItem(`reminders_${user.id}`) || '[]'
    );

    storedReminders.forEach((reminder) => {
      const reminderDate = new Date(reminder.date);
      if (
        reminderDate <= now &&
        !reminder.notified &&
        reminder.status === 'active'
      ) {
        toast.info(`🌱 Reminder: ${reminder.title}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });

        addNotification({
          title: 'Plant Care Reminder',
          message: reminder.title,
          type: 'reminder'
        });

        reminder.notified = true;
      }
    });

    localStorage.setItem(`reminders_${user.id}`, JSON.stringify(storedReminders));
    setReminders(storedReminders);
  };

  const addReminder = (reminder) => {
    const newReminder = {
      id: Date.now().toString(),
      ...reminder,
      status: 'active',
      notified: false,
      createdAt: new Date().toISOString()
    };

    const updated = [...reminders, newReminder];
    setReminders(updated);
    localStorage.setItem(`reminders_${user.id}`, JSON.stringify(updated));

    toast.success('Reminder set successfully!', {
      position: 'top-right',
      autoClose: 3000
    });

    return newReminder;
  };

  const deleteReminder = (id) => {
    const updated = reminders.filter((r) => r.id !== id);
    setReminders(updated);
    localStorage.setItem(`reminders_${user.id}`, JSON.stringify(updated));

    toast.info('Reminder deleted', {
      position: 'top-right',
      autoClose: 2000
    });
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      ...notification,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    const updated = [newNotification, ...notifications];
    setNotifications(updated);
    localStorage.setItem(`notifications_${user.id}`, JSON.stringify(updated));
  };

  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    );
    setNotifications(updated);
    localStorage.setItem(`notifications_${user.id}`, JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    setNotifications(updated);
    localStorage.setItem(`notifications_${user.id}`, JSON.stringify(updated));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem(`notifications_${user.id}`, JSON.stringify([]));
  };

  const showDetectionNotification = (detection) => {
    const isHealthy = detection.status === 'healthy';

    toast[isHealthy ? 'success' : 'warning'](
      <div>
        <div className="font-bold">Detection Complete!</div>
        <div className="text-sm mt-1">
          <strong>Plant:</strong> {detection.plantName}
        </div>
        <div className="text-sm">
          <strong>Status:</strong> {isHealthy ? 'Healthy' : detection.diseaseName}
        </div>
        {!isHealthy && (
          <div className="text-xs mt-1 text-gray-600">Check recommendations</div>
        )}
      </div>,
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: isHealthy ? '✅' : '⚠️'
      }
    );

    addNotification({
      title: 'Detection Result',
      message: `${detection.plantName} - ${
        isHealthy ? 'Healthy' : detection.diseaseName
      }`,
      type: 'detection'
    });
  };

  const value = {
    reminders,
    notifications,
    addReminder,
    deleteReminder,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    showDetectionNotification,
    unreadCount: notifications.filter((n) => !n.isRead).length
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
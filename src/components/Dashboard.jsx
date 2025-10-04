import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import {
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Upload,
  History,
  Calendar,
  Leaf,
  Activity
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function Dashboard({ onNavigate }) {
  const { user } = useAuth();
  const { t } = useLanguage();

  const detections = JSON.parse(
    localStorage.getItem(`detections_${user?.id}`) || '[]'
  );

  const totalDetections = detections.length;
  const healthyPlants = detections.filter((d) => d.status === 'healthy').length;
  const diseasedPlants = detections.filter((d) => d.status === 'diseased').length;

  const recentDetections = detections
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        healthy: 0,
        diseased: 0
      });
    }
    return days;
  };

  const trendData = getLast7Days().map(day => {
    const dayDetections = detections.filter(d => {
      const detectionDate = new Date(d.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return detectionDate === day.date;
    });
    return {
      ...day,
      healthy: dayDetections.filter(d => d.status === 'healthy').length,
      diseased: dayDetections.filter(d => d.status === 'diseased').length
    };
  });

  const pieData = [
    { name: 'Healthy', value: healthyPlants, color: '#10b981' },
    { name: 'Diseased', value: diseasedPlants, color: '#ef4444' }
  ];

  const plantTypeData = detections.reduce((acc, d) => {
    const existing = acc.find(item => item.name === d.plantName);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: d.plantName, count: 1 });
    }
    return acc;
  }, []).slice(0, 5);

  const stats = [
    {
      label: t.dashboard.totalDetections,
      value: totalDetections,
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      delay: 0
    },
    {
      label: t.dashboard.healthyPlants,
      value: healthyPlants,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      delay: 0.1
    },
    {
      label: t.dashboard.diseasedPlants,
      value: diseasedPlants,
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-100',
      delay: 0.2
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          {t.dashboard.welcome}, {user?.fullName}
        </h1>
        <p className="text-gray-600 mt-2 text-lg">{t.tagline}</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl shadow-lg p-6 border border-white/50 backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm font-medium">{stat.label}</p>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: stat.delay + 0.3, type: "spring" }}
                    className="text-4xl font-bold text-gray-800 mt-2"
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className={`bg-gradient-to-br ${stat.color} p-4 rounded-xl shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
              <Activity className="w-6 h-6 text-green-600" />
              <span>Detection Trends (Last 7 Days)</span>
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="healthy"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
                name="Healthy"
              />
              <Line
                type="monotone"
                dataKey="diseased"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: '#ef4444', r: 5 }}
                name="Diseased"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
              <Leaf className="w-6 h-6 text-green-600" />
              <span>Health Status Distribution</span>
            </h2>
          </div>
          {pieData.every(d => d.value === 0) ? (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No detection data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {plantTypeData.length > 0 && (
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <span>Top Detected Crops</span>
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={plantTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border border-green-200"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {t.dashboard.quickActions}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('detect')}
            className="flex items-center space-x-3 p-4 bg-white hover:bg-green-50 rounded-xl transition-all shadow-md border-2 border-green-300 group"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-lg group-hover:shadow-lg transition-shadow"
            >
              <Upload className="w-6 h-6 text-white" />
            </motion.div>
            <span className="font-semibold text-green-700 text-lg">
              Upload New Image
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('history')}
            className="flex items-center space-x-3 p-4 bg-white hover:bg-blue-50 rounded-xl transition-all shadow-md border-2 border-blue-300 group"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-lg group-hover:shadow-lg transition-shadow"
            >
              <History className="w-6 h-6 text-white" />
            </motion.div>
            <span className="font-semibold text-blue-700 text-lg">
              View History
            </span>
          </motion.button>
        </div>
      </motion.div>

      {recentDetections.length > 0 && (
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {t.dashboard.recentActivity}
          </h2>
          <div className="space-y-3">
            {recentDetections.map((detection, index) => (
              <motion.div
                key={detection.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl hover:shadow-md transition-all cursor-pointer border border-gray-200"
                onClick={() => onNavigate('history')}
              >
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  src={detection.imageUrl}
                  alt="Plant"
                  className="w-16 h-16 rounded-xl object-cover shadow-md"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{detection.plantName}</p>
                  <p
                    className={`text-sm font-medium ${
                      detection.status === 'healthy'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {detection.status === 'healthy'
                      ? t.detection.healthy
                      : detection.diseaseName}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(detection.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
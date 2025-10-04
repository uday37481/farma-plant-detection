import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, Activity, Image as ImageIcon, HelpCircle, TrendingUp } from 'lucide-react';

export default function AdminPanel() {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user?.isAdmin) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <p className="text-red-600 text-lg">Access Denied: Admin privileges required</p>
      </div>
    );
  }

  const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const allDetections = allUsers.flatMap((u) =>
    JSON.parse(localStorage.getItem(`detections_${u.id}`) || '[]')
  );
  const allTickets = allUsers.flatMap((u) =>
    JSON.parse(localStorage.getItem(`tickets_${u.id}`) || '[]')
  );

  const todayDetections = allDetections.filter(
    (d) =>
      new Date(d.createdAt).toDateString() === new Date().toDateString()
  );

  const stats = [
    {
      label: t.admin.totalUsers,
      value: allUsers.length,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      label: t.admin.totalDetections,
      value: allDetections.length,
      icon: ImageIcon,
      color: 'bg-green-500'
    },
    {
      label: t.admin.activeToday,
      value: todayDetections.length,
      icon: Activity,
      color: 'bg-yellow-500'
    },
    {
      label: t.admin.supportTickets,
      value: allTickets.length,
      icon: HelpCircle,
      color: 'bg-red-500'
    }
  ];

  const recentUsers = allUsers
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const recentDetections = allDetections
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{t.admin.title}</h1>
        <p className="text-gray-600 mt-2">System overview and management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-full`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Users</h2>
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          {recentUsers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No users yet</p>
          ) : (
            <div className="space-y-3">
              {recentUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{u.fullName}</p>
                    <p className="text-sm text-gray-600">{u.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </p>
                    {u.isAdmin && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Detections
            </h2>
            <TrendingUp className="w-5 h-5 text-gray-600" />
          </div>
          {recentDetections.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No detections yet</p>
          ) : (
            <div className="space-y-3">
              {recentDetections.map((detection) => (
                <div
                  key={detection.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <img
                    src={detection.imageUrl}
                    alt="Plant"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">
                      {detection.plantName}
                    </p>
                    <p
                      className={`text-xs ${
                        detection.status === 'healthy'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {detection.status === 'healthy'
                        ? 'Healthy'
                        : detection.diseaseName}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(detection.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {t.admin.statistics}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Healthy Detections</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {allDetections.filter((d) => d.status === 'healthy').length}
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600">Diseased Detections</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {allDetections.filter((d) => d.status === 'diseased').length}
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Admin Users</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {allUsers.filter((u) => u.isAdmin).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
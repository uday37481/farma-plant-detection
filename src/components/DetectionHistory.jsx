import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Filter, Calendar, MapPin, Trash2, X } from 'lucide-react';

export default function DetectionHistory() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [selectedDetection, setSelectedDetection] = useState(null);

  const detections = JSON.parse(
    localStorage.getItem(`detections_${user?.id}`) || '[]'
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredDetections = detections.filter((d) => {
    if (filter === 'all') return true;
    return d.status === filter;
  });

  const handleDelete = (id) => {
    if (confirm(t.history.confirmDelete)) {
      const updated = detections.filter((d) => d.id !== id);
      localStorage.setItem(`detections_${user.id}`, JSON.stringify(updated));
      setSelectedDetection(null);
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{t.history.title}</h1>
        <p className="text-gray-600 mt-2">
          {filteredDetections.length} {t.history.title.toLowerCase()}
        </p>
      </div>

      <div className="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <div className="flex space-x-2">
          {['all', 'healthy', 'diseased'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === filterOption
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption === 'all'
                ? t.history.filterAll
                : filterOption === 'healthy'
                ? t.history.filterHealthy
                : t.history.filterDiseased}
            </button>
          ))}
        </div>
      </div>

      {filteredDetections.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">{t.history.noHistory}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDetections.map((detection) => (
            <div
              key={detection.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              onClick={() => setSelectedDetection(detection)}
            >
              <img
                src={detection.imageUrl}
                alt={detection.plantName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {detection.plantName}
                </h3>
                <p
                  className={`text-sm font-medium mt-1 ${
                    detection.status === 'healthy'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {detection.status === 'healthy'
                    ? t.detection.healthy
                    : detection.diseaseName}
                </p>
                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(detection.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {detection.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate max-w-[100px]">
                        {detection.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDetection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                {t.history.viewDetails}
              </h3>
              <button
                onClick={() => setSelectedDetection(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <img
                src={selectedDetection.imageUrl}
                alt={selectedDetection.plantName}
                className="w-full h-64 object-cover rounded-lg"
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    {t.detection.plantType}
                  </label>
                  <p className="text-lg font-semibold text-gray-800 mt-1">
                    {selectedDetection.plantName}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    {t.detection.status}
                  </label>
                  <p
                    className={`text-lg font-semibold mt-1 ${
                      selectedDetection.status === 'healthy'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {selectedDetection.status === 'healthy'
                      ? t.detection.healthy
                      : t.detection.diseased}
                  </p>
                </div>

                {selectedDetection.diseaseName && (
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-600">
                      {t.detection.disease}
                    </label>
                    <p className="text-lg font-semibold text-gray-800 mt-1">
                      {selectedDetection.diseaseName}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    {t.detection.confidence}
                  </label>
                  <p className="text-lg font-semibold text-gray-800 mt-1">
                    {(selectedDetection.confidence * 100).toFixed(0)}%
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    {t.common.view}
                  </label>
                  <p className="text-sm text-gray-700 mt-1">
                    {new Date(selectedDetection.createdAt).toLocaleString()}
                  </p>
                </div>

                {selectedDetection.location && (
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-600">
                      {t.detection.location}
                    </label>
                    <p className="text-sm text-gray-700 mt-1">
                      {selectedDetection.location}
                    </p>
                  </div>
                )}

                {selectedDetection.notes && (
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-600">
                      {t.detection.addNotes}
                    </label>
                    <p className="text-sm text-gray-700 mt-1">
                      {selectedDetection.notes}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedDetection(null)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  {t.common.close}
                </button>
                <button
                  onClick={() => handleDelete(selectedDetection.id)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold flex items-center space-x-2"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>{t.common.delete}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
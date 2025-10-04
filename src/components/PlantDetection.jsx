import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNotifications } from '../contexts/NotificationContext';
import { getRandomDetection } from '../utils/plantData';
import { Upload, Image as ImageIcon, Loader, MapPin, FileText, Sparkles } from 'lucide-react';

export default function PlantDetection() {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const { showDetectionNotification } = useNotifications();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState(null);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetect = () => {
    if (!selectedImage) return;

    setDetecting(true);
    setTimeout(() => {
      const detection = getRandomDetection();
      setResult(detection);
      setDetecting(false);
    }, 2000);
  };

  const handleSave = () => {
    if (!result) return;

    const detection = {
      id: Date.now().toString(),
      userId: user.id,
      imageUrl: imagePreview,
      plantId: result.plant.id,
      plantName: result.plant.name[language],
      scientificName: result.plant.scientificName,
      diseaseId: result.disease?.id || null,
      diseaseName: result.disease?.name[language] || null,
      treatment: result.disease?.treatment[language] || 'Continue regular care including proper watering, adequate sunlight, and balanced fertilization.',
      status: result.status,
      confidence: parseFloat(result.confidence),
      location,
      notes,
      createdAt: new Date().toISOString()
    };

    const detections = JSON.parse(
      localStorage.getItem(`detections_${user.id}`) || '[]'
    );
    detections.push(detection);
    localStorage.setItem(`detections_${user.id}`, JSON.stringify(detections));

    showDetectionNotification(detection);

    handleReset();
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setLocation('');
    setNotes('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          {t.detection.title}
        </h1>
        <p className={`mt-2 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {t.tagline}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${
            isDark
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <h2 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            {t.detection.uploadImage}
          </h2>

          {!imagePreview ? (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300 ${
                isDark
                  ? 'border-gray-600 hover:border-green-500 bg-gray-700/30'
                  : 'border-gray-300 hover:border-green-500 bg-gray-50'
              }`}
              onClick={() => document.getElementById('imageInput').click()}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ImageIcon className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              </motion.div>
              <p className={`mb-2 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.detection.dragDrop}
              </p>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold"
              >
                {t.detection.uploadImage}
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={imagePreview}
                alt="Selected plant"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDetect}
                  disabled={detecting}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {detecting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>{t.detection.detecting}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>{t.detection.title}</span>
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                    isDark
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {t.common.cancel}
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>

        {result && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.01 }}
            className={`rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${
              isDark
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <h2 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              {t.detection.result}
            </h2>

            <div className="space-y-4">
              <div>
                <label className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.detection.plantType}
                </label>
                <p className={`text-lg font-semibold mt-1 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                  {result.plant.name[language]}
                </p>
                <p className={`text-sm italic transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {result.plant.scientificName}
                </p>
              </div>

              <div>
                <label className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.detection.status}
                </label>
                <motion.p
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className={`text-lg font-semibold mt-1 ${
                    result.status === 'healthy' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {result.status === 'healthy'
                    ? t.detection.healthy
                    : t.detection.diseased}
                </motion.p>
              </div>

              {result.disease && (
                <>
                  <div>
                    <label className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t.detection.disease}
                    </label>
                    <p className={`text-lg font-semibold mt-1 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                      {result.disease.name[language]}
                    </p>
                  </div>

                  <div>
                    <label className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t.detection.recommendations}
                    </label>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`mt-2 p-4 rounded-lg border transition-colors duration-300 ${
                        isDark
                          ? 'bg-yellow-900/20 border-yellow-700'
                          : 'bg-yellow-50 border-yellow-200'
                      }`}
                    >
                      <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {result.disease.treatment[language]}
                      </p>
                    </motion.div>
                  </div>
                </>
              )}

              <div>
                <label className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.detection.confidence}
                </label>
                <div className="mt-2">
                  <div className="flex items-center space-x-3">
                    <div className={`flex-1 rounded-full h-2 transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                      />
                    </div>
                    <span className={`text-sm font-semibold transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {(result.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className={`text-sm font-medium flex items-center space-x-2 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <MapPin className="w-4 h-4" />
                  <span>{t.detection.location}</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Nashik, Maharashtra"
                  className={`w-full mt-2 px-4 py-2 rounded-lg border transition-colors duration-300 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                />
              </div>

              <div>
                <label className={`text-sm font-medium flex items-center space-x-2 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <FileText className="w-4 h-4" />
                  <span>{t.detection.addNotes}</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any observations..."
                  rows="3"
                  className={`w-full mt-2 px-4 py-2 rounded-lg border resize-none transition-colors duration-300 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold"
                >
                  {t.detection.saveResult}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                    isDark
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {t.detection.detectAnother}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
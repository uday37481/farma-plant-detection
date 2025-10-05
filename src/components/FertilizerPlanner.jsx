import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Sparkles, Droplet, Leaf, MapPin, Download } from 'lucide-react';
import { getTreatmentPlan } from '../utils/fertilizerData';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const pdfStyles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#ffffff' },
  header: { marginBottom: 20, borderBottom: '2 solid #10b981', paddingBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#10b981', marginBottom: 5 },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#1f2937', marginBottom: 8, backgroundColor: '#f0fdf4', padding: 8 },
  row: { flexDirection: 'row', marginBottom: 6 },
  label: { fontSize: 11, fontWeight: 'bold', color: '#4b5563', width: '35%' },
  value: { fontSize: 11, color: '#1f2937', width: '65%' },
  storeItem: { fontSize: 10, color: '#374151', marginBottom: 4, paddingLeft: 10 }
});

const TreatmentPDFDocument = ({ plantName, diseaseName, treatment }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.title}>FarMa Treatment & Fertilizer Plan</Text>
      </View>

      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Crop Information</Text>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>Crop:</Text>
          <Text style={pdfStyles.value}>{plantName}</Text>
        </View>
        {diseaseName && (
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Disease:</Text>
            <Text style={pdfStyles.value}>{diseaseName}</Text>
          </View>
        )}
      </View>

      {treatment.fertilizer && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Fertilizer Recommendation</Text>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Name:</Text>
            <Text style={pdfStyles.value}>{treatment.fertilizer.name}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Type:</Text>
            <Text style={pdfStyles.value}>{treatment.fertilizer.type}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Dosage:</Text>
            <Text style={pdfStyles.value}>{treatment.fertilizer.dosage}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Frequency:</Text>
            <Text style={pdfStyles.value}>{treatment.fertilizer.frequency}</Text>
          </View>
        </View>
      )}

      {treatment.pesticide && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Pesticide/Fungicide</Text>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Name:</Text>
            <Text style={pdfStyles.value}>{treatment.pesticide.name}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Dosage:</Text>
            <Text style={pdfStyles.value}>{treatment.pesticide.dosage}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Frequency:</Text>
            <Text style={pdfStyles.value}>{treatment.pesticide.frequency}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Instructions:</Text>
            <Text style={pdfStyles.value}>{treatment.pesticide.instructions}</Text>
          </View>
        </View>
      )}

      {treatment.watering && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Watering Schedule</Text>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Schedule:</Text>
            <Text style={pdfStyles.value}>{treatment.watering.schedule}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Amount:</Text>
            <Text style={pdfStyles.value}>{treatment.watering.amount}</Text>
          </View>
          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Tips:</Text>
            <Text style={pdfStyles.value}>{treatment.watering.tips}</Text>
          </View>
        </View>
      )}

      {treatment.stores && treatment.stores.length > 0 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Nearby Stores</Text>
          {treatment.stores.map((store, idx) => (
            <Text key={idx} style={pdfStyles.storeItem}>
              • {store.name} - {store.location} ({store.distance})
            </Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default function FertilizerPlanner({ plantId, plantName, diseaseId, diseaseName }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const treatment = getTreatmentPlan(plantId, diseaseId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
            : 'bg-gradient-to-br from-white to-green-50 border-green-200'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className={`text-xl font-bold transition-colors duration-300 ${
                isDark ? 'text-gray-100' : 'text-gray-800'
              }`}>
                Treatment & Care Plan
              </h3>
              <p className={`text-sm transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Customized recommendations for {plantName}
              </p>
            </div>
          </div>
          <PDFDownloadLink
            document={<TreatmentPDFDocument plantName={plantName} diseaseName={diseaseName} treatment={treatment} />}
            fileName={`FarMa_Treatment_${plantName}_${Date.now()}.pdf`}
          >
            {({ loading }) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow text-sm font-semibold disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{loading ? 'Generating...' : 'Download PDF'}</span>
              </motion.button>
            )}
          </PDFDownloadLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {treatment.fertilizer && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-4 rounded-xl border transition-colors duration-300 ${
                isDark
                  ? 'bg-gray-700/50 border-gray-600'
                  : 'bg-white border-green-200'
              }`}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Leaf className="w-5 h-5 text-green-600" />
                <h4 className={`font-bold transition-colors duration-300 ${
                  isDark ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  Fertilizer
                </h4>
              </div>
              <div className="space-y-2">
                <div>
                  <p className={`text-xs transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Name
                  </p>
                  <p className={`text-sm font-semibold transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {treatment.fertilizer.name}
                  </p>
                </div>
                <div>
                  <p className={`text-xs transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Type
                  </p>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {treatment.fertilizer.type}
                  </p>
                </div>
                <div>
                  <p className={`text-xs transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Dosage
                  </p>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {treatment.fertilizer.dosage}
                  </p>
                </div>
                <div>
                  <p className={`text-xs transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Frequency
                  </p>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {treatment.fertilizer.frequency}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {treatment.pesticide && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-4 rounded-xl border transition-colors duration-300 ${
                isDark
                  ? 'bg-gray-700/50 border-gray-600'
                  : 'bg-white border-orange-200'
              }`}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <h4 className={`font-bold transition-colors duration-300 ${
                  isDark ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  Pesticide/Fungicide
                </h4>
              </div>
              <div className="space-y-2">
                <div>
                  <p className={`text-xs transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Name
                  </p>
                  <p className={`text-sm font-semibold transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {treatment.pesticide.name}
                  </p>
                </div>
                <div>
                  <p className={`text-xs transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Dosage
                  </p>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {treatment.pesticide.dosage}
                  </p>
                </div>
                <div>
                  <p className={`text-xs transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Frequency
                  </p>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {treatment.pesticide.frequency}
                  </p>
                </div>
                <div className={`text-xs p-2 rounded-lg mt-2 transition-colors duration-300 ${
                  isDark
                    ? 'bg-yellow-900/30 text-yellow-200'
                    : 'bg-yellow-50 text-yellow-800'
                }`}>
                  {treatment.pesticide.instructions}
                </div>
              </div>
            </motion.div>
          )}

          {treatment.watering && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-4 rounded-xl border transition-colors duration-300 ${
                isDark
                  ? 'bg-gray-700/50 border-gray-600'
                  : 'bg-white border-blue-200'
              }`}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Droplet className="w-5 h-5 text-blue-600" />
                <h4 className={`font-bold transition-colors duration-300 ${
                  isDark ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  Watering Schedule
                </h4>
              </div>
              <div className="space-y-2">
                <div>
                  <p className={`text-xs transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Schedule
                  </p>
                  <p className={`text-sm font-semibold transition-colors duration-300 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {treatment.watering.schedule}
                  </p>
                </div>
                <div>
                  <p className={`text-xs transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Amount
                  </p>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {treatment.watering.amount}
                  </p>
                </div>
                <div className={`text-xs p-2 rounded-lg mt-2 transition-colors duration-300 ${
                  isDark
                    ? 'bg-blue-900/30 text-blue-200'
                    : 'bg-blue-50 text-blue-800'
                }`}>
                  {treatment.watering.tips}
                </div>
              </div>
            </motion.div>
          )}

          {treatment.stores && treatment.stores.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`p-4 rounded-xl border transition-colors duration-300 ${
                isDark
                  ? 'bg-gray-700/50 border-gray-600'
                  : 'bg-white border-purple-200'
              }`}
            >
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="w-5 h-5 text-purple-600" />
                <h4 className={`font-bold transition-colors duration-300 ${
                  isDark ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  Nearby Stores
                </h4>
              </div>
              <div className="space-y-2">
                {treatment.stores.map((store, index) => (
                  <div
                    key={index}
                    className={`flex items-start justify-between p-2 rounded-lg transition-colors duration-300 ${
                      isDark ? 'bg-gray-600/30' : 'bg-purple-50'
                    }`}
                  >
                    <div className="flex-1">
                      <p className={`text-sm font-semibold transition-colors duration-300 ${
                        isDark ? 'text-gray-200' : 'text-gray-800'
                      }`}>
                        {store.name}
                      </p>
                      <p className={`text-xs transition-colors duration-300 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {store.location}
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded transition-colors duration-300 ${
                      isDark
                        ? 'bg-purple-900/50 text-purple-300'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {store.distance}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
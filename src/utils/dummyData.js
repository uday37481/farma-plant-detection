import { plantsData } from './plantData';

export const generateDummyDetections = (userId, count = 20) => {
  const detections = [];
  const now = new Date();

  const dummyImages = [
    'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/574919/pexels-photo-574919.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  const locations = [
    'Nashik, Maharashtra',
    'Pune, Maharashtra',
    'Nagpur, Maharashtra',
    'Aurangabad, Maharashtra',
    'Mumbai, Maharashtra'
  ];

  for (let i = 0; i < count; i++) {
    const plant = plantsData[Math.floor(Math.random() * plantsData.length)];
    const isHealthy = Math.random() > 0.5;
    const disease = isHealthy ? null : plant.diseases[Math.floor(Math.random() * plant.diseases.length)];
    const confidence = 0.75 + Math.random() * 0.24;

    const daysAgo = Math.floor(Math.random() * 30);
    const detectionDate = new Date(now);
    detectionDate.setDate(detectionDate.getDate() - daysAgo);
    detectionDate.setHours(Math.floor(Math.random() * 24));
    detectionDate.setMinutes(Math.floor(Math.random() * 60));

    detections.push({
      id: `dummy-${i}-${Date.now()}`,
      userId: userId,
      imageUrl: dummyImages[Math.floor(Math.random() * dummyImages.length)],
      plantId: plant.id,
      plantName: plant.name.en,
      scientificName: plant.scientificName,
      diseaseId: disease?.id || null,
      diseaseName: disease?.name.en || null,
      treatment: disease?.treatment.en || 'Continue regular care including proper watering, adequate sunlight, and balanced fertilization. Monitor regularly for any signs of stress or disease.',
      status: isHealthy ? 'healthy' : 'diseased',
      confidence: parseFloat(confidence.toFixed(2)),
      location: locations[Math.floor(Math.random() * locations.length)],
      notes: isHealthy ? 'Plant looks healthy and well-maintained.' : 'Early symptoms detected. Immediate treatment recommended.',
      createdAt: detectionDate.toISOString()
    });
  }

  return detections.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const initializeDummyData = (userId) => {
  const existingData = localStorage.getItem(`detections_${userId}`);

  if (!existingData || JSON.parse(existingData).length === 0) {
    const dummyDetections = generateDummyDetections(userId, 25);
    localStorage.setItem(`detections_${userId}`, JSON.stringify(dummyDetections));
    return dummyDetections;
  }

  return JSON.parse(existingData);
};
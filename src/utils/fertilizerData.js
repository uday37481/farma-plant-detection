export const fertilizerTreatments = {
  'onion-downy-mildew': {
    fertilizer: {
      name: 'NPK 19:19:19',
      type: 'Water Soluble Fertilizer',
      dosage: '2-3 grams per liter of water',
      frequency: 'Apply weekly during recovery'
    },
    pesticide: {
      name: 'Copper Hydroxide 77% WP',
      dosage: '2-3 grams per liter of water',
      frequency: 'Spray every 7-10 days',
      instructions: 'Apply in early morning or evening. Cover both sides of leaves.'
    },
    watering: {
      schedule: 'Light irrigation every 3-4 days',
      amount: '1-1.5 inches per week',
      tips: 'Avoid overhead watering to prevent disease spread. Use drip irrigation if possible.'
    },
    stores: [
      { name: 'AgroStar', location: 'Nashik', distance: '2.5 km' },
      { name: 'Kisan Seva Kendra', location: 'Nashik Road', distance: '4 km' },
      { name: 'Farm Fresh Agro', location: 'Panchavati', distance: '5.5 km' }
    ]
  },
  'onion-purple-blotch': {
    fertilizer: {
      name: 'NPK 12:32:16',
      type: 'Complex Fertilizer',
      dosage: '50 kg per acre',
      frequency: 'Apply once at bulb formation stage'
    },
    pesticide: {
      name: 'Mancozeb 75% WP',
      dosage: '2.5 grams per liter of water',
      frequency: 'Spray every 10-12 days',
      instructions: 'Start spraying at first symptom appearance. Ensure complete coverage.'
    },
    watering: {
      schedule: 'Moderate irrigation every 5-7 days',
      amount: '1.5-2 inches per week',
      tips: 'Reduce watering as bulbs mature. Stop irrigation 2 weeks before harvest.'
    },
    stores: [
      { name: 'Kisan Agro Center', location: 'Nashik', distance: '3 km' },
      { name: 'Bharat Agro', location: 'Satpur', distance: '6 km' }
    ]
  },
  'tomato-leaf-curl': {
    fertilizer: {
      name: 'NPK 20:20:20 + Micronutrients',
      type: 'Foliar Spray Fertilizer',
      dosage: '2.5-3 grams per liter of water',
      frequency: 'Apply every 10-15 days as foliar spray'
    },
    pesticide: {
      name: 'Imidacloprid 17.8% SL',
      dosage: '0.5-0.75 ml per liter of water',
      frequency: 'Spray every 15 days',
      instructions: 'Control whitefly vectors. Apply early morning before 10 AM.'
    },
    watering: {
      schedule: 'Deep watering twice weekly',
      amount: '1-2 inches per week',
      tips: 'Water at soil level, not on leaves. Maintain consistent moisture.'
    },
    stores: [
      { name: 'Tomato Farm Supplies', location: 'Pune', distance: '2 km' },
      { name: 'Green Valley Agro', location: 'Kothrud', distance: '4.5 km' },
      { name: 'Kisan Bazar', location: 'Shivajinagar', distance: '5 km' }
    ]
  },
  'tomato-early-blight': {
    fertilizer: {
      name: 'NPK 13:0:45',
      type: 'Potassium Rich Fertilizer',
      dosage: '100-125 kg per acre',
      frequency: 'Apply in split doses during fruit development'
    },
    pesticide: {
      name: 'Mancozeb 75% WP',
      dosage: '2.5 grams per liter of water',
      frequency: 'Spray every 7-10 days',
      instructions: 'Remove infected leaves before spraying. Ensure good coverage.'
    },
    watering: {
      schedule: 'Regular watering every 4-5 days',
      amount: '1.5 inches per week',
      tips: 'Avoid splashing water on foliage. Use mulch to reduce soil splash.'
    },
    stores: [
      { name: 'Farm Solutions', location: 'Pune', distance: '3.5 km' },
      { name: 'Agro World', location: 'Hadapsar', distance: '6 km' }
    ]
  },
  'potato-late-blight': {
    fertilizer: {
      name: 'NPK 10:26:26',
      type: 'Phosphorus & Potassium Rich',
      dosage: '150-175 kg per acre',
      frequency: 'Apply at planting and earthing up'
    },
    pesticide: {
      name: 'Metalaxyl 8% + Mancozeb 64% WP',
      dosage: '2-2.5 grams per liter of water',
      frequency: 'Spray every 7 days during disease period',
      instructions: 'Start preventive sprays before disease appears. Cover all foliage.'
    },
    watering: {
      schedule: 'Irrigation every 7-10 days',
      amount: '1-1.5 inches per week',
      tips: 'Avoid excessive moisture. Ensure good drainage to prevent waterlogging.'
    },
    stores: [
      { name: 'Potato Growers Supply', location: 'Nashik', distance: '4 km' },
      { name: 'Modern Agro Store', location: 'Igatpuri', distance: '8 km' }
    ]
  },
  'grapes-powdery-mildew': {
    fertilizer: {
      name: 'NPK 19:19:19 + Zinc',
      type: 'Complete Fertilizer with Micronutrients',
      dosage: '3-5 kg per acre as foliar spray',
      frequency: 'Apply every 15 days during growing season'
    },
    pesticide: {
      name: 'Sulfur 80% WP',
      dosage: '2-3 grams per liter of water',
      frequency: 'Spray every 10-15 days',
      instructions: 'Apply during cool hours. Avoid spraying when temperature exceeds 32°C.'
    },
    watering: {
      schedule: 'Drip irrigation daily or alternate days',
      amount: '20-30 liters per vine per day',
      tips: 'Reduce humidity by ensuring good air circulation. Avoid overhead irrigation.'
    },
    stores: [
      { name: 'Grape Valley Supplies', location: 'Nashik', distance: '2 km' },
      { name: 'Vineyard Agro Center', location: 'Dindori', distance: '5 km' },
      { name: 'Nashik Grape Mart', location: 'Ozar', distance: '7 km' }
    ]
  },
  'corn-leaf-blight': {
    fertilizer: {
      name: 'Urea 46% N',
      type: 'Nitrogen Fertilizer',
      dosage: '100-120 kg per acre',
      frequency: 'Apply in split doses - at sowing, knee high, and tasseling'
    },
    pesticide: {
      name: 'Propiconazole 25% EC',
      dosage: '1 ml per liter of water',
      frequency: 'Spray at first symptom and repeat after 15 days',
      instructions: 'Spray thoroughly covering entire plant. Use sticker for better adhesion.'
    },
    watering: {
      schedule: 'Irrigation at critical stages - knee high, tasseling, grain filling',
      amount: '3-4 inches at each irrigation',
      tips: 'Ensure adequate moisture during tasseling and grain filling stages.'
    },
    stores: [
      { name: 'Corn Farmers Hub', location: 'Aurangabad', distance: '3 km' },
      { name: 'Grain Crop Supplies', location: 'Jalna', distance: '7 km' }
    ]
  },
  'wheat-rust': {
    fertilizer: {
      name: 'DAP 18:46:0',
      type: 'Phosphorus Rich Fertilizer',
      dosage: '100-125 kg per acre at sowing',
      frequency: 'Apply at sowing, followed by urea in two splits'
    },
    pesticide: {
      name: 'Propiconazole 25% EC',
      dosage: '1 ml per liter of water',
      frequency: 'Spray at first rust appearance and repeat after 15-20 days',
      instructions: 'Spray during early morning or evening. Cover all leaves thoroughly.'
    },
    watering: {
      schedule: 'Irrigation at CRI, tillering, jointing, flowering, milk and dough stages',
      amount: '2-3 inches at each irrigation',
      tips: 'Critical irrigation at CRI and flowering stages. Avoid water stress.'
    },
    stores: [
      { name: 'Wheat Belt Agro', location: 'Solapur', distance: '4 km' },
      { name: 'Grain Growers Store', location: 'Latur', distance: '6 km' }
    ]
  },
  'rice-blast': {
    fertilizer: {
      name: 'NPK 20:20:0:13',
      type: 'Complex Fertilizer with Sulfur',
      dosage: '125 kg per acre in split doses',
      frequency: 'Apply at basal, tillering, and panicle initiation'
    },
    pesticide: {
      name: 'Tricyclazole 75% WP',
      dosage: '0.6 grams per liter of water',
      frequency: 'Spray at tillering, booting, and flowering stages',
      instructions: 'Start preventive spray before disease appearance. Drain field before spraying.'
    },
    watering: {
      schedule: 'Maintain 2-3 inch standing water during vegetative stage',
      amount: 'Continuous flooding except during fertilizer application',
      tips: 'Drain water during pesticide application. Refill after 24 hours.'
    },
    stores: [
      { name: 'Rice Farmers Co-op', location: 'Nagpur', distance: '2.5 km' },
      { name: 'Paddy Cultivation Center', location: 'Wardha', distance: '5 km' },
      { name: 'Grain Market Agro', location: 'Amravati', distance: '8 km' }
    ]
  },
  'healthy': {
    fertilizer: {
      name: 'NPK 19:19:19',
      type: 'Balanced Complete Fertilizer',
      dosage: '2-3 grams per liter for foliar spray, or 100-150 kg per acre soil application',
      frequency: 'Apply every 15-20 days during growing season'
    },
    pesticide: null,
    watering: {
      schedule: 'Regular watering based on crop requirements',
      amount: '1-2 inches per week for most crops',
      tips: 'Maintain consistent moisture. Water deeply but less frequently to encourage deep root growth.'
    },
    stores: [
      { name: 'Local Agro Store', location: 'Nearby', distance: '1-3 km' },
      { name: 'Farmers Market', location: 'City Center', distance: '3-5 km' }
    ]
  }
};

export const getTreatmentPlan = (plantId, diseaseId) => {
  const key = diseaseId || 'healthy';
  return fertilizerTreatments[key] || fertilizerTreatments['healthy'];
};
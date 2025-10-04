export const plantsData = [
  {
    id: 'onion',
    name: { en: 'Onion', hi: 'प्याज', mr: 'कांदा' },
    scientificName: 'Allium cepa',
    diseases: [
      {
        id: 'onion-downy-mildew',
        name: { en: 'Downy Mildew', hi: 'डाउनी मिल्ड्यू', mr: 'डाऊनी मिल्ड्यू' },
        symptoms: {
          en: 'Pale green to yellow spots on leaves, white fungal growth on underside',
          hi: 'पत्तियों पर हल्के हरे से पीले धब्बे, नीचे की तरफ सफेद कवक वृद्धि',
          mr: 'पानांवर फिकट हिरव्या ते पिवळे डाग, खालच्या बाजूला पांढरी बुरशी वाढ'
        },
        treatment: {
          en: 'Apply copper-based fungicide spray. Remove infected plants. Improve air circulation.',
          hi: 'तांबे आधारित कवकनाशी स्प्रे लगाएं। संक्रमित पौधों को हटाएं। वायु परिसंचरण में सुधार करें।',
          mr: 'तांबे-आधारित बुरशीनाशक फवारणी करा. संक्रमित झाडे काढा. हवा परिसंचरण सुधारा.'
        }
      },
      {
        id: 'onion-purple-blotch',
        name: { en: 'Purple Blotch', hi: 'बैंगनी धब्बा', mr: 'जांभळा डाग' },
        symptoms: {
          en: 'Small white spots that turn purple with yellow halos',
          hi: 'छोटे सफेद धब्बे जो पीले हेलो के साथ बैंगनी हो जाते हैं',
          mr: 'लहान पांढरे डाग जे पिवळ्या हेलोसह जांभळे होतात'
        },
        treatment: {
          en: 'Use mancozeb fungicide. Practice crop rotation. Avoid overhead irrigation.',
          hi: 'मैनकोजेब कवकनाशी का उपयोग करें। फसल चक्र का अभ्यास करें। ओवरहेड सिंचाई से बचें।',
          mr: 'मॅनकोजेब बुरशीनाशक वापरा. पीक फेरबदल करा. ओव्हरहेड सिंचन टाळा.'
        }
      }
    ]
  },
  {
    id: 'tomato',
    name: { en: 'Tomato', hi: 'टमाटर', mr: 'टोमॅटो' },
    scientificName: 'Solanum lycopersicum',
    diseases: [
      {
        id: 'tomato-leaf-curl',
        name: { en: 'Leaf Curl Virus', hi: 'पत्ती कर्ल वायरस', mr: 'पान कर्ल व्हायरस' },
        symptoms: {
          en: 'Upward curling of leaves, stunted growth, yellowing, reduced fruit size',
          hi: 'पत्तियों का ऊपर की ओर मुड़ना, अवरुद्ध विकास, पीलापन, फल का आकार कम होना',
          mr: 'पानांचे वर कुरवाळणे, वाढ थांबणे, पिवळेपणा, फळांचा आकार कमी होणे'
        },
        treatment: {
          en: 'Control whitefly vectors with neem oil or insecticides. Remove infected plants. Use virus-resistant varieties.',
          hi: 'नीम के तेल या कीटनाशकों से सफेद मक्खी वेक्टर को नियंत्रित करें। संक्रमित पौधों को हटाएं। वायरस प्रतिरोधी किस्मों का उपयोग करें।',
          mr: 'नीम तेल किंवा कीटकनाशकांनी पांढऱ्या माशीचे नियंत्रण करा. संक्रमित झाडे काढा. व्हायरस-प्रतिरोधक जाती वापरा.'
        }
      },
      {
        id: 'tomato-early-blight',
        name: { en: 'Early Blight', hi: 'अर्ली ब्लाइट', mr: 'अर्ली ब्लाइट' },
        symptoms: {
          en: 'Dark brown spots with concentric rings on leaves',
          hi: 'पत्तियों पर संकेंद्रित छल्लों के साथ गहरे भूरे धब्बे',
          mr: 'पानांवर एकाग्र वलयांसह गडद तपकिरी डाग'
        },
        treatment: {
          en: 'Apply mancozeb fungicide. Remove affected leaves. Ensure proper plant spacing.',
          hi: 'मैनकोजेब कवकनाशी लगाएं। प्रभावित पत्तियों को हटाएं। उचित पौधे की दूरी सुनिश्चित करें।',
          mr: 'मॅनकोजेब बुरशीनाशक लावा. प्रभावित पाने काढा. योग्य अंतर ठेवा.'
        }
      }
    ]
  },
  {
    id: 'potato',
    name: { en: 'Potato', hi: 'आलू', mr: 'बटाटा' },
    scientificName: 'Solanum tuberosum',
    diseases: [
      {
        id: 'potato-late-blight',
        name: { en: 'Late Blight', hi: 'लेट ब्लाइट', mr: 'लेट ब्लाइट' },
        symptoms: {
          en: 'Dark brown spots on leaves, white mold on underside, rapid plant death',
          hi: 'पत्तियों पर गहरे भूरे रंग के धब्बे, नीचे की तरफ सफेद मोल्ड, तेजी से पौधे की मृत्यु',
          mr: 'पानांवर गडद तपकिरी डाग, खालच्या बाजूला पांढरी बुरशी, झटपट झाड मरण'
        },
        treatment: {
          en: 'Apply chlorothalonil or metalaxyl fungicide. Remove infected foliage immediately. Use resistant varieties.',
          hi: 'क्लोरोथैलोनिल या मेटालैक्सिल कवकनाशी लगाएं। संक्रमित पत्तियों को तुरंत हटाएं। प्रतिरोधी किस्मों का उपयोग करें।',
          mr: 'क्लोरोथॅलोनिल किंवा मेटालॅक्सिल बुरशीनाशक लावा. संक्रमित पाने लगेच काढा. प्रतिरोधक जाती वापरा.'
        }
      }
    ]
  },
  {
    id: 'grapes',
    name: { en: 'Grapes', hi: 'अंगूर', mr: 'द्राक्षे' },
    scientificName: 'Vitis vinifera',
    diseases: [
      {
        id: 'grapes-downy-mildew',
        name: { en: 'Downy Mildew', hi: 'डाउनी मिल्ड्यू', mr: 'डाऊनी मिल्ड्यू' },
        symptoms: {
          en: 'Yellow spots on upper leaf surface, white downy growth underneath',
          hi: 'ऊपरी पत्ती की सतह पर पीले धब्बे, नीचे सफेद रोएंदार वृद्धि',
          mr: 'वरच्या पानाच्या पृष्ठभागावर पिवळे डाग, खाली पांढरी मऊ वाढ'
        },
        treatment: {
          en: 'Spray copper hydroxide or metalaxyl. Improve canopy ventilation. Remove infected leaves.',
          hi: 'कॉपर हाइड्रॉक्साइड या मेटालैक्सिल स्प्रे करें। canopy वेंटिलेशन में सुधार करें। संक्रमित पत्तियों को हटाएं।',
          mr: 'कॉपर हायड्रॉक्साइड किंवा मेटालॅक्सिल फवारणी करा. छत वायुवीजन सुधारा. संक्रमित पाने काढा.'
        }
      },
      {
        id: 'grapes-powdery-mildew',
        name: { en: 'Powdery Mildew', hi: 'पाउडरी मिल्ड्यू', mr: 'पावडरी मिल्ड्यू' },
        symptoms: {
          en: 'White powdery coating on leaves, shoots, and berries',
          hi: 'पत्तियों, shoots, और berries पर सफेद पाउडरी कोटिंग',
          mr: 'पाने, कोंब आणि बेरीजवर पांढरे पावडर आवरण'
        },
        treatment: {
          en: 'Apply sulfur or myclobutanil fungicide. Ensure good air circulation. Prune dense foliage.',
          hi: 'सल्फर या माइक्लोब्यूटानिल कवकनाशी लगाएं। अच्छा वायु परिसंचरण सुनिश्चित करें। घने पत्तों की छंटाई करें।',
          mr: 'सल्फर किंवा मायक्लोब्युटॅनिल बुरशीनाशक लावा. चांगले हवा परिसंचरण सुनिश्चित करा. दाट पाने काढून टाका.'
        }
      }
    ]
  },
  {
    id: 'orange',
    name: { en: 'Orange', hi: 'संतरा', mr: 'संत्रा' },
    scientificName: 'Citrus sinensis',
    diseases: [
      {
        id: 'orange-citrus-canker',
        name: { en: 'Citrus Canker', hi: 'सिट्रस कैंकर', mr: 'सिट्रस कॅन्कर' },
        symptoms: {
          en: 'Raised brown lesions with yellow halos on leaves, stems, and fruit',
          hi: 'पत्तियों, तनों और फलों पर पीले हेलो के साथ उभरे हुए भूरे घाव',
          mr: 'पाने, देठ आणि फळांवर पिवळ्या हेलोसह उंचावलेले तपकिरी जखम'
        },
        treatment: {
          en: 'Apply copper-based bactericides. Prune infected branches. Quarantine new plants.',
          hi: 'तांबे आधारित जीवाणुनाशक लगाएं। संक्रमित शाखाओं की छंटाई करें। नए पौधों को संगरोध करें।',
          mr: 'तांबे-आधारित जीवाणूनाशक लावा. संक्रमित फांद्या काढा. नवीन झाडे अलग ठेवा.'
        }
      }
    ]
  },
  {
    id: 'corn',
    name: { en: 'Corn', hi: 'मक्का', mr: 'मका' },
    scientificName: 'Zea mays',
    diseases: [
      {
        id: 'corn-leaf-blight',
        name: { en: 'Northern Leaf Blight', hi: 'नॉर्दर्न लीफ ब्लाइट', mr: 'नॉर्दर्न लीफ ब्लाइट' },
        symptoms: {
          en: 'Long, cigar-shaped gray-green lesions on leaves',
          hi: 'पत्तियों पर लंबे, सिगार के आकार के भूरे-हरे घाव',
          mr: 'पानांवर लांब, सिगारच्या आकाराचे राखाडी-हिरवे जखम'
        },
        treatment: {
          en: 'Apply azoxystrobin fungicide. Plant resistant hybrids. Practice crop rotation.',
          hi: 'एज़ोक्सीस्ट्रोबिन कवकनाशी लगाएं। प्रतिरोधी हाइब्रिड लगाएं। फसल चक्र का अभ्यास करें।',
          mr: 'अॅझॉक्सिस्ट्रोबिन बुरशीनाशक लावा. प्रतिरोधक संकर लावा. पीक फेरबदल करा.'
        }
      },
      {
        id: 'corn-rust',
        name: { en: 'Common Rust', hi: 'कॉमन रस्ट', mr: 'कॉमन गंज' },
        symptoms: {
          en: 'Small circular to elongated reddish-brown pustules on leaves',
          hi: 'पत्तियों पर छोटे गोलाकार से लंबे लाल-भूरे pustules',
          mr: 'पानांवर लहान गोलाकार ते लांबट लाल-तपकिरी फोड'
        },
        treatment: {
          en: 'Apply triazole fungicides. Use resistant varieties. Monitor fields regularly.',
          hi: 'ट्राइज़ोल कवकनाशी लगाएं। प्रतिरोधी किस्मों का उपयोग करें। नियमित रूप से खेतों की निगरानी करें।',
          mr: 'ट्रायझोल बुरशीनाशक लावा. प्रतिरोधक जाती वापरा. नियमितपणे शेतांचे निरीक्षण करा.'
        }
      }
    ]
  },
  {
    id: 'wheat',
    name: { en: 'Wheat', hi: 'गेहूं', mr: 'गहू' },
    scientificName: 'Triticum aestivum',
    diseases: [
      {
        id: 'wheat-rust',
        name: { en: 'Rust', hi: 'रस्ट', mr: 'गंज' },
        symptoms: {
          en: 'Orange-brown pustules on leaves and stems, reduced grain quality',
          hi: 'पत्तियों और तनों पर नारंगी-भूरे रंग के pustules, अनाज की गुणवत्ता में कमी',
          mr: 'पाने आणि देठांवर नारिंगी-तपकिरी फोड, धान्याची गुणवत्ता कमी होणे'
        },
        treatment: {
          en: 'Apply propiconazole or tebuconazole fungicide. Use resistant varieties. Monitor fields regularly.',
          hi: 'प्रोपिकोनाजोल या टेबुकोनाज़ोल कवकनाशी लगाएं। प्रतिरोधी किस्मों का उपयोग करें। नियमित रूप से खेतों की निगरानी करें।',
          mr: 'प्रोपिकोनाझोल किंवा टेबुकोनाझोल बुरशीनाशक लावा. प्रतिरोधक जाती वापरा. नियमितपणे शेतांचे निरीक्षण करा.'
        }
      }
    ]
  },
  {
    id: 'rice',
    name: { en: 'Rice', hi: 'चावल', mr: 'तांदूळ' },
    scientificName: 'Oryza sativa',
    diseases: [
      {
        id: 'rice-blast',
        name: { en: 'Blast Disease', hi: 'ब्लास्ट रोग', mr: 'ब्लास्ट रोग' },
        symptoms: {
          en: 'Diamond-shaped lesions with gray centers on leaves, neck rot on stems',
          hi: 'पत्तियों पर ग्रे केंद्र के साथ हीरे के आकार के घाव, तनों पर गर्दन सड़न',
          mr: 'पानांवर राखाडी मध्यभागासह हिरा-आकाराचे जखम, देठांवर मान सडणे'
        },
        treatment: {
          en: 'Apply tricyclazole fungicide. Use certified disease-free seeds. Maintain proper water management.',
          hi: 'ट्राइसाइक्लाज़ोल कवकनाशी लगाएं। प्रमाणित रोग-मुक्त बीज का उपयोग करें। उचित जल प्रबंधन बनाए रखें।',
          mr: 'ट्रायसायक्लाझोल बुरशीनाशक लावा. प्रमाणित रोगमुक्त बियाणे वापरा. योग्य पाणी व्यवस्थापन राखा.'
        }
      },
      {
        id: 'rice-brown-spot',
        name: { en: 'Brown Spot', hi: 'ब्राउन स्पॉट', mr: 'तपकिरी डाग' },
        symptoms: {
          en: 'Circular brown spots with yellow halos on leaves',
          hi: 'पत्तियों पर पीले हेलो के साथ गोलाकार भूरे धब्बे',
          mr: 'पानांवर पिवळ्या हेलोसह गोलाकार तपकिरी डाग'
        },
        treatment: {
          en: 'Apply mancozeb fungicide. Improve soil fertility. Ensure balanced fertilization.',
          hi: 'मैनकोजेब कवकनाशी लगाएं। मिट्टी की उर्वरता में सुधार करें। संतुलित उर्वरीकरण सुनिश्चित करें।',
          mr: 'मॅनकोजेब बुरशीनाशक लावा. जमिनीची सुपीकता सुधारा. संतुलित खत सुनिश्चित करा.'
        }
      }
    ]
  }
];

export const getRandomDetection = () => {
  const plant = plantsData[Math.floor(Math.random() * plantsData.length)];
  const isHealthy = Math.random() > 0.4;
  const disease = isHealthy ? null : plant.diseases[Math.floor(Math.random() * plant.diseases.length)];
  const confidence = 0.75 + Math.random() * 0.24;

  return {
    plant,
    disease,
    status: isHealthy ? 'healthy' : 'diseased',
    confidence: confidence.toFixed(2)
  };
};
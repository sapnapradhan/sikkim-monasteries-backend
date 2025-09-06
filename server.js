// server.js - Clean working version

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic routes (no parameters for now)
app.get('/', (req, res) => {
  res.json({
    message: "🏔️ Sacred Sikkim Backend is Running!",
    status: "SUCCESS",
    timestamp: new Date().toISOString(),
    endpoints: [
      "GET / - This welcome message",
      "GET /test - Test endpoint",
      "GET /monasteries - Get all monasteries",
      "GET /monastery/1 - Get Rumtek Monastery",
      "GET /monastery/2 - Get Pemayangtse Monastery"
    ]
  });
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({
    message: "✅ Backend test successful!",
    data: {
      server: "Working perfectly",
      api: "Ready for frontend"
    }
  });
});

// Get all monasteries (simple route)
app.get('/monasteries', (req, res) => {
  const monasteries = [
    {
      id: 1,
      name: "Rumtek Monastery",
      description: "The Dharma Chakra Centre, largest monastery in Sikkim",
      location: {
        district: "East Sikkim",
        address: "24 km from Gangtok",
        coordinates: {
          latitude: 27.3389,
          longitude: 88.5583
        }
      },
      tradition: "Kagyu",
      founded: 1966,
      visitingInfo: {
        timings: "6:00 AM - 6:00 PM",
        entryFee: "Free",
        bestTime: "March to May, October to November"
      },
      features: {
        hasVR: true,
        hasAudio: true,
        hasLiveStream: true
      },
      stats: {
        visitCount: 1250,
        rating: 4.8
      }
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      description: "Perfect Sublime Lotus monastery in West Sikkim",
      location: {
        district: "West Sikkim",
        address: "Pelling, West Sikkim",
        coordinates: {
          latitude: 27.2046,
          longitude: 88.2135
        }
      },
      tradition: "Nyingma",
      founded: 1705,
      visitingInfo: {
        timings: "5:00 AM - 7:00 PM",
        entryFee: "₹10 for Indians",
        bestTime: "October to March"
      },
      features: {
        hasVR: false,
        hasAudio: true,
        hasLiveStream: false
      },
      stats: {
        visitCount: 890,
        rating: 4.6
      }
    },
    {
      id: 3,
      name: "Enchey Monastery",
      description: "The Solitary Monastery above Gangtok",
      location: {
        district: "East Sikkim",
        address: "Gangtok, East Sikkim",
        coordinates: {
          latitude: 27.3314,
          longitude: 88.6138
        }
      },
      tradition: "Nyingma",
      founded: 1909,
      visitingInfo: {
        timings: "6:00 AM - 6:00 PM",
        entryFee: "Free",
        bestTime: "All year round"
      },
      features: {
        hasVR: true,
        hasAudio: false,
        hasLiveStream: true
      },
      stats: {
        visitCount: 670,
        rating: 4.4
      }
    }
  ];

  res.json({
    success: true,
    count: monasteries.length,
    message: `Found ${monasteries.length} monasteries`,
    data: monasteries
  });
});

// Get specific monasteries (using simple routes instead of parameters)
app.get('/monastery/1', (req, res) => {
  const rumtek = {
    id: 1,
    name: "Rumtek Monastery",
    description: "The Dharma Chakra Centre, largest monastery in Sikkim and seat of the Karmapa",
    location: {
      district: "East Sikkim",
      address: "24 km from Gangtok",
      coordinates: { latitude: 27.3389, longitude: 88.5583 }
    },
    tradition: "Kagyu",
    founded: 1966,
    significance: "Seat of the 16th Karmapa, center of Kagyu Buddhism",
    visitingInfo: {
      timings: "6:00 AM - 6:00 PM",
      entryFee: "Free",
      bestTime: "March to May, October to November",
      guidelines: [
        "Remove shoes before entering main hall",
        "Maintain silence during prayers",
        "Photography restrictions apply"
      ]
    },
    features: {
      hasVR: true,
      hasAudio: true,
      hasLiveStream: true
    },
    stats: {
      visitCount: 1250,
      rating: 4.8,
      reviewCount: 156
    }
  };

  res.json({
    success: true,
    message: "Rumtek Monastery details",
    data: rumtek
  });
});

app.get('/monastery/2', (req, res) => {
  const pemayangtse = {
    id: 2,
    name: "Pemayangtse Monastery",
    description: "Perfect Sublime Lotus monastery, one of the oldest in Sikkim",
    location: {
      district: "West Sikkim",
      address: "Pelling, West Sikkim",
      coordinates: { latitude: 27.2046, longitude: 88.2135 }
    },
    tradition: "Nyingma",
    founded: 1705,
    significance: "Second oldest monastery in Sikkim, pure monks only",
    visitingInfo: {
      timings: "5:00 AM - 7:00 PM",
      entryFee: "₹10 for Indians, ₹50 for foreigners",
      bestTime: "October to March",
      guidelines: [
        "Pure monks monastery - strict entry rules",
        "No leather items allowed",
        "Photography fee applies"
      ]
    },
    features: {
      hasVR: false,
      hasAudio: true,
      hasLiveStream: false
    },
    stats: {
      visitCount: 890,
      rating: 4.6,
      reviewCount: 98
    }
  };

  res.json({
    success: true,
    message: "Pemayangtse Monastery details",
    data: pemayangtse
  });
});

app.get('/monastery/3', (req, res) => {
  const enchey = {
    id: 3,
    name: "Enchey Monastery",
    description: "The Solitary Monastery above Gangtok with mystical powers",
    location: {
      district: "East Sikkim",
      address: "Enchey Hill, Gangtok",
      coordinates: { latitude: 27.3314, longitude: 88.6138 }
    },
    tradition: "Nyingma",
    founded: 1909,
    significance: "Built on tantric site, known for spiritual powers",
    visitingInfo: {
      timings: "6:00 AM - 6:00 PM",
      entryFee: "Free",
      bestTime: "All year round",
      guidelines: [
        "Peaceful environment maintained",
        "Respect ongoing prayers"
      ]
    },
    features: {
      hasVR: true,
      hasAudio: false,
      hasLiveStream: true
    },
    stats: {
      visitCount: 670,
      rating: 4.4,
      reviewCount: 67
    }
  };

  res.json({
    success: true,
    message: "Enchey Monastery details",
    data: enchey
  });
});

// Search functionality (simple approach)
app.get('/search/rumtek', (req, res) => {
  res.json({
    success: true,
    query: "rumtek",
    message: "Search results for 'rumtek'",
    data: [{
      id: 1,
      name: "Rumtek Monastery",
      tradition: "Kagyu",
      district: "East Sikkim",
      match: "name"
    }]
  });
});

app.get('/search/kagyu', (req, res) => {
  res.json({
    success: true,
    query: "kagyu",
    message: "Search results for 'kagyu'",
    data: [{
      id: 1,
      name: "Rumtek Monastery",
      tradition: "Kagyu",
      district: "East Sikkim",
      match: "tradition"
    }]
  });
});

app.get('/search/nyingma', (req, res) => {
  res.json({
    success: true,
    query: "nyingma",
    message: "Search results for 'nyingma'",
    data: [
      {
        id: 2,
        name: "Pemayangtse Monastery",
        tradition: "Nyingma",
        district: "West Sikkim"
      },
      {
        id: 3,
        name: "Enchey Monastery", 
        tradition: "Nyingma",
        district: "East Sikkim"
      }
    ]
  });
});

// District filter routes
app.get('/district/east', (req, res) => {
  res.json({
    success: true,
    district: "East Sikkim",
    data: [
      { id: 1, name: "Rumtek Monastery", tradition: "Kagyu" },
      { id: 3, name: "Enchey Monastery", tradition: "Nyingma" }
    ]
  });
});

app.get('/district/west', (req, res) => {
  res.json({
    success: true,
    district: "West Sikkim",
    data: [
      { id: 2, name: "Pemayangtse Monastery", tradition: "Nyingma" }
    ]
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      'GET /',
      'GET /test',
      'GET /monasteries',
      'GET /monastery/1',
      'GET /monastery/2',
      'GET /monastery/3',
      'GET /search/rumtek',
      'GET /district/east'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n🚀 SACRED SIKKIM API STARTED SUCCESSFULLY!');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🧪 Test: http://localhost:${PORT}/test`);
  console.log(`🏛️ All monasteries: http://localhost:${PORT}/monasteries`);
  console.log(`🔍 Rumtek details: http://localhost:${PORT}/monastery/1`);
  console.log(`🔍 Search Kagyu: http://localhost:${PORT}/search/kagyu`);
  console.log('💡 Press Ctrl+C to stop server\n');
});
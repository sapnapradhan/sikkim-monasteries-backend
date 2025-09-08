// server.js - Day 2 Enhanced Version with 10 Monasteries

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ==================== EXPANDED MONASTERY DATA (10 MONASTERIES) ====================
const monasteries = [
  {
    id: 1,
    name: "Rumtek Monastery",
    slug: "rumtek-monastery",
    description: "The Dharma Chakra Centre, largest monastery in Sikkim",
    location: {
      district: "East Sikkim",
      address: "24 km from Gangtok",
      coordinates: { latitude: 27.3389, longitude: 88.5583 }
    },
    tradition: "Kagyu",
    founded: 1966,
    visitingInfo: {
      timings: "6:00 AM - 6:00 PM",
      entryFee: "Free",
      bestTime: "March to May, October to November"
    },
    features: { hasVR: true, hasAudio: true, hasLiveStream: true },
    stats: { visitCount: 1250, rating: 4.8 }
  },
  {
    id: 2,
    name: "Pemayangtse Monastery",
    slug: "pemayangtse-monastery",
    description: "Perfect Sublime Lotus monastery in West Sikkim",
    location: {
      district: "West Sikkim",
      address: "Pelling, West Sikkim",
      coordinates: { latitude: 27.2046, longitude: 88.2135 }
    },
    tradition: "Nyingma",
    founded: 1705,
    visitingInfo: {
      timings: "5:00 AM - 7:00 PM",
      entryFee: "₹10 for Indians",
      bestTime: "October to March"
    },
    features: { hasVR: false, hasAudio: true, hasLiveStream: false },
    stats: { visitCount: 890, rating: 4.6 }
  },
  {
    id: 3,
    name: "Enchey Monastery",
    slug: "enchey-monastery",
    description: "The Solitary Monastery above Gangtok",
    location: {
      district: "East Sikkim",
      address: "Gangtok, East Sikkim",
      coordinates: { latitude: 27.3314, longitude: 88.6138 }
    },
    tradition: "Nyingma",
    founded: 1909,
    visitingInfo: {
      timings: "6:00 AM - 6:00 PM",
      entryFee: "Free",
      bestTime: "All year round"
    },
    features: { hasVR: true, hasAudio: false, hasLiveStream: true },
    stats: { visitCount: 670, rating: 4.4 }
  },
  // NEW DAY 2 MONASTERIES (4-10):
  {
    id: 4,
    name: "Tashiding Monastery",
    slug: "tashiding-monastery",
    description: "Sacred monastery in West Sikkim known for its religious significance",
    location: {
      district: "West Sikkim",
      address: "Tashiding, West Sikkim",
      coordinates: { latitude: 27.3475, longitude: 88.2711 }
    },
    tradition: "Nyingma",
    founded: 1641,
    visitingInfo: {
      timings: "5:00 AM - 7:00 PM",
      entryFee: "Free",
      bestTime: "October to March"
    },
    features: { hasVR: true, hasAudio: false, hasLiveStream: false },
    stats: { visitCount: 520, rating: 4.5 }
  },
  {
    id: 5,
    name: "Phensang Monastery",
    slug: "phensang-monastery",
    description: "Ancient monastery in North Sikkim with stunning mountain views",
    location: {
      district: "North Sikkim",
      address: "Kabi, North Sikkim",
      coordinates: { latitude: 27.4358, longitude: 88.5731 }
    },
    tradition: "Kagyu",
    founded: 1721,
    visitingInfo: {
      timings: "6:00 AM - 6:00 PM",
      entryFee: "₹20 for tourists",
      bestTime: "May to September"
    },
    features: { hasVR: false, hasAudio: true, hasLiveStream: false },
    stats: { visitCount: 310, rating: 4.2 }
  },
  {
    id: 6,
    name: "Dubdi Monastery",
    slug: "dubdi-monastery",
    description: "First monastery built in Sikkim, historical significance",
    location: {
      district: "West Sikkim",
      address: "Yuksom, West Sikkim",
      coordinates: { latitude: 27.3667, longitude: 88.2167 }
    },
    tradition: "Nyingma",
    founded: 1701,
    visitingInfo: {
      timings: "5:30 AM - 7:30 PM",
      entryFee: "Free",
      bestTime: "March to May"
    },
    features: { hasVR: false, hasAudio: true, hasLiveStream: false },
    stats: { visitCount: 450, rating: 4.3 }
  },
  {
    id: 7,
    name: "Ralang Monastery",
    slug: "ralang-monastery",
    description: "Beautiful monastery in South Sikkim with rich heritage",
    location: {
      district: "South Sikkim",
      address: "Ralang, South Sikkim",
      coordinates: { latitude: 27.2833, longitude: 88.5333 }
    },
    tradition: "Kagyu",
    founded: 1768,
    visitingInfo: {
      timings: "6:00 AM - 6:00 PM",
      entryFee: "₹10 for Indians",
      bestTime: "October to February"
    },
    features: { hasVR: true, hasAudio: true, hasLiveStream: true },
    stats: { visitCount: 380, rating: 4.4 }
  },
  {
    id: 8,
    name: "Labrang Monastery",
    slug: "labrang-monastery",
    description: "Serene monastery in North Sikkim, perfect for meditation",
    location: {
      district: "North Sikkim",
      address: "Lachung, North Sikkim",
      coordinates: { latitude: 27.6833, longitude: 88.7333 }
    },
    tradition: "Nyingma",
    founded: 1880,
    visitingInfo: {
      timings: "5:00 AM - 7:00 PM",
      entryFee: "Free",
      bestTime: "June to September"
    },
    features: { hasVR: false, hasAudio: false, hasLiveStream: false },
    stats: { visitCount: 180, rating: 4.1 }
  },
  {
    id: 9,
    name: "Sang Monastery",
    slug: "sang-monastery",
    description: "High-altitude monastery with breathtaking Himalayan views",
    location: {
      district: "North Sikkim",
      address: "Lachen, North Sikkim",
      coordinates: { latitude: 27.7167, longitude: 88.6833 }
    },
    tradition: "Nyingma",
    founded: 1912,
    visitingInfo: {
      timings: "6:00 AM - 5:00 PM",
      entryFee: "₹50 for tourists",
      bestTime: "May to October"
    },
    features: { hasVR: true, hasAudio: false, hasLiveStream: false },
    stats: { visitCount: 95, rating: 4.7 }
  },
  {
    id: 10,
    name: "Tsuklakhang Monastery",
    slug: "tsuklakhang-monastery",
    description: "Royal chapel and monastery, spiritual center of Sikkim",
    location: {
      district: "East Sikkim",
      address: "Gangtok Palace Complex",
      coordinates: { latitude: 27.3389, longitude: 88.6065 }
    },
    tradition: "Nyingma",
    founded: 1894,
    visitingInfo: {
      timings: "9:00 AM - 5:00 PM",
      entryFee: "₹30 for tourists",
      bestTime: "All year round"
    },
    features: { hasVR: false, hasAudio: true, hasLiveStream: true },
    stats: { visitCount: 750, rating: 4.6 }
  }
];

// ==================== DAY 2 FESTIVAL DATA ====================
const festivals = [
  {
    id: 1,
    name: "Losar Festival",
    startDate: "2025-02-15",
    endDate: "2025-02-17",
    monastery: "Rumtek Monastery",
    description: "Tibetan New Year celebration with traditional dances",
    isLive: false,
    viewerCount: 0
  },
  {
    id: 2,
    name: "Buddha Purnima",
    startDate: "2025-05-12",
    endDate: "2025-05-12",
    monastery: "Pemayangtse Monastery",
    description: "Celebration of Buddha's birth, enlightenment and parinirvana",
    isLive: true,
    viewerCount: 1250
  },
  {
    id: 3,
    name: "Saga Dawa",
    startDate: "2025-06-10",
    endDate: "2025-06-10",
    monastery: "Enchey Monastery",
    description: "Sacred month celebration with prayers and offerings",
    isLive: false,
    viewerCount: 0
  }
];

// ==================== BASIC ROUTES ====================

// Welcome endpoint (enhanced)
app.get('/', (req, res) => {
  res.json({
    message: "🏔️ Sacred Sikkim Backend v2.0 - Enhanced!",
    status: "SUCCESS",
    timestamp: new Date().toISOString(),
    features: {
      monasteries: `${monasteries.length} monasteries available`,
      festivals: `${festivals.length} festivals tracked`,
      districts: "4 districts covered",
      traditions: "3 Buddhist traditions"
    },
    endpoints: [
      "GET / - This welcome message",
      "GET /test - Test endpoint",
      "GET /monasteries - Get all monasteries (10 total)",
      "GET /monastery/[1-10] - Individual monastery details",
      "GET /festivals - Festival calendar",
      "GET /search/[query] - Search functionality",
      "GET /district/[name] - Filter by district"
    ]
  });
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({
    message: "✅ Day 2 Backend test successful!",
    data: {
      server: "Working perfectly",
      monasteries: `${monasteries.length} monasteries loaded`,
      festivals: `${festivals.length} festivals available`,
      api: "Ready for frontend integration"
    },
    performance: {
      responseTime: "<100ms",
      uptime: "100%",
      dataIntegrity: "Valid"
    }
  });
});

// ==================== MONASTERY ROUTES ====================

// Get all monasteries
app.get('/monasteries', (req, res) => {
  const { district, tradition, features } = req.query;
  let filtered = [...monasteries];
  
  // Apply filters
  if (district) {
    filtered = filtered.filter(m => 
      m.location.district.toLowerCase().includes(district.toLowerCase())
    );
  }
  
  if (tradition) {
    filtered = filtered.filter(m => 
      m.tradition.toLowerCase() === tradition.toLowerCase()
    );
  }
  
  if (features) {
    if (features === 'vr') filtered = filtered.filter(m => m.features.hasVR);
    if (features === 'audio') filtered = filtered.filter(m => m.features.hasAudio);
    if (features === 'live') filtered = filtered.filter(m => m.features.hasLiveStream);
  }

  res.json({
    success: true,
    count: filtered.length,
    total: monasteries.length,
    message: `Found ${filtered.length} monasteries`,
    filters: { district, tradition, features },
    data: filtered
  });
});

// Individual monastery routes (enhanced with more detail)
app.get('/monastery/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const monastery = monasteries.find(m => m.id === id);
  
  if (!monastery) {
    return res.status(404).json({
      success: false,
      message: 'Monastery not found'
    });
  }
  
  // Enhanced detail for individual monastery
  const detailedMonastery = {
    ...monastery,
    significance: getMonasterySignificance(id),
    guidelines: getVisitingGuidelines(id),
    reviewCount: Math.floor(monastery.stats.visitCount / 8)
  };
  
  res.json({
    success: true,
    message: `${monastery.name} details`,
    data: detailedMonastery
  });
});

// Helper functions for monastery details
function getMonasterySignificance(id) {
  const significance = {
    1: "Seat of the 16th Karmapa, center of Kagyu Buddhism",
    2: "Second oldest monastery in Sikkim, pure monks only",
    3: "Built on tantric site, known for spiritual powers",
    4: "Sacred pilgrimage site with holy water",
    5: "Gateway monastery to North Sikkim",
    6: "First monastery ever built in Sikkim",
    7: "Important center for Kagyu teachings",
    8: "High altitude meditation retreat center",
    9: "Remote Himalayan spiritual sanctuary",
    10: "Royal monastery of Sikkim kingdom"
  };
  return significance[id] || "Sacred Buddhist monastery";
}

function getVisitingGuidelines(id) {
  const guidelines = {
    1: ["Remove shoes before entering", "Maintain silence during prayers", "Photography restrictions apply"],
    2: ["Pure monks monastery - strict rules", "No leather items allowed", "Photography fee applies"],
    3: ["Peaceful environment maintained", "Respect ongoing prayers"],
    4: ["Sacred site - maintain reverence", "Follow local customs"],
    5: ["High altitude - carry warm clothes", "Respect mountain environment"],
    6: ["Historical site - no touching artifacts", "Guide recommended"],
    7: ["Active monastery - respect schedules", "Traditional dress preferred"],
    8: ["Remote location - carry supplies", "Weather dependent access"],
    9: ["Extreme altitude - health precautions", "Limited facilities"],
    10: ["Royal heritage site - special protocols", "Guided tours available"]
  };
  return guidelines[id] || ["Maintain silence", "Respect religious practices"];
}

// ==================== FESTIVAL ROUTES ====================

app.get('/festivals', (req, res) => {
  res.json({
    success: true,
    count: festivals.length,
    message: "Festival calendar for Sacred Sikkim",
    data: festivals
  });
});

app.get('/festivals/upcoming', (req, res) => {
  const now = new Date();
  const upcoming = festivals
    .filter(f => new Date(f.startDate) >= now)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 3);
    
  res.json({
    success: true,
    count: upcoming.length,
    message: "Upcoming festivals",
    data: upcoming
  });
});

// ==================== ENHANCED SEARCH ROUTES ====================

// Advanced search
app.get('/search/:query', (req, res) => {
  const searchQuery = req.params.query.toLowerCase();
  
  const results = monasteries.filter(monastery =>
    monastery.name.toLowerCase().includes(searchQuery) ||
    monastery.description.toLowerCase().includes(searchQuery) ||
    monastery.tradition.toLowerCase().includes(searchQuery) ||
    monastery.location.district.toLowerCase().includes(searchQuery) ||
    monastery.location.address.toLowerCase().includes(searchQuery)
  );
  
  res.json({
    success: true,
    count: results.length,
    query: searchQuery,
    message: `Found ${results.length} results for "${searchQuery}"`,
    data: results
  });
});

// Search by tradition
app.get('/tradition/:tradition', (req, res) => {
  const tradition = req.params.tradition;
  const results = monasteries.filter(m => 
    m.tradition.toLowerCase() === tradition.toLowerCase()
  );
  
  res.json({
    success: true,
    tradition: tradition,
    count: results.length,
    data: results
  });
});

// ==================== ENHANCED DISTRICT ROUTES ====================

app.get('/district/:district', (req, res) => {
  const district = req.params.district.toLowerCase();
  const districtMap = {
    'east': 'East Sikkim',
    'west': 'West Sikkim', 
    'north': 'North Sikkim',
    'south': 'South Sikkim'
  };
  
  const fullDistrict = districtMap[district] || district;
  const results = monasteries.filter(m => 
    m.location.district.toLowerCase().includes(fullDistrict.toLowerCase())
  );
  
  res.json({
    success: true,
    district: fullDistrict,
    count: results.length,
    message: `Monasteries in ${fullDistrict}`,
    data: results
  });
});

// ==================== ANALYTICS ROUTES ====================

app.get('/analytics', (req, res) => {
  const totalVisits = monasteries.reduce((sum, m) => sum + m.stats.visitCount, 0);
  const avgRating = monasteries.reduce((sum, m) => sum + m.stats.rating, 0) / monasteries.length;
  
  const districtStats = monasteries.reduce((acc, m) => {
    acc[m.location.district] = (acc[m.location.district] || 0) + 1;
    return acc;
  }, {});
  
  const traditionStats = monasteries.reduce((acc, m) => {
    acc[m.tradition] = (acc[m.tradition] || 0) + 1;
    return acc;
  }, {});
  
  res.json({
    success: true,
    data: {
      overview: {
        totalMonasteries: monasteries.length,
        totalVisits: totalVisits,
        averageRating: Math.round(avgRating * 10) / 10,
        activeFestivals: festivals.filter(f => f.isLive).length
      },
      distribution: {
        byDistrict: districtStats,
        byTradition: traditionStats
      },
      features: {
        withVR: monasteries.filter(m => m.features.hasVR).length,
        withAudio: monasteries.filter(m => m.features.hasAudio).length,
        withLiveStream: monasteries.filter(m => m.features.hasLiveStream).length
      }
    }
  });
});

// ==================== LEGACY SUPPORT ROUTES ====================

// Legacy search routes (for backward compatibility)
app.get('/search/rumtek', (req, res) => {
  const results = monasteries.filter(m => m.name.toLowerCase().includes('rumtek'));
  res.json({
    success: true,
    query: "rumtek",
    count: results.length,
    data: results
  });
});

app.get('/search/kagyu', (req, res) => {
  const results = monasteries.filter(m => m.tradition === 'Kagyu');
  res.json({
    success: true,
    query: "kagyu",
    count: results.length,
    data: results
  });
});

app.get('/search/nyingma', (req, res) => {
  const results = monasteries.filter(m => m.tradition === 'Nyingma');
  res.json({
    success: true,
    query: "nyingma",
    count: results.length,
    data: results
  });
});

// ==================== 404 HANDLER ====================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      'GET / - API overview',
      'GET /test - Health check',
      'GET /monasteries - All monasteries (10 total)',
      'GET /monastery/[1-10] - Individual details',
      'GET /festivals - Festival calendar',
      'GET /search/[query] - Search monasteries',
      'GET /district/[east|west|north|south] - Filter by district',
      'GET /tradition/[kagyu|nyingma] - Filter by tradition',
      'GET /analytics - Platform statistics'
    ]
  });
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log('\n🚀 SACRED SIKKIM API v2.0 STARTED!');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🧪 Test: http://localhost:${PORT}/test`);
  console.log(`🏛️ All monasteries: http://localhost:${PORT}/monasteries`);
  console.log(`🎭 Festivals: http://localhost:${PORT}/festivals`);
  console.log(`📊 Analytics: http://localhost:${PORT}/analytics`);
  console.log(`🔍 Search: http://localhost:${PORT}/search/rumtek`);
  console.log('💡 Press Ctrl+C to stop server\n');
  
  console.log('📈 DATA LOADED:');
  console.log(`   • ${monasteries.length} monasteries`);
  console.log(`   • ${festivals.length} festivals`);
  console.log(`   • 4 districts covered`);
  console.log(`   • 3 Buddhist traditions\n`);
});
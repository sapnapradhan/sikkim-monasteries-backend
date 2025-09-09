// demo/demo-data.js - Demo data and scenarios

const demoScenarios = {
  // Scenario 1: Tourist exploring monasteries
  touristJourney: [
    { action: 'GET', url: '/api/monasteries', description: 'Browse all monasteries' },
    { action: 'GET', url: '/api/monasteries/1', description: 'View Rumtek details' },
    { action: 'POST', url: '/api/auth/register', description: 'Create account' },
    { action: 'POST', url: '/api/auth/visit/1', description: 'Mark visit to Rumtek' },
    { action: 'GET', url: '/api/auth/profile', description: 'Check earned badges' }
  ],

  // Scenario 2: Festival enthusiast 
  festivalLover: [
    { action: 'GET', url: '/api/festivals', description: 'Check festival calendar' },
    { action: 'GET', url: '/api/festivals/upcoming', description: 'See upcoming events' },
    { action: 'GET', url: '/api/search/losar', description: 'Search Losar festival' }
  ],

  // Scenario 3: Research scholar
  researcher: [
    { action: 'GET', url: '/api/monasteries?tradition=nyingma', description: 'Filter by tradition' },
    { action: 'GET', url: '/api/search/founded', description: 'Search by historical period' },
    { action: 'GET', url: '/api/analytics', description: 'Access research data' }
  ],

  // Scenario 4: Admin monitoring
  adminDashboard: [
    { action: 'POST', url: '/api/auth/login', description: 'Admin login' },
    { action: 'GET', url: '/api/admin/dashboard', description: 'View dashboard' },
    { action: 'GET', url: '/api/admin/users', description: 'User management' },
    { action: 'GET', url: '/api/admin/analytics', description: 'Advanced analytics' }
  ]
};

const demoUsers = [
  {
    name: "Sarah Johnson",
    email: "sarah@demo.com",
    password: "demo123",
    type: "tourist",
    visitedMonasteries: [1, 2],
    badges: ["Explorer", "Culture Seeker"]
  },
  {
    name: "Dr. Tenzin Norbu", 
    email: "tenzin@research.edu",
    password: "research123",
    type: "researcher",
    visitedMonasteries: [1, 2, 3, 4, 5],
    badges: ["Scholar", "Heritage Master", "Tradition Keeper"]
  },
  {
    name: "Admin User",
    email: "admin@sacredsikkim.com", 
    password: "admin123",
    type: "admin",
    visitedMonasteries: [],
    badges: ["Administrator"]
  }
];

const demoStats = {
  platformMetrics: {
    totalMonasteries: 10,
    totalUsers: 156,
    totalVisits: 1240,
    activeFestivals: 2,
    uploadedFiles: 45
  },
  
  performanceMetrics: {
    averageResponseTime: "85ms",
    uptime: "99.9%",
    requestsPerHour: 2500,
    errorRate: "0.1%"
  },
  
  userEngagement: {
    dailyActiveUsers: 45,
    weeklyActiveUsers: 123,
    averageSessionDuration: "8.5 minutes",
    bounceRate: "25%"
  }
};

module.exports = {
  demoScenarios,
  demoUsers, 
  demoStats
};
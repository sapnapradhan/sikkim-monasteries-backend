// routes/admin.js - Advanced admin dashboard

const express = require('express');
const { verifyToken } = require('./auth');
const User = require('../models/User');

const router = express.Router();

// Admin authentication middleware
const verifyAdmin = (req, res, next) => {
  // For demo purposes, admin emails
  const adminEmails = ['admin@sacredsikkim.com', 'demo@admin.com'];
  
  const user = User.findById(req.user.userId);
  if (!user || !adminEmails.includes(user.email)) {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
  next();
};

// GET /api/admin/dashboard - Complete dashboard stats
router.get('/dashboard', verifyToken, verifyAdmin, (req, res) => {
  const users = User.users;
  const totalUsers = users.length;
  const totalVisits = users.reduce((sum, user) => sum + user.stats.totalVisits, 0);
  const activeUsers = users.filter(user => user.stats.loginCount > 0).length;
  
  // Calculate popular monasteries
  const monasteryVisits = {};
  users.forEach(user => {
    user.visitedMonasteries.forEach(monasteryId => {
      monasteryVisits[monasteryId] = (monasteryVisits[monasteryId] || 0) + 1;
    });
  });
  
  const popularMonasteries = Object.entries(monasteryVisits)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([monasteryId, visits]) => ({ monasteryId: parseInt(monasteryId), visits }));
  
  // Recent user registrations
  const recentUsers = users
    .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
    .slice(0, 10)
    .map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      joinDate: user.joinDate,
      badges: user.badges.length
    }));
  
  res.json({
    success: true,
    data: {
      overview: {
        totalUsers,
        activeUsers,
        totalVisits,
        averageVisitsPerUser: totalUsers > 0 ? Math.round(totalVisits / totalUsers) : 0
      },
      popularMonasteries,
      recentUsers,
      userGrowth: generateUserGrowthData(users),
      systemHealth: {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        timestamp: new Date().toISOString()
      }
    }
  });
});

// GET /api/admin/users - User management
router.get('/users', verifyToken, verifyAdmin, (req, res) => {
  const { page = 1, limit = 20, search } = req.query;
  let users = User.users;
  
  // Search functionality
  if (search) {
    users = users.filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const paginatedUsers = users.slice(startIndex, startIndex + parseInt(limit));
  
  const usersData = paginatedUsers.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    joinDate: user.joinDate,
    badges: user.badges,
    stats: user.stats,
    visitedMonasteries: user.visitedMonasteries.length
  }));
  
  res.json({
    success: true,
    data: usersData,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: users.length,
      totalPages: Math.ceil(users.length / limit)
    }
  });
});

// GET /api/admin/analytics - Advanced analytics
router.get('/analytics', verifyToken, verifyAdmin, (req, res) => {
  const users = User.users;
  
  // Badge distribution
  const badgeDistribution = {};
  users.forEach(user => {
    user.badges.forEach(badge => {
      badgeDistribution[badge] = (badgeDistribution[badge] || 0) + 1;
    });
  });
  
  // Visit patterns
  const visitPatterns = {
    noVisits: users.filter(u => u.stats.totalVisits === 0).length,
    lowVisits: users.filter(u => u.stats.totalVisits >= 1 && u.stats.totalVisits <= 3).length,
    mediumVisits: users.filter(u => u.stats.totalVisits >= 4 && u.stats.totalVisits <= 7).length,
    highVisits: users.filter(u => u.stats.totalVisits >= 8).length
  };
  
  res.json({
    success: true,
    data: {
      userEngagement: {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.stats.totalVisits > 0).length,
        averageBadges: users.length > 0 ? 
          users.reduce((sum, u) => sum + u.badges.length, 0) / users.length : 0
      },
      badgeDistribution,
      visitPatterns,
      generatedAt: new Date().toISOString()
    }
  });
});

// Helper function for user growth data
function generateUserGrowthData(users) {
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayUsers = users.filter(user => {
      const userDate = new Date(user.joinDate);
      return userDate.toDateString() === date.toDateString();
    }).length;
    
    last7Days.push({
      date: date.toISOString().split('T')[0],
      users: dayUsers
    });
  }
  return last7Days;
}

module.exports = router;
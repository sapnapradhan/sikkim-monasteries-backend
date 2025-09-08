const express = require('express');
const router = express.Router();

// GET web dashboard stats
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      overview: {
        totalMonasteries: 10,
        totalVisitors: 15420,
        virtualTours: 3240,
        blogPosts: 25
      },
      popularContent: [
        { type: 'monastery', name: 'Rumtek Monastery', views: 4500 },
        { type: 'blog', name: 'Cham Dance Guide', views: 2800 },
        { type: 'festival', name: 'Losar Festival', views: 1900 }
      ],
      recentActivity: [
        'New virtual tour started for Enchey Monastery',
        'Blog post published: Ancient Manuscripts',
        '50+ users joined community forum today'
      ],
      trafficSources: {
        organic: 45,
        social: 25,
        direct: 20,
        referral: 10
      }
    }
  });
});

module.exports = router;
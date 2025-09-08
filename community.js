const express = require('express');
const router = express.Router();

const forumCategories = [
  {
    id: 1,
    name: "Monastery Experiences",
    description: "Share your visits, photos, and spiritual experiences",
    postCount: 234,
    memberCount: 1200,
    recentPost: {
      title: "Amazing experience at Rumtek",
      author: "TravellerDev",
      timestamp: "2 hours ago"
    }
  },
  {
    id: 2,
    name: "Meditation & Practice",
    description: "Discuss techniques, spiritual practices, and teachings",
    postCount: 189,
    memberCount: 890,
    recentPost: {
      title: "Morning meditation routines",
      author: "SpiritSeeker",
      timestamp: "4 hours ago"
    }
  }
];

// GET forum categories
router.get('/categories', (req, res) => {
  res.json({
    success: true,
    data: forumCategories
  });
});

module.exports = router;
// routes/frontend-helpers.js - Specific APIs for frontend needs

const express = require('express');
const router = express.Router();

// GET /api/frontend/home-data - All data needed for homepage
router.get('/home-data', (req, res) => {
  const monasteries = require('../data/monasteries');
  const festivals = require('../data/festivals');
  
  res.json({
    success: true,
    data: {
      featuredMonasteries: monasteries.slice(0, 6),
      upcomingFestivals: festivals.filter(f => new Date(f.startDate) > new Date()).slice(0, 3),
      quickStats: {
        totalMonasteries: monasteries.length,
        activeEvents: festivals.filter(f => f.isLive).length,
        traditions: [...new Set(monasteries.map(m => m.tradition))].length,
        avgRating: (monasteries.reduce((sum, m) => sum + m.stats.rating, 0) / monasteries.length).toFixed(1)
      },
      districts: [...new Set(monasteries.map(m => m.location.district))]
    }
  });
});

// GET /api/frontend/search-suggestions - For search autocomplete
router.get('/search-suggestions', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const monasteries = require('../data/monasteries');
  
  if (query.length < 2) {
    return res.json({ success: true, data: [] });
  }
  
  const suggestions = [];
  
  // Add monastery names
  monasteries.forEach(m => {
    if (m.name.toLowerCase().includes(query)) {
      suggestions.push({
        type: 'monastery',
        text: m.name,
        subtext: m.location.district,
        id: m.id
      });
    }
  });
  
  // Add traditions
  const traditions = ['Kagyu', 'Nyingma', 'Gelug', 'Sakya'];
  traditions.forEach(t => {
    if (t.toLowerCase().includes(query)) {
      suggestions.push({
        type: 'tradition',
        text: t,
        subtext: 'Buddhist tradition',
        filter: t
      });
    }
  });
  
  // Add districts
  const districts = ['East Sikkim', 'West Sikkim', 'North Sikkim', 'South Sikkim'];
  districts.forEach(d => {
    if (d.toLowerCase().includes(query)) {
      suggestions.push({
        type: 'district',
        text: d,
        subtext: 'District',
        filter: d
      });
    }
  });
  
  res.json({
    success: true,
    data: suggestions.slice(0, 8) // Limit to 8 suggestions
  });
});

// POST /api/frontend/contact - Contact form
router.post('/contact', (req, res) => {
  const { name, email, message, subject } = req.body;
  
  // In production, send email
  console.log('Contact form submission:', { name, email, subject, message });
  
  res.json({
    success: true,
    message: 'Thank you for your message. We will get back to you soon!'
  });
});

module.exports = router;
// routes/monasteries.js - All monastery API endpoints

const express = require('express');
const router = express.Router();
const Monastery = require('../models/Monastery');

// GET /api/monasteries - Get all monasteries
router.get('/', async (req, res) => {
  try {
    console.log('📡 GET /api/monasteries - Fetching all monasteries...');
    
    const monasteries = await Monastery.find()
      .select('-__v')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: monasteries.length,
      message: `Found ${monasteries.length} monasteries`,
      data: monasteries
    });
    
    console.log(`✅ Returned ${monasteries.length} monasteries`);
    
  } catch (error) {
    console.error('❌ Error fetching monasteries:', error.message);
    
    // Fallback data if database fails
    const fallbackData = [
      {
        id: 1,
        name: "Rumtek Monastery",
        description: "The Dharma Chakra Centre",
        location: { district: "East Sikkim", address: "24 km from Gangtok" },
        tradition: "Kagyu",
        features: { hasVR: true, hasAudio: true }
      },
      {
        id: 2,
        name: "Pemayangtse Monastery",
        description: "Perfect Sublime Lotus monastery",
        location: { district: "West Sikkim", address: "Pelling" },
        tradition: "Nyingma",
        features: { hasVR: false, hasAudio: true }
      }
    ];
    
    res.json({
      success: true,
      count: fallbackData.length,
      message: 'Using fallback data (database not connected)',
      data: fallbackData
    });
  }
});

// GET /api/monasteries/:id - Get single monastery
router.get('/:id', async (req, res) => {
  try {
    console.log(`📡 GET /api/monasteries/${req.params.id}`);
    
    const monastery = await Monastery.findById(req.params.id);
    
    if (!monastery) {
      return res.status(404).json({
        success: false,
        message: 'Monastery not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Monastery found',
      data: monastery
    });
    
  } catch (error) {
    console.error('❌ Error fetching monastery:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch monastery',
      error: error.message
    });
  }
});

// POST /api/monasteries - Create new monastery
router.post('/', async (req, res) => {
  try {
    console.log('📡 POST /api/monasteries - Creating new monastery...');
    
    const monastery = new Monastery(req.body);
    const savedMonastery = await monastery.save();
    
    res.status(201).json({
      success: true,
      message: 'Monastery created successfully!',
      data: savedMonastery
    });
    
    console.log(`✅ Created monastery: ${savedMonastery.name}`);
    
  } catch (error) {
    console.error('❌ Error creating monastery:', error.message);
    res.status(400).json({
      success: false,
      message: 'Failed to create monastery',
      error: error.message
    });
  }
});

// GET /api/monasteries/search/:query - Search monasteries
router.get('/search/:query', async (req, res) => {
  try {
    const searchQuery = req.params.query;
    console.log(`📡 Searching for: "${searchQuery}"`);
    
    const monasteries = await Monastery.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { 'location.district': { $regex: searchQuery, $options: 'i' } },
        { tradition: { $regex: searchQuery, $options: 'i' } }
      ]
    });
    
    res.json({
      success: true,
      count: monasteries.length,
      query: searchQuery,
      message: `Found ${monasteries.length} results for "${searchQuery}"`,
      data: monasteries
    });
    
  } catch (error) {
    console.error(`❌ Search error:`, error.message);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
});

module.exports = router;
// routes/maps.js - Google Maps integration endpoints

const express = require('express');
const router = express.Router();

// GET /api/maps/monasteries - Optimized data for Google Maps
router.get('/monasteries', (req, res) => {
  const monasteries = require('../data/monasteries'); // Your monastery data
  
  // Format data specifically for Google Maps
  const mapData = monasteries.map(monastery => ({
    id: monastery.id,
    name: monastery.name,
    position: {
      lat: monastery.location.coordinates.latitude,
      lng: monastery.location.coordinates.longitude
    },
    info: {
      tradition: monastery.tradition,
      district: monastery.location.district,
      founded: monastery.founded,
      rating: monastery.stats.rating,
      hasVR: monastery.features.hasVR,
      hasAudio: monastery.features.hasAudio,
      address: monastery.location.address
    },
    markerColor: getMarkerColor(monastery.tradition),
    icon: getCustomIcon(monastery.tradition)
  }));
  
  res.json({
    success: true,
    count: mapData.length,
    center: { lat: 27.3389, lng: 88.5583 }, // Sikkim center
    zoom: 10,
    data: mapData
  });
});

// GET /api/maps/route/:from/:to - Route planning
router.get('/route/:from/:to', (req, res) => {
  const fromId = parseInt(req.params.from);
  const toId = parseInt(req.params.to);
  
  const monasteries = require('../data/monasteries');
  const fromMonastery = monasteries.find(m => m.id === fromId);
  const toMonastery = monasteries.find(m => m.id === toId);
  
  if (!fromMonastery || !toMonastery) {
    return res.status(404).json({
      success: false,
      message: 'Monastery not found'
    });
  }
  
  res.json({
    success: true,
    route: {
      origin: {
        lat: fromMonastery.location.coordinates.latitude,
        lng: fromMonastery.location.coordinates.longitude,
        name: fromMonastery.name
      },
      destination: {
        lat: toMonastery.location.coordinates.latitude,
        lng: toMonastery.location.coordinates.longitude,
        name: toMonastery.name
      },
      waypoints: [], // Can add intermediate stops
      travelMode: 'DRIVING'
    }
  });
});

// GET /api/maps/nearby/:id - Find nearby monasteries
router.get('/nearby/:id', (req, res) => {
  const monasteryId = parseInt(req.params.id);
  const radius = parseFloat(req.query.radius) || 50; // km
  
  const monasteries = require('../data/monasteries');
  const centerMonastery = monasteries.find(m => m.id === monasteryId);
  
  if (!centerMonastery) {
    return res.status(404).json({
      success: false,
      message: 'Monastery not found'
    });
  }
  
  // Calculate distances and find nearby
  const nearby = monasteries
    .filter(m => m.id !== monasteryId)
    .map(monastery => ({
      ...monastery,
      distance: calculateDistance(
        centerMonastery.location.coordinates,
        monastery.location.coordinates
      )
    }))
    .filter(m => m.distance <= radius)
    .sort((a, b) => a.distance - b.distance);
  
  res.json({
    success: true,
    center: centerMonastery,
    radius,
    count: nearby.length,
    data: nearby
  });
});

// Helper functions
function getMarkerColor(tradition) {
  const colors = {
    'Kagyu': '#FF6B6B',
    'Nyingma': '#4ECDC4', 
    'Gelug': '#45B7D1',
    'Sakya': '#FFA07A'
  };
  return colors[tradition] || '#666666';
}

function getCustomIcon(tradition) {
  const icons = {
    'Kagyu': '/icons/kagyu-marker.png',
    'Nyingma': '/icons/nyingma-marker.png',
    'Gelug': '/icons/gelug-marker.png',
    'Sakya': '/icons/sakya-marker.png'
  };
  return icons[tradition] || '/icons/default-marker.png';
}

function calculateDistance(coord1, coord2) {
  const R = 6371; // Earth's radius in km
  const dLat = (coord2.latitude - coord1.latitude) * Math.PI / 180;
  const dLon = (coord2.longitude - coord1.longitude) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(coord1.latitude * Math.PI / 180) * Math.cos(coord2.latitude * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

module.exports = router;
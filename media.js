const express = require('express');
const router = express.Router();

// GET image gallery for monastery
router.get('/gallery/:monasteryId', (req, res) => {
  const galleries = {
    1: { // Rumtek
      hero: "rumtek-hero-1920x1080.jpg",
      images: [
        { id: 1, url: "rumtek-interior-800x600.jpg", caption: "Main prayer hall", alt: "Rumtek monastery interior" },
        { id: 2, url: "rumtek-exterior-800x600.jpg", caption: "Monastery exterior", alt: "Rumtek monastery building" },
        { id: 3, url: "rumtek-monks-800x600.jpg", caption: "Monks in prayer", alt: "Buddhist monks praying" }
      ]
    }
  };
  
  res.json({
    success: true,
    data: galleries[req.params.monasteryId] || { images: [] }
  });
});

module.exports = router;
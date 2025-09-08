const express = require('express');
const router = express.Router();

// GET sitemap data for web
router.get('/sitemap', (req, res) => {
  const sitemapUrls = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/monasteries', priority: 0.9, changefreq: 'weekly' },
    { url: '/festivals', priority: 0.8, changefreq: 'monthly' },
    { url: '/blog', priority: 0.7, changefreq: 'daily' },
    { url: '/community', priority: 0.6, changefreq: 'daily' }
  ];
  
  res.json({
    success: true,
    data: sitemapUrls
  });
});

// GET meta data for pages
router.get('/meta/:page', (req, res) => {
  const metaData = {
    home: {
      title: "Sacred Sikkim - Digital Monastery Heritage Platform",
      description: "Explore 200+ monasteries of Sikkim through virtual tours, cultural insights, and immersive experiences",
      keywords: "sikkim monasteries, buddhist heritage, virtual tours, cultural tourism"
    },
    monasteries: {
      title: "Monasteries - Sacred Sikkim Heritage",
      description: "Discover ancient monasteries of Sikkim with 360° tours, historical insights, and cultural significance",
      keywords: "rumtek monastery, pemayangtse, enchey, buddhist temples sikkim"
    }
  };
  
  res.json({
    success: true,
    data: metaData[req.params.page] || metaData.home
  });
});

module.exports = router;
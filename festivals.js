const express = require('express');
const router = express.Router();

const festivals = [
  {
    id: 1,
    name: "Losar Festival",
    startDate: "2025-02-15",
    endDate: "2025-02-17",
    monastery: "Rumtek Monastery",
    description: "Tibetan New Year celebration with traditional dances",
    liveStreamUrl: "https://youtube.com/watch?v=live-stream",
    isLive: false,
    viewerCount: 0,
    highlights: ["Traditional Cham Dance", "Prayer Ceremonies", "Cultural Food"]
  },
  {
    id: 2,
    name: "Buddha Purnima",
    startDate: "2025-05-12",
    endDate: "2025-05-12",
    monastery: "Pemayangtse Monastery",
    description: "Celebration of Buddha's birth, enlightenment and parinirvana",
    liveStreamUrl: "https://youtube.com/watch?v=buddha-purnima",
    isLive: true,
    viewerCount: 1250,
    highlights: ["Meditation Sessions", "Lotus Offering", "Dharma Talks"]
  }
];

// GET all festivals
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: festivals.length,
    data: festivals
  });
});

// GET festival calendar for web display
router.get('/calendar', (req, res) => {
  const calendarData = festivals.map(festival => ({
    id: festival.id,
    title: festival.name,
    start: festival.startDate,
    end: festival.endDate,
    monastery: festival.monastery,
    isLive: festival.isLive
  }));
  
  res.json({
    success: true,
    data: calendarData
  });
});

module.exports = router;
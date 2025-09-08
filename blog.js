const express = require('express');
const router = express.Router();

const blogPosts = [
  {
    id: 1,
    title: "Ancient Manuscripts Digitized at Pemayangtse",
    excerpt: "300-year-old Buddhist texts preserved through modern technology",
    content: "Detailed article about digitization process...",
    author: "Dr. Karma Lhamo",
    publishDate: "2025-09-03",
    category: "preservation",
    image: "manuscript-digitization.jpg",
    views: 1200,
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Understanding Cham Dance Rituals",
    excerpt: "Explore the spiritual significance of traditional monastery dances",
    content: "Complete guide to Cham dance traditions...",
    author: "Lama Tenzin",
    publishDate: "2025-09-01",
    category: "culture",
    image: "cham-dance.jpg",
    views: 890,
    readTime: "7 min read"
  }
];

// GET all blog posts
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: blogPosts.length,
    data: blogPosts
  });
});

// GET single blog post
router.get('/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Blog post not found'
    });
  }
  
  res.json({
    success: true,
    data: post
  });
});

module.exports = router;
// routes/auth.js - Authentication routes

const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'sacred-sikkim-jwt-secret-key-2025';

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, try again later'
  }
});

// Apply rate limiting to auth routes
router.use(authLimiter);

// POST /api/auth/register - User registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }
    
    // Check if user already exists
    const existingUser = User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    // Hash password and create user
    const hashedPassword = await User.hashPassword(password);
    const user = new User({ name, email, password: hashedPassword });
    user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          badges: user.badges,
          joinDate: user.joinDate
        },
        token
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// POST /api/auth/login - User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    // Find user
    const user = User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Check password
    const isValidPassword = await User.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Update login count
    user.stats.loginCount += 1;
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          badges: user.badges,
          stats: user.stats,
          visitedMonasteries: user.visitedMonasteries
        },
        token
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// GET /api/auth/profile - Get user profile (protected)
router.get('/profile', verifyToken, (req, res) => {
  const user = User.findById(req.user.userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      badges: user.badges,
      stats: user.stats,
      visitedMonasteries: user.visitedMonasteries,
      preferences: user.preferences,
      joinDate: user.joinDate
    }
  });
});

// PUT /api/auth/profile - Update user profile (protected)
router.put('/profile', verifyToken, (req, res) => {
  const user = User.findById(req.user.userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  const { name, preferences } = req.body;
  
  if (name) user.name = name;
  if (preferences) user.preferences = { ...user.preferences, ...preferences };
  
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      preferences: user.preferences
    }
  });
});

// POST /api/auth/visit/:monasteryId - Record monastery visit (protected)
router.post('/visit/:monasteryId', verifyToken, (req, res) => {
  const user = User.findById(req.user.userId);
  const monasteryId = parseInt(req.params.monasteryId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  user.addVisit(monasteryId);
  
  res.json({
    success: true,
    message: 'Visit recorded successfully',
    data: {
      visitedMonasteries: user.visitedMonasteries,
      badges: user.badges,
      stats: user.stats
    }
  });
});

module.exports = { router, verifyToken };
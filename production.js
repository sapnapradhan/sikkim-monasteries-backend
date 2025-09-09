// config/production.js - Production configuration
module.exports = {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/sikkim-monasteries',
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100
  },
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'video/mp4']
  },
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://sacredsikkim.com', 'https://www.sacredsikkim.com']
      : ['http://localhost:3000', 'http://localhost:3001']
  }
};
// database.js - Database connection file

const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    // Connect to local MongoDB
    const connection = await mongoose.connect('mongodb://localhost:27017/sikkim-monasteries');
    
    console.log('📦 DATABASE CONNECTED!');
    console.log(`🏪 Database: ${connection.connection.name}`);
    console.log(`🌐 Host: ${connection.connection.host}`);
    
  } catch (error) {
    console.error('❌ DATABASE CONNECTION FAILED!');
    console.error('Error:', error.message);
    
    console.log('\n🔧 POSSIBLE SOLUTIONS:');
    console.log('1. Install MongoDB: https://www.mongodb.com/try/download/community');
    console.log('2. Start MongoDB service: net start MongoDB');
    console.log('3. Or use MongoDB Atlas (cloud database)');
    
    // Don't exit, let server run without database for now
    console.log('⚠️ Running without database...');
  }
};

module.exports = connectDatabase;
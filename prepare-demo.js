// demo/prepare-demo.js - Auto-setup demo environment

const User = require('../models/User');
const { demoUsers, demoStats } = require('./demo-data');

async function prepareDemoEnvironment() {
  console.log('🎬 Preparing demo environment...\n');
  
  try {
    // Clear existing demo users
    User.users = User.users.filter(user => !user.email.includes('demo.com'));
    
    // Create demo users
    for (const userData of demoUsers) {
      const hashedPassword = await User.hashPassword(userData.password);
      const user = new User({
        name: userData.name,
        email: userData.email,
        password: hashedPassword
      });
      
      // Add demo data
      user.visitedMonasteries = userData.visitedMonasteries;
      user.badges = userData.badges;
      user.stats.totalVisits = userData.visitedMonasteries.length;
      
      user.save();
      console.log(`✅ Created demo user: ${userData.name} (${userData.type})`);
    }
    
    console.log('\n🎯 Demo environment ready!');
    console.log('\nDemo Accounts:');
    console.log('Tourist: sarah@demo.com / demo123');
    console.log('Researcher: tenzin@research.edu / research123'); 
    console.log('Admin: admin@sacredsikkim.com / admin123');
    
    console.log('\n📊 Demo URLs:');
    console.log('API Docs: http://localhost:3001/api/docs');
    console.log('Admin Dashboard: POST /api/admin/dashboard');
    console.log('User Registration: POST /api/auth/register');
    
    return true;
    
  } catch (error) {
    console.error('❌ Demo preparation failed:', error);
    return false;
  }
}

// Run if called directly
if (require.main === module) {
  prepareDemoEnvironment();
}

module.exports = prepareDemoEnvironment;
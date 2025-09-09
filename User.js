// models/User.js - User authentication model

const bcrypt = require('bcryptjs');

class User {
  static users = []; // In-memory storage for demo
  
  constructor({ name, email, password }) {
    this.id = User.users.length + 1;
    this.name = name;
    this.email = email;
    this.password = password;
    this.visitedMonasteries = [];
    this.badges = ['New Explorer'];
    this.joinDate = new Date().toISOString();
    this.stats = {
      totalVisits: 0,
      completedTours: 0,
      forumPosts: 0,
      loginCount: 0
    };
    this.preferences = {
      language: 'en',
      notifications: true,
      theme: 'light'
    };
  }
  
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
  
  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
  
  static findByEmail(email) {
    return User.users.find(user => user.email === email);
  }
  
  static findById(id) {
    return User.users.find(user => user.id === parseInt(id));
  }
  
  save() {
    User.users.push(this);
    return this;
  }
  
  awardBadge(badgeName) {
    if (!this.badges.includes(badgeName)) {
      this.badges.push(badgeName);
    }
  }
  
  addVisit(monasteryId) {
    if (!this.visitedMonasteries.includes(monasteryId)) {
      this.visitedMonasteries.push(monasteryId);
      this.stats.totalVisits += 1;
      
      // Award badges based on visits
      if (this.stats.totalVisits === 1) this.awardBadge('First Steps');
      if (this.stats.totalVisits === 5) this.awardBadge('Explorer');
      if (this.stats.totalVisits === 10) this.awardBadge('Heritage Master');
    }
  }
}

module.exports = User;
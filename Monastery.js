// models/Monastery.js - Monastery data structure

const mongoose = require('mongoose');

const monasterySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Monastery name is required'],
    trim: true
  },
  
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  
  location: {
    district: {
      type: String,
      required: true,
      enum: ['East Sikkim', 'West Sikkim', 'North Sikkim', 'South Sikkim']
    },
    address: {
      type: String,
      required: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  
  tradition: {
    type: String,
    required: true,
    enum: ['Kagyu', 'Nyingma', 'Gelug', 'Sakya', 'Bon']
  },
  
  founded: {
    type: Number
  },
  
  visitingInfo: {
    timings: {
      type: String,
      default: '6:00 AM - 6:00 PM'
    },
    entryFee: {
      type: String,
      default: 'Free'
    },
    bestTime: {
      type: String,
      default: 'October to March'
    }
  },
  
  features: {
    hasVR: {
      type: Boolean,
      default: false
    },
    hasAudio: {
      type: Boolean,
      default: false
    },
    hasLiveStream: {
      type: Boolean,
      default: false
    }
  },
  
  stats: {
    visitCount: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0
    }
  }
  
}, {
  timestamps: true
});

const Monastery = mongoose.model('Monastery', monasterySchema);
module.exports = Monastery;
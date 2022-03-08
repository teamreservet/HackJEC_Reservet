const mongoose = require('mongoose');

const monumentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  opening_time: {
    type: String,
    required: true
  },
  closing_time: {
    type: String,
    required: true
  },
  ticket_pricing: {
    foreign_tourist: String,
    indian_tourist: String,
    children_below_15_years: String
  },
  location: {
    type: String,
    required: true
  },
  images: [
    {
      type: String
    }
  ],
  tags: [
    {
      type: String,
      enum: ['monument', 'heritage', 'museum']
    }
  ]
});

const Monument = mongoose.model('Monument', monumentSchema);
module.exports = Monument;

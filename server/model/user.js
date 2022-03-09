const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  upcomingTrips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket'
    }
  ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;

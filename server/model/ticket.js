const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  issuer: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  indianCount: {
    type: Number,
    default: 0
  },
  foreignerCount: {
    type: Number,
    default: 0
  },
  childrenCount: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  issuer_account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;

const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cities: [
    {
      type: String,
      required: true
    }
  ]
});

const State = mongoose.model('State', stateSchema);
module.exports = State;

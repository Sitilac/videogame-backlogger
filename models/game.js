var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
  name: String,
  released: String,
  developer: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);
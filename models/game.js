var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var gameSchema = new mongoose.Schema({
  title: String,
  released: String,
  developer: String,
  
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);
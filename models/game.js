var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var gameSchema = new mongoose.Schema({
  title: String,
  released: String,
  developer: [{
      type: Schema.Types.ObjectId,
      ref: 'Developer',
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var backlogSchema = new mongoose.Schema({
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    }
  ],
  progress: String,
}, {
  timestamps: true
})

var gamerSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  googleId:String,
  backlog: [backlogSchema],
}, {
  timestamps: true
});

module.exports = mongoose.model('Gamer', gamerSchema);
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var backlogSchema = new mongoose.Schema({
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    }
  ],
  progress: Array,
}, {
  timestamps: true
})

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  googleId:String,
  backlog: [backlogSchema],
  // games: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Game",
  //   },
  // ],
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
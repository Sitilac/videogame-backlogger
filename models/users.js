var mongoose = require('mongoose');


var factSchema = new mongoose.Schema({
  text: String
}, {
  timestamps: true
});

var studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  googleId:String,
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
var router = require('express').Router();
var passport = require('passport');

// The root route renders our only view
router.get('/', function(req, res) {
  res.redirect('/games');
});
// Google OAuth login route USER WANTS TO LOGIN
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/games',
    failureRedirect : '/games'
  }
));

//Logging out Passport allows you to logout.
router.get('/logout', function(req,res){
  res.logout();
  res.redirect('/games');
})

module.exports = router;
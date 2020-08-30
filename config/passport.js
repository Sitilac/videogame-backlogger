const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const user = require('../models/user');

//Accepts a single object that is the instance of the stretegy.
//Process used to access the .env file
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK,
    },function(accessToken, refreshToken, profile, cb){//Verify CB function runs when the user just logs in using Oauth
        //profile object is the user's google profile
        console.log(profile);
        User.findOne({googleId: profile.id}, function(err, user){
            if(err) return cb(err);
            if(user){
                return cb(null,user);
            }else{
                const newUser = new User({
                    name: profile.displayName,
                    email:profile.emails[0].value,
                    googleId: profile.id,
                    avatar: profile.photos[0].value,
                });
                newUser.save(function(err){
                    if(err) return cb(err);
                    return cb(null, newUser);
                });
            }
        });
    }
));

passport.serializeUser(function(user, done){
    //Done is used to let passport know what to stick to the passport object.
    done(null, user._id);
});

passport.deserializeUser(function(id, done){ //<==== Gets passed the done function from serialUser
    User.findById(id, function(err, user){
        done(err, user);
    })
});
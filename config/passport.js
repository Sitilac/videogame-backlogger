const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Gamer = require('../models/gamer');
const gamer = require('../models/gamer');

//Accepts a single object that is the instance of the stretegy.
//Process used to access the .env file
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK,
    },function(accessToken, refreshToken, profile, cb){//Verify CB function runs when the user just logs in using Oauth
        //profile object is the user's google profile

        Gamer.findOne({googleId: profile.id}, function(err, gamer){
            if(err) return cb(err);
            if(gamer){
                return cb(null,gamer);
            }else{
                const newGamer = new Gamer({
                    name: profile.displayName,
                    email:profile.emails[0].value,
                    googleId: profile.id,
                    avatar: profile.photos[0].value,
                });
                newGamer.save(function(err){
                    if(err) return cb(err);
                    return cb(null, newGamer);
                });
            }
        });
    }
));

passport.serializeUser(function(gamer, done){
    //Done is used to let passport know what to stick to the passport object.
    done(null, gamer._id);
});

passport.deserializeUser(function(id, done){ //<==== Gets passed the done function from serialUser
    Gamer.findById(id, function(err, gamer){
        done(err, gamer);
    })
});
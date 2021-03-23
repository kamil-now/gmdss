const GoogleStrategy = require('passport-google-oauth20').Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user')
const config = require('./database');

module.exports = function(passport) {
  // Jwt strategy
  let opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

    User.getUserById(jwt_payload.user._id, (err, user) => {
      if(err){
        return done(err, false);
      }

      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
  
  // Google strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id })

      if (user) {
        done(null, user)
      } else {
        let newUser = new User({
          googleId: profile.id,
          name: profile.name.givenName + ' ' + profile.name.familyName,
          username: profile.displayName,
          email: profile.emails[0].value,
        })
        console.log(newUser)
        user = await User.create(newUser)
        done(null, user)
      }
    } catch (err) {
      console.error(err)
    }
  }))

  passport.serializeUser((user, done) => done(null, user.id))
  
  passport.deserializeUser((id, done) =>  User.findById(id, (err, user) => done(err, user)))
}


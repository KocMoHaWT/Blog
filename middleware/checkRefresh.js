const passport = require('passport');
const config = require('../config');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const db = require('../models');


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey   : config.secretKey,
  }, async (jwt_payload, done) => { 
    console.log(jwt_payload);
    try {
        const user = await db.User.findOne({ where: { id: jwt_payload.id }});
        return done(null, user);
    
    } catch(e) {
      console.log(e);
      done(err, false)
    }
  }));

module.exports = passport;

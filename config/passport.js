const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require('bcrypt');

const UserModel = require('../models/user');


module.exports = function(passport) {
  passport.use('local', new LocalStrategy({}, async (username, password, done) => {
    try {
      const userDocument = await UserModel.findOne({username: username}).exec();
      const passwordsMatch = await bcrypt.compare(password, userDocument.passwordHash);
  
      if (passwordsMatch) {
        return done(null, userDocument);
      } else {
        return done('Incorrect Username / Password');
      }
    } catch (error) {
      done(error);
    }
  }));
  
  passport.use(new JWTStrategy({
      jwtFromRequest: req => req.cookies.jwt,
      secretOrKey: process.env.SECRET,
    },
    (jwtPayload, done) => {
      if (jwtPayload.expires > Date.now()) {
        return done('jwt expired');
      }
  
      return done(null, jwtPayload);
    }
  ));  
}
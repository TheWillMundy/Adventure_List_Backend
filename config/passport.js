const passport = require('passport'),
      User = require('../app/models/user_model').user,
      config = require('./main'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

// Local Login Strategy
const localLogin = new LocalStrategy({usernameField: 'email', passwordField: 'password'}, function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { error: "Your login details could not be verified." }) };

      user.comparePassword(password, function(err, isMatch) {
        if (err) { return done(err) }
        if (!isMatch) { return done(null, false, { error: "Login deets could not match" }) }

        return done(null, user)
      })
    });
})

// JWT Auth Options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: config.secret
};

//Set up JWT Login Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload._id, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    }
    else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);

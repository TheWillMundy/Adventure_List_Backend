const AuthenticationController = require('../controllers/authentication'),
      // express = require('express'),
      passportService = require('../../config/passport'),
      passport = require('passport')

const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app, db) {

  // Authentication Route

  // Registration route
  app.post('/register', AuthenticationController.register);

  // Login route
  app.post('/login', requireLogin, AuthenticationController.login);

};

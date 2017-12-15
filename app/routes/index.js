// routes/index.js

// Gets routes from
const user_routes = require('./user_routes');
const adventure_routes = require('./adventure_routes');
const authentication_routes = require('./authentication_routes');

module.exports = function(app, db) {
  user_routes(app, db);
  adventure_routes(app, db);
  authentication_routes(app, db);
};

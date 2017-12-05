// routes/index.js

// Gets routes from 
const user_routes = require('./user_routes');
const adventure_routes = require('./adventure_routes');

module.exports = function(app, db) {
  user_routes(app, db);
  adventure_routes(app, db);
};
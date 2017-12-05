// In Express, routes are wrapped as functions

// Gets model for users
const User = require('../models/user_model').user

//Functions
const getUsers = (req, res) => {
  User.find({},
    (err, users) => {
      if (err) {res.send({'error': "An error has occurred"})}
      else {
        res.send(users)
      }
    }
  )  
}

const addUser = (req, res) => {
  let name = req.body.name;
  User.create({name: name, adv_list: []}, 
    (err, result) => {
      if (err) {res.send({"error": "An error has occurred"})}
      else {
        res.send(200)
      }
  })
}

const removeUser = (req, res) => {
  let id = req.params.id;
  User.remove({_id: id},
    (err, result) => {
      if (err) {res.send({"error": "An error has occurred"})}
      else {
        res.send(200)
      }
    })
}

const clearUsers = (req, res) => {
  User.remove({}, 
    (err, result) => {
      if (err) {res.send({"error": "An error has occurred"})}
      else {
        res.send(200)
      }
    })
}

//Export Routes
module.exports = function(app, db) {
  app.get('/users', getUsers);
  app.post('/users', addUser);
  app.delete('/users', clearUsers);
  app.delete('/users/:id', removeUser);
};
// In Express, routes are wrapped as functions

const Adventure = require('../models/adventure_model').adventure

//Functions
//Functions
const getAdventures = (req, res) => {
  Adventure.find({},
    (err, adventures) => {
      if (err) {res.send({'error': "An error has occurred"})}
      else {
        res.send(adventures)
      }
    }
  )  
}

const addAdventure = (req, res) => {
  let title = req.body.title;
  Adventure.create({title: title}, 
    (err, result) => {
      if (err) {res.send({"error": "An error has occurred"})}
      else {
        res.send(result._id)
      }
  })
}

const removeAdventure = (req, res) => {
  let id = req.params.id;
  Adventure.remove({_id: id},
    (err, result) => {
      if (err) {res.send({"error": "An error has occurred"})}
      else {
        res.send(200)
      }
    })
}

const clearAdventures = (req, res) => {
  Adventure.remove({}, 
    (err, result) => {
      if (err) {res.send({"error": "An error has occurred"})}
      else {
        res.send(200)
      }
    })
}

//Export Routes
module.exports = function(app, db) {
  app.get('/adventures', getAdventures);
  app.post('/adventures', addAdventure);
  app.delete('/adventures', clearAdventures);
  app.delete('/adventures/:id', removeAdventure);
};
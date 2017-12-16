// In Express, routes are wrapped as functions

const Adventure = require('../models/adventure_model').adventure
const User = require('../models/user_model').user
var ObjectId = require('mongoose').Types.ObjectId;

//Functions
const getAdventures = (req, res) => {
  Adventure.find({})
    .populate({path: 'postedBy followedBy', select: '-password'})
    .exec(
      (err, adventures) => {
        if (err) {res.send({'error': "An error has occurred"})}
        else {
          res.send(adventures)
        }
    })
}

const addAdventure = (req, res) => {
  let title = req.body.title;
  let poster = req.body.email;
  User.find({email: poster}, (err, user) => {
    if (err) {res.send({'error': "An error has occurred"})}
    else {
      let poster_id = user[0]._id
      Adventure.create({title: title, postedBy: poster_id},
        (err, result) => {
          if (err) {res.send({"error": "An error has occurred"})}
          else {
            Adventure.findOne({title})
            .populate({path: 'postedBy', select: '-password'})
            .exec(
              (err, adventure) => {
                if (err) {res.send({"error": "An error has occurred"})}
                else {
                  res.send(adventure)
                }
              }
            )
          }
      })
    }
  })
}

const followAdventure = (req, res) => {
  let id = req.params.id;
  console.log(req.body.email)
  User.findOne({email: req.body.email}, (err, user) => {
    Adventure.update({_id: id}, {$push: {followedBy: user}}, (err, adventure) => {
      if (err) { res.send({"error": "FindOneAndUpdate error has occurred"}) }
      else {
        Adventure.findOne({_id: id})
        .populate({path: 'postedBy followedBy', select: '-password'})
        .exec(
          (err, adventure) => {
            console.log(adventure)
            if (err) {res.send({"error": "An error has occurred."})}
            else {
              return res.send(adventure)
            }
          }
        )
      }
    })
  });
}

const unfollowAdventure = (req, res) => {
  let id = req.params.id
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) { res.send({"error": "User error has occurred."}) }
    else {
      Adventure.findById(id, (err, adventure) => {
        if (err) {console.log(err); res.send({"error": "Update error has occurred."})}
        else {
          adventure.followedBy.pull(user._id)
          adventure.save((err) => {
            if (err) {res.send({"error": "An error has occurred."})}
            else {
              Adventure.findOne({_id: id})
              .populate({path: 'postedBy followedBy', select: '-password'})
              .exec(
                (err, adventure) => {
                  if (err) {res.send({"error": "An error has occurred."})}
                  else {
                    return res.send(adventure)
                  }
                }
              )
            }
          })
        }
      })
    }
  });
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
  app.post('/adventures/:id', followAdventure);
  app.post('/adventures/unfollow/:id', unfollowAdventure);
  app.delete('/adventures', clearAdventures);
  app.delete('/adventures/:id', removeAdventure);
};

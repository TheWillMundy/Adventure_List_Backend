var mongoose     = require('mongoose')
    // , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema

require('../../config/db')

var AdventureSchema = mongoose.Schema({
    title:{type: String},
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    followedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
})


var Adventure = mongoose.model("Adventure", AdventureSchema)

exports.adventure = Adventure

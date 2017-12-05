var mongoose     = require('mongoose')
    // , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema

require('../../config/db')

var AdventureSchema = mongoose.Schema({
    title:{type: String}
})


var Adventure = mongoose.model("Adventure", AdventureSchema)

exports.adventure = Adventure
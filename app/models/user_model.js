var mongoose     = require('mongoose')
    // , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema
    , AdventureList = require('./adventure_model')

require('../../config/db')

var UserSchema = mongoose.Schema({
    name:{type: String},
    adv_list: {type: AdventureList},
})


var User = mongoose.model("User", UserSchema)

exports.user = User
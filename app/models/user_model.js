var mongoose     = require('mongoose')
    // , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema
    , AdventureList = require('./adventure_model')
    , bcrypt = require('bcrypt-nodejs')

require('../../config/db')

var UserSchema = mongoose.Schema({
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profile:{
      firstName: {type: String},
      lastName: {type: String}
    }
  },
  {
    timestamps: true
  })

// Pre-save of user to database
UserSchema.pre('save', function(next) {
  const user = this,
        SALT_FACTOR =5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Method for password comparison
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err)

    callback(null, isMatch)
  });
}

var User = mongoose.model("User", UserSchema)

exports.user = User

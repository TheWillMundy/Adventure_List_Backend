"use strict"

const jwt = require('jsonwebtoken'),
      crypto = require('crypto'),
      User = require('../models/user_model').user,
      config = require('../../config/main')

const generateToken = (user) => {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // seconds
  })
}

// Set user info to pass through token
const setUserInfo = (request) => {
  return {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
  };
}

// Login Route
exports.login = (req, res, next) => {
  let userInfo = setUserInfo(req.user)
  console.log(userInfo)
  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  })
}

// Registration Route
exports.register = (req, res, next) => {
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const password = req.body.password

  if (!email) {
    return res.status(422).send({ error: "You must enter an email address." })
  }

  if (!firstName || !lastName) {
    return res.status(422).send({ error: "You must enter your full name." })
  }


  if (!password) {
    return res.status(422).send({ error: "You must enter a password." })
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {return next(err)}

    if (existingUser) {
      return res.status(422).send({ error: "That email address is already in use." });
    }

    let user = new User({
      email: email,
      password: password,
      profile: { firstName: firstName, lastName: lastName },
      adv_list: []
    });

    user.save( (err, user) => {
      if (err) { return next(err) }

      let userInfo = setUserInfo(user);

      res.status(201).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      });
    });
  });
}

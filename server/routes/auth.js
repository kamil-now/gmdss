const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const User = require('../models/user')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('./../config/database');

// Login with token
router.post('/token', (req, res, next) => {
  const decodedToken = jwt.decode(req.body.token)
  tryLogin(res, decodedToken.user.username, decodedToken.user.password)
});

// Login with Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false })
)

// Authenticate with Google
router.get(
  '/google/callback',
  passport.authenticate(['google'], { failureRedirect: '/' }),
  (req, res) => {
    User.getUserByUsername(req.user.username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.json({ success: false, msg: 'User not found' });
      }
      data = getLoginResponseData(user)
      res.redirect(`/login?data=${JSON.stringify(data)}`, 307)
    });
  }
)

// Logout user
router.get('/logout', (req, res) => req.logout())

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    _id: mongoose.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  User.addUser(newUser, async (err) => {
    let registered = await User.findById(newUser._id)
    console.log(registered)
    if (err || !registered) {
      return res.json({ success: false, msg: 'Failed to register user ' + (err ? err : '') })
    }
    return res.json({ success: true, msg: 'User registered' })
  })
});

// Authenticate
router.post('/login', (req, res, next) => {
  tryLogin(res, req.body.username, req.body.password)
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ user: req.user });
});

function tryLogin(res, username, password) {
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch || password === user.password) {
        return res.json(getLoginResponseData(user))
      } else {
        return res.json({ success: false, msg: 'Failed to login ' + (err ? err : '')})
      }
    });
  });
}

function getLoginResponseData(user) {
  const token = jwt.sign({ user }, config.secret, {
    expiresIn: 86400
  });

  return {
    success: true,
    data: {
      token: 'JWT ' + token,
      user: user
    }
  }
}

module.exports = router
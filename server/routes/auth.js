const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const User = require('../models/user')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('./../config/database');


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

      if (err) throw err;
      const token = jwt.sign({ user }, config.secret, {
        expiresIn: 86400 // 1 day
      });
      data = {
        success: true,
        token: 'JWT ' + token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      }
      res.redirect(`/login?data=${JSON.stringify(data)}`)
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
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ user }, config.secret, {
          expiresIn: 86400
        });

        return res.json({
          success: true,
          data: {
            token: 'JWT ' + token,
            user: {
              id: user._id,
              username: user.username,
              email: user.email
            }
          }
        });
      } else {
        return res.json({ success: false, msg: 'Failed to login ' + (err ? err : '')});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ user: req.user });
});

module.exports = router
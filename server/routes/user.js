const express = require('express');
const router = express.Router();
const passport = require('passport')

// Profile
router.get('/profile', passport.authenticate(['google', 'jwt']), (req, res, next) => {
  res.json({ user: req.user });
});

module.exports = router;
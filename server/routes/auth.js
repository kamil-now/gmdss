const passport = require('passport')
const express = require('express')
const router = express.Router()

const controller = require('../controllers/auth-controller')

router.post('/login', controller.login);

router.post('/token', controller.loginWithToken);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))

router.get('/google/callback', passport.authenticate(['google'], { failureRedirect: '/' }), controller.loginWithGoogle)

router.get('/logout', controller.logout)

router.post('/register', controller.register);

module.exports = router

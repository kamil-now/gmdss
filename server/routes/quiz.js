const passport = require('passport')
const express = require('express')
const router = express.Router()

const controller = require('../controllers/quiz-controller')

router.get('/list', passport.authenticate('jwt'), controller.list)

router.post('/create', passport.authenticate('jwt'), controller.create)

router.put('/update', passport.authenticate('jwt'), controller.update)

router.delete('/delete/:id', passport.authenticate('jwt'), controller.delete)

module.exports = router

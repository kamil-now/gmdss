const passport = require('passport')
const express = require('express')
const router = express.Router()

const quiz_controller = require('../controllers/quiz-controller')

router.get('/list', passport.authenticate('jwt'), quiz_controller.get_quiz_list)

router.post('/create', passport.authenticate('jwt'), quiz_controller.create_quiz)

router.put('/update', passport.authenticate('jwt'), quiz_controller.update_quiz)

router.delete('/delete/:id', passport.authenticate('jwt'), quiz_controller.delete_quiz)

module.exports = router
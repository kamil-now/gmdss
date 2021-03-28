const Quiz = require('../models/quiz')
const mongoose = require('mongoose')

exports.get_quiz_list = async (req, res) => {
  try {
    const quizes = await Quiz.find({})
    res.json({ success: true, msg: `Found ${quizes.length}`, data: quizes })
  } catch (err) {
    console.error(err)
    res.json({ success: false, msg: err })
  }
};

exports.create_new_quiz = async (req, res) => {
  try {
    const quiz = {
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      sets: req.body.sets
    }
    await Quiz.create(quiz)

    const created = await Quiz.findById(quiz._id)

    if (!created) {
      throw 'quiz could not be created'
    }

    res.json({ success: true, msg: 'Quiz created' })

  } catch (err) {
    console.error(err)
    res.json({ success: false, msg: err })
  }
}
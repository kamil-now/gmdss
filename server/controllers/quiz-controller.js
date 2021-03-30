const Quiz = require('../models/quiz')
const mongoose = require('mongoose')

exports.get_quiz_list = async (req, res) => {
  try {
    const quizes = await Quiz.find({})
    res.json({ success: true, msg: `Found ${quizes.length} quizzes`, data: quizes })
  } catch (err) {
    console.error(err)
    res.json({ success: false, msg: JSON.stringify(err) })
  }
};

exports.create_quiz = async (req, res) => {
  try {
    const created = await Quiz.create(
      {
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        sets: req.body.sets
      }
    )

    res.json({ success: true, msg: `Quiz '${created.title}' has been created` })

  } catch (err) {
    console.error(err)
    res.json({ success: false, msg: JSON.stringify(err) })
  }
}

exports.update_quiz = async (req, res) => {
  try {
    const updated = await Quiz.findByIdAndUpdate(
      { _id: req.body._id },
      {
        title: req.body.title,
        sets: req.body.sets
      },
      { new: true }
    )

    res.json({ success: true, msg: `Quiz '${updated.title}' has been updated` })

  } catch (err) {
    console.error(err)
    res.json({ success: false, msg: JSON.stringify(err) })
  }
}

exports.delete_quiz = async (req, res) => {
  try {
    const deleted = await Quiz.findByIdAndDelete({ _id: req.params.id })

    res.json({ success: true, msg: `Quiz ${deleted.title} has been deleted` })

  } catch (err) {
    console.error(err)
    res.json({ success: false, msg: JSON.stringify(err) })
  }
}
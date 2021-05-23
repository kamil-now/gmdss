const Quiz = require('../models/quiz')
const mongoose = require('mongoose')

exports.list = async (req, res, next) => {
  const list = await Quiz.find({})
  res.json(list)
};

exports.create = async (req, res) => {
  console.log(req.body)
  const created = await Quiz.create(
    {
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      isEditable: req.body.isEditable,
      questions: req.body.questions
    }
  )

  res.json(created)
}

exports.update = async (req, res) => {
  const updated = await Quiz.findByIdAndUpdate(
    { _id: req.body._id },
    {
      title: req.body.title,
      questions: req.body.questions
    },
    { new: true }
  )
  res.json(updated)
}

exports.delete = async (req, res) => {
  const deleted = await Quiz.findByIdAndDelete({ _id: req.params.id })
  res.json(deleted._id)
}
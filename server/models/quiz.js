const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  sets: [
    {
      title: String,
      questions: [
        {
          text: String,
          answers: [{ text: String }],
          correctAnswerIndex: Number
        }
      ]
    }
  ]
})

const Quiz = module.exports = mongoose.model('Quiz', QuizSchema)
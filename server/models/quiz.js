const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  questions: [
    {
      text: String,
      answers: [{ 
        text: String,
        isCorrect: Boolean
      }]
    }
  ]
})

const Quiz = module.exports = mongoose.model('Quiz', QuizSchema)

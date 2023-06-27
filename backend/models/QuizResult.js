const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  examinationId: {
    type: String,
  },
  percentage: {
    type: String,
  },
  quizName: {
    type: String,
    required: true
  },
  quizId:{
    type: String,
    required: true
  },
  quizAnswers: [
    {
      question: {
        type: String,
        required: true
      },
      givenAnswer: {
        type: String,
        required: true
      },
      correctAnswer: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true });

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;

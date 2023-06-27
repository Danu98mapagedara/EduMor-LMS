const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  quizName: {
    type: String,
    required: true
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    answers: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: String,
      required: true
    }
  }],
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level'
  },
  examinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Examination',
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;

const express = require('express');
const router = express.Router();
const QuizController = require('../Controllers/quizController');

//post a quiz
router.post('/level/:id/quiz/save', QuizController.createQuiz);

//get all quiz
router.get('/level/:id', QuizController.getQuizzesByLevel);

//get a specific quiz
router.get('/level/quiz/:id', QuizController.getQuizById);

//update a quiz
router.patch('/level/quiz/:id', QuizController.updateQuizById);

//delete a quiz
router.delete('/:id', QuizController.deleteQuizById);

//get total quizes
router.get('/allQuizes', QuizController.getQuizzes);

module.exports = router;

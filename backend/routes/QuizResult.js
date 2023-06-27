const express = require('express');
const router = express.Router();
const quizResultsController = require('../Controllers/QuizResultsController');
const authMiddleware = require('../Middlewares/authMiddleware');

// POST route to save quiz results
router.post('/', quizResultsController.saveQuizResults);

//Get route for retrieve the data specific to userId and examinationId
router.get('/:userId/:examinationId',authMiddleware, quizResultsController.getQuizResults);

//Get route for retrieve the data specific to userId ,examinationId, quizid
router.get('/:userId/:examinationId/:quizId',authMiddleware, quizResultsController.getQuizResultByAll);

router.get('/:id',authMiddleware, quizResultsController.getQuizResultById);


module.exports = router;

const Quiz = require('../models/quiz');

//save the Quiz
const createQuiz = async (req, res) => {
    const quiz = new Quiz({
        quizName: req.body.quizName,
        questions: req.body.questions,
        level: req.params.id
    });

    try {
        const newQuiz = await quiz.save();
        res.status(201).json(newQuiz);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//get all quizzes by level
const getQuizzesByLevel = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ level: req.params.id });
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//get  quiz by id
const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//update quiz
const updateQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        quiz.quizName = req.body.quizName || quiz.quizName;
        quiz.questions = req.body.questions || quiz.questions;
        quiz.level = req.body.level || quiz.level;

        const updatedQuiz = await quiz.save();
        res.status(200).json(updatedQuiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//delete quiz 
const deleteQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        await quiz.remove();
        res.status(200).json({ message: 'Quiz deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to get the total number of quizzes
const getQuizzes = async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.json(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = { createQuiz, getQuizzesByLevel, getQuizById, updateQuizById, deleteQuizById, getQuizzes };

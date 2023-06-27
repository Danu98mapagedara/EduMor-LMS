const QuizResult = require('../models/QuizResult');


//saving quiz results
exports.saveQuizResults = async (req, res) => {
  const { userId, quizAnswers,level,examinationId,percentage,quizName,quizId} = req.body;

  try {
    const quizResult = new QuizResult({
      userId,
      quizAnswers,
      level,
      examinationId,
      percentage,
      quizName,
      quizId
    });

    await quizResult.save();
    res.status(200).json({ message: 'Quiz results saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save quiz results.' });
  }
};

//Finding records which belong to both userId and examinationId
exports.getQuizResults = (req, res) => {
  const userId = req.params.userId;
  const examinationId = req.params.examinationId;

  QuizResult.find({ userId, examinationId })
    .then(results => {
      res.json({ success: true, results });
    })
    .catch(error => {
      res.status(500).json({ success: false, error: error.message });
    });
};

//get the specific details
exports.getQuizResultByAll = (req, res) => {
  const userId = req.params.userId;
  const examinationId = req.params.examinationId;
  const quizId = req.params.quizId;

  QuizResult.find({ userId, examinationId,quizId })
    .then(results => {
      res.json({ success: true, results });
    })
    .catch(error => {
      res.status(500).json({ success: false, error: error.message });
    });
};

//get specific record using id
exports.getQuizResultById = async (req, res) => {
  try {
    const quizResult = await QuizResult.findById(req.params.id);
    if (!quizResult) {
      return res.status(404).json({ error: 'Quiz result not found.' });
    }
    res.json(quizResult);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the quiz result.' });
  }
};



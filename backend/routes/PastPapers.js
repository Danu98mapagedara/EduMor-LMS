const express = require('express');
const router = express.Router();
const pastPaperController = require('../Controllers/pastPapersController');

// Route for getting all past papers by examination ID
router.get('/examination/:examinationId', pastPaperController.getAllPastPapersByExaminationId);

// Route for creating a new past paper
router.post('/', pastPaperController.createPastPaper);

// Route for getting a past paper by ID
router.get('/:id', pastPaperController.getPastPaperById);

// Route for updating a past paper
router.put('/:id', pastPaperController.updatePastPaper);

// Route for deleting a past paper
router.delete('/:id', pastPaperController.deletePastPaper);

module.exports = router;

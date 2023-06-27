const PastPaper = require('../models/PastPapers');

// Get all past papers by examination ID
exports.getAllPastPapersByExaminationId = async (req, res) => {
  try {
    const examinationId  = req.params.examinationId;
    const pastPapers = await PastPaper.find({ examinationId: examinationId });
    res.status(200).json(pastPapers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch past papers.' });
  }
};

// Create a new past paper
exports.createPastPaper = async (req, res) => {
  try {
    const { title, pastPapersUrl, examinationId } = req.body;
    const pastPaper = await PastPaper.create({ title, pastPapersUrl, examinationId });
    res.status(201).json(pastPaper);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create past paper.' });
  }
};

// Get a past paper by ID
exports.getPastPaperById = async (req, res) => {
  try {
    const { id } = req.params;
    const pastPaper = await PastPaper.findById(id);
    if (!pastPaper) {
      res.status(404).json({ error: 'Past paper not found.' });
    } else {
      res.status(200).json(pastPaper);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch past paper.' });
  }
};

// Update a past paper
exports.updatePastPaper = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, pastPapersUrl, examinationId } = req.body;
    const pastPaper = await PastPaper.findByIdAndUpdate(id, { title, pastPapersUrl, examinationId }, { new: true });
    if (!pastPaper) {
      res.status(404).json({ error: 'Past paper not found.' });
    } else {
      res.status(200).json(pastPaper);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update past paper.' });
  }
};

// Delete a past paper
exports.deletePastPaper = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPastPaper = await PastPaper.findByIdAndRemove(id);
    if (!deletedPastPaper) {
      res.status(404).json({ error: 'Past paper not found.' });
    } else {
      res.status(200).json({ message: 'Past paper deleted successfully.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete past paper.' });
  }
};

// controllers/lectureVideoController.js
const LectureVideo = require('../models/LectureVideos');

// Get all lecture videos
const getAllLectureVideos = async (req, res) => {
  try {
    const lectureVideos = await LectureVideo.find();
    res.json(lectureVideos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new lecture video
const createLectureVideo = async (req, res) => {
  const lectureVideo = new LectureVideo({
    thumbnail: req.body.thumbnail,
    title: req.body.title,
    description: req.body.description,
    videoUrl: req.body.videoUrl,
    examinationId:req.body.examinationId
  });

  try {
    const newLectureVideo = await lectureVideo.save();
    res.status(201).json(newLectureVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all lecture videos for an examination by id
const getLectureVideosForExamination = async (req, res) => {
    try {
      const examinationId = req.params.examinationId;
      const lectureVideos = await LectureVideo.find({ examinationId: examinationId });
      res.json(lectureVideos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Get a specific lecture video
const getLectureVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const lectureVideo = await LectureVideo.findById(id);
    if (lectureVideo) {
      res.json(lectureVideo);
    } else {
      res.status(404).json({ message: 'Lecture video not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a lecture video
const updateLectureVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const { thumbnail, title, description, videoUrl } = req.body;

    const lectureVideo = await LectureVideo.findByIdAndUpdate(
      id,
      { thumbnail, title, description, videoUrl },
      { new: true }
    );

    if (lectureVideo) {
      res.json(lectureVideo);
    } else {
      res.status(404).json({ message: 'Lecture video not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a lecture video
const deleteLectureVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedLectureVideo = await LectureVideo.findByIdAndRemove(id);
    if (deletedLectureVideo) {
      res.json({ message: 'Lecture video deleted' });
    } else {
      res.status(404).json({ message: 'Lecture video not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get all lecture videos
const getVideos = async (req, res) => {
  try {
    const lectureVideos = await LectureVideo.find();
    res.json(lectureVideos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get lecture videos' });
  }
};

module.exports = {
  getAllLectureVideos,
  createLectureVideo,
  getLectureVideosForExamination,
  getLectureVideo,
  updateLectureVideo,
  deleteLectureVideo,
  getVideos,
};

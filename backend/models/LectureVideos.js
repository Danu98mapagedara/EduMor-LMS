const mongoose = require('mongoose');

const lectureVideoSchema = new mongoose.Schema({
  thumbnail: String,
  title: String,
  description: String,
  videoUrl: String,
  examinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Examination',
  },
});

module.exports = mongoose.model('LectureVideo', lectureVideoSchema);

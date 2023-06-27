const mongoose = require('mongoose');

const examinationSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    // required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  lectureVideos: [{
    videoName: {
      type: String,
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    }
  }],
  pastPapers: [{
    pastPaperName: {
      type: String,
      required: true
    },
    pastPaperUrl: {
      type: String,
      required: true
    }
  }],
  levels: [{
    levelName: {
      type: String,
      required: true
    },
    quizzes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    }]
  }]
});

const Examination = mongoose.model('Examination', examinationSchema);

module.exports = Examination;

const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  examinationId: {
    type: String,
    required: true,
  },
  examinationName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  photo:{
    type: String,
  }
},{ timestamps: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
const mongoose = require('mongoose');

const pastPapersSchema = new mongoose.Schema({
  title: String,
  pastPapersUrl: String,
  examinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Examination',
  },
});

module.exports = mongoose.model('PastPapers', pastPapersSchema);

const Enrollment = require('../models/Enrollment');

// Controller for enrolling a user in an examination
exports.createEnrollment = (req, res) => {
  const { examinationId, examinationName, userId, photo} = req.body;

  const enrollment = new Enrollment({
    examinationId,
    examinationName,
    userId,
    photo
  });

  enrollment
    .save()
    .then(() => {
      res.json({ success: true, message: 'Enrollment created successfully.' });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err.message });
    });
};

// Controller for getting the enrolled examinations for a particular user
exports.getEnrollments = async (req, res) => {
  try {
    const userId = req.params.userId;

    const enrollments = await Enrollment.find({ userId })
      .populate('examinationId')
      .select('-__v')
      .sort({ createdAt: 'desc' })
      .exec();

    res.json({ success: true, enrollments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getEnrollmentsByUserIdAndExaminationId = async (req, res) => {
  try {
    const { userId, examinationId } = req.params;

    const enrollments = await Enrollment.find({
      userId: userId,
      examinationId: examinationId,
    });

    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

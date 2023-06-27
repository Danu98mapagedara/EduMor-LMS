const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');
const enrollmentController = require('../Controllers/enrollmentController');

// Route for enrolling a user in an examination
router.post('/', enrollmentController.createEnrollment);

// Route for getting the enrolled examinations for a particular user
router.get('/:userId', enrollmentController.getEnrollments);

router.get('/:userId/:examinationId', enrollmentController.getEnrollmentsByUserIdAndExaminationId);

module.exports = router;

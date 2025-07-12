const express = require('express');
const {
  enroll,
  getMyEnrollments,
  getCourseEnrollments
} = require('../controllers/enrollmentController');

const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Student enroll in course
router.post('/enroll/:courseId', authenticateToken, authorizeRoles('student'), enroll);

// Student: view own enrolled courses
router.get('/my-courses', authenticateToken, authorizeRoles('student'), getMyEnrollments);

// Instructor: view students of a course
router.get('/course/:courseId/students', authenticateToken, authorizeRoles('instructor'), getCourseEnrollments);

module.exports = router;

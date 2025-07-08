const express = require('express');
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected (Instructor Only)
router.post('/', authenticateToken, authorizeRoles('instructor'), createCourse);
router.put('/:id', authenticateToken, authorizeRoles('instructor'), updateCourse);
router.delete('/:id', authenticateToken, authorizeRoles('instructor'), deleteCourse);

module.exports = router;

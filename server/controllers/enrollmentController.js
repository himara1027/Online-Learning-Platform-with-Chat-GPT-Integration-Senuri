const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Enroll in a course
exports.enroll = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id;

    // Prevent duplicate enrollment
    const exists = await Enrollment.findOne({ student: studentId, course: courseId });
    if (exists) return res.status(400).json({ message: 'Already enrolled' });

    const enrollment = new Enrollment({ student: studentId, course: courseId });
    await enrollment.save();

    res.status(201).json({ message: 'Enrolled successfully', enrollment });
  } catch (err) {
    res.status(500).json({ message: 'Enrollment failed' });
  }
};

// Get student’s enrolled courses
exports.getMyEnrollments = async (req, res) => {
  try {
    const studentId = req.user._id;
    const enrollments = await Enrollment.find({ student: studentId }).populate('course');

    res.json(enrollments.map(e => e.course));
  } catch (err) {
    res.status(500).json({ message: 'Failed to load enrollments' });
  }
};

// Instructor: Get students enrolled in one course
exports.getCourseEnrollments = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const enrollments = await Enrollment.find({ course: courseId }).populate('student', 'username');

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load enrolled students' });
  }
};

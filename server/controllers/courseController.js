const Course = require('../models/Course');

// Create Course (Instructor only)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const instructor = req.user._id;

    const newCourse = new Course({ title, description, content, instructor });
    await newCourse.save();

    res.status(201).json({ message: 'Course created', course: newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create course' });
  }
};

// Get All Courses (anyone)
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'username role');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get courses' });
  }
};

// Get Single Course
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'username role');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get course' });
  }
};

// Update Course (Instructor only)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Check ownership
    if (!course.instructor.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized to update this course' });
    }

    const { title, description, content } = req.body;
    course.title = title || course.title;
    course.description = description || course.description;
    course.content = content || course.content;

    await course.save();
    res.json({ message: 'Course updated', course });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update course' });
  }
};

// Delete Course (Instructor only)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (!course.instructor.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized to delete this course' });
    }

    await course.deleteOne(); 
    res.json({ message: 'Course deleted' });
  } catch (err) {
    console.error('Delete Course Error:', err); 
    res.status(500).json({ message: 'Failed to delete course', error: err.message });
  }
};


// Get courses created by the logged-in instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user._id;
    const courses = await Course.find({ instructor: instructorId });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch instructor courses' });
  }
};


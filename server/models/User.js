const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  age:       { type: Number, required: true },
  email:     { type: String, required: true, unique: true },
  username:  { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  role:      { type: String, enum: ['student', 'instructor'], required: true },
});

module.exports = mongoose.model('User', userSchema);

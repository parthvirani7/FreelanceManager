const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: { type: String, enum: ['Pending', 'Ongoing', 'Completed'] },
});

module.exports = mongoose.model('Project', projectSchema);

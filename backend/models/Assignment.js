const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  task: { type: String, required: true },
  admin: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const assignment = mongoose.model('Assignment', assignmentSchema);
module.exports=assignment;
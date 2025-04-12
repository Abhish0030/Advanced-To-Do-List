const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['work', 'personal', 'shopping', 'other'],
    default: 'personal'
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  alarmSet: {
    type: Boolean,
    default: false
  },
  alarmTime: {
    type: Date
  }
});

module.exports = mongoose.model('Task', taskSchema);
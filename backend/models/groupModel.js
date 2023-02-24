const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  groupMembers: {
    type: Array,
    default: [],
  },
  calendarEvents: {
    type: Array,
    default: [],
  },
  admin: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Group', groupSchema);

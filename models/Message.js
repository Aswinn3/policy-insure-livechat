const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: Date,
});

module.exports = mongoose.model('Message', MessageSchema);

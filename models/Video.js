// models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  category: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ text: String }]
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;

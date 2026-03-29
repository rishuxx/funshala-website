const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
  alt: { type: String, required: true },
  category: { type: String, required: true },
  src: { type: String, required: true }, // Path to the image file
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);

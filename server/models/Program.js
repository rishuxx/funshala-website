const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ageGroup: { type: String, required: true },
  duration: { type: String, required: true },
  fee: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Program', ProgramSchema);

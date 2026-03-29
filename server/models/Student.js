const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  className: { type: String, required: true },
  parentName: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);

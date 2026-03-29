const Program = require('../models/Program');

exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find({});
    res.json({ success: true, data: programs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.createProgram = async (req, res) => {
  try {
    const program = await Program.create(req.body);
    res.status(201).json({ success: true, message: 'Program created', data: program });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data' });
  }
};

exports.updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.json({ success: true, message: 'Program updated', data: program });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data' });
  }
};

exports.deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.json({ success: true, message: 'Program removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

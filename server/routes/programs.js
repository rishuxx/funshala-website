const express = require('express');
const router = express.Router();
const { getPrograms, createProgram, updateProgram, deleteProgram } = require('../controllers/programController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getPrograms).post(protect, createProgram);
router.route('/:id').put(protect, updateProgram).delete(protect, deleteProgram);

module.exports = router;

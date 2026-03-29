const express = require("express");
const router = express.Router();
const {
  createFormSubmission,
  getFormSubmissions,
  updateFormSubmission,
  deleteFormSubmission,
} = require("../controllers/formController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(createFormSubmission).get(protect, getFormSubmissions);

router
  .route("/:id")
  .put(protect, updateFormSubmission)
  .delete(protect, deleteFormSubmission);

module.exports = router;

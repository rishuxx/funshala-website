const mongoose = require("mongoose");

const FormSubmissionSchema = new mongoose.Schema({
  formType: {
    type: String,
    required: true,
    enum: ["admission", "franchise", "contact"],
  },
  formData: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  status: {
    type: String,
    enum: ["New", "Contacted", "In Progress", "Closed"],
    default: "New",
  },
  adminNotes: {
    type: String,
    default: "",
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FormSubmission", FormSubmissionSchema);

const FormSubmission = require("../models/FormSubmission");

exports.createFormSubmission = async (req, res) => {
  const { formType, formData } = req.body;
  try {
    const submission = await FormSubmission.create({ formType, formData });
    res
      .status(201)
      .json({
        success: true,
        message: "Form submitted successfully",
        data: submission,
      });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Invalid form data",
        error: error.message,
      });
  }
};

exports.getFormSubmissions = async (req, res) => {
  try {
    const { type } = req.query; // e.g., /api/forms?type=admission
    const query = type ? { formType: type } : {};
    const submissions = await FormSubmission.find(query).sort({
      submittedAt: -1,
    });
    res.json({ success: true, data: submissions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateFormSubmission = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const submission = await FormSubmission.findById(req.params.id);

    if (!submission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }

    if (status) submission.status = status;
    if (adminNotes !== undefined) submission.adminNotes = adminNotes;

    await submission.save();
    res.json({
      success: true,
      message: "Updated successfully",
      data: submission,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

exports.deleteFormSubmission = async (req, res) => {
  try {
    const submission = await FormSubmission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

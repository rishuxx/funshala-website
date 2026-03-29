const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const {
  getGalleryImages,
  uploadImage,
  deleteImage,
  updateImage,
} = require("../controllers/galleryController");
const { protect } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

router.route("/").get(getGalleryImages);
router.route("/upload").post(protect, upload.single("image"), uploadImage);
router.route("/:id").put(protect, updateImage).delete(protect, deleteImage);

module.exports = router;

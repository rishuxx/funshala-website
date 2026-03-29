const GalleryImage = require("../models/GalleryImage");
const fs = require("fs");
const path = require("path");

exports.getGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const { alt, category } = req.body;
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image file uploaded" });
    }
    const src = `/uploads/${req.file.filename}`;

    const newImage = await GalleryImage.create({
      alt,
      category,
      src,
    });
    res
      .status(201)
      .json({ success: true, message: "Image uploaded", data: newImage });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error uploading image",
        error: error.message,
      });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { alt, category } = req.body;
    const image = await GalleryImage.findById(req.params.id);

    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    image.alt = alt || image.alt;
    image.category = category || image.category;

    const updatedImage = await image.save();
    res.json({ success: true, message: "Image updated", data: updatedImage });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error updating image",
        error: error.message,
      });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    // Remove file from server
    const imagePath = path.join(__dirname, "..", image.src);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        // We can still proceed to delete from DB
      }
    });

    await image.deleteOne(); // Use deleteOne instead of remove

    res.json({ success: true, message: "Image removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const { multipleUpload } = require("../controller/uploadCtrl");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const uploadToCloudinary = require("../middlewares/upload");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
    files: 10,
  },
});

// others endpoints
router.post("/", upload.single("file"), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const result = await uploadToCloudinary(req.file);
    console.log(req.file)
    return res.status(201).json({
      url: result.url,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.post("/multiple", upload.array("files"), async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  try {
    const urls = await Promise.all(req.files.map(uploadToCloudinary));
    return res.status(201).json({
      urls: urls.map((result) => result.url),
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});
module.exports = router;

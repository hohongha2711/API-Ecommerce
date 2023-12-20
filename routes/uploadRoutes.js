const { multipleUpload } = require("../controller/uploadCtrl");
const express = require("express");
const router = express.Router();


router.post("/", multipleUpload);

module.exports = router
const express = require("express");

const router = express.Router();

const { createBrand, getBrands, getBrand } = require("../controller/brandCtrl");

router.post("/", createBrand);
router.get("/", getBrands);
router.get("/get-brand-by-id/:id", getBrand)
module.exports = router

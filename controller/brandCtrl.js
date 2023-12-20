const asynHandeler = require("express-async-handler");
const slugify = require("slugify");
const Brand = require("../models/brandModel");

const createBrand = asynHandeler(async (req, res) => {
  try {
    const nameBrand = req.body.name;
    const brand = await Brand.findOne({ name: nameBrand });
    if (!brand) {
      req.body.slugs = {};
      req.body.slugs.slugName = slugify(req.body.name);
      req.body.slugs.slugDistrict = slugify(req.body.location.district);
      req.body.slugs.slugProvince = slugify(req.body.location.province);
      const newBrand = await Brand.create(req.body);
      res.json(newBrand);
    } else {
      throw new Error("Brand'name is already exists");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getBrands = asynHandeler(async (req, res) => {
  try {
    const { name, province, district } = req.query;
    const filter = {};
    if (name) {
      filter["slugs.slugName"] = name;
    }
    if (province) {
      filter["slugs.slugProvince"] = province;
    }
    if (district) {
      filter["slugs.slugDistrict"] = district;
    }
    const brands = await Brand.find(filter);
    res.json(brands);
  } catch (error) {
    throw new Error(error);
  }
});

const getBrand = asynHandeler(async (req, res) => {
  try {
    const { id } = req.params;
    const getBrand = await Brand.findById(id);
    res.json(getBrand);
  } catch (error) {
    throw new Error(error);
  }
});


module.exports = { createBrand, getBrands, getBrand };

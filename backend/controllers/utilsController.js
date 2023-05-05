// Utils Model Import
const Utils = require("../mongo/models/utilsModel");
const UtilsSales = require("../mongo/models/utilsSalesModel");
const cloudinary = require("cloudinary");

// Get All Utils
exports.getAllUtils = async (req, res, next) => {
  const utils = await Utils.find();
  res.status(200).json({
    success: true,
    utils,
  });
};

// Get All Utils Sales
exports.getAllUtilsSales = async (req, res, next) => {
  const utilsSales = await UtilsSales.find();
  res.status(200).json({
    success: true,
    utilsSales,
  });
};

// Create Utils
exports.createUtils = async (req, res, next) => {
  const cloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "utils",
    width: 250,
    crop: "scale",
  });

  const { name, stock, amount } = req.body.utils;

  const utils = await Utils.create({
    name,
    image: {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    },
    stock,
    amount,
  });
  res.status(201).json({
    success: true,
    utils,
  });
};

// Create Utils Sales
exports.createUtilsSales = async (req, res, next) => {
  const utilsSales = await UtilsSales.create(req.body);
  res.status(201).json({
    success: true,
    utilsSales,
  });
};

// Update Utils Sale Record
exports.updateUtilsSaleRecord = async (req, res, next) => {
  const utilsSales = await UtilsSales.findByIdAndUpdate(
    req.body.userId,
    {
      $push: { sales: req.body.salesData },
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
    utilsSales,
  });
};

// update unpaid utils sales record
exports.updateUnpaidUtilsSalesRecord = async (req, res, next) => {
  const utilsSale = await UtilsSales.updateOne(
    { _id: req.body.saleId },
    {
      "sale.isPaid": req.body.isPaid,
      "sale.amountBalance": req.body.amountBalance,
      "sale.amountPaid": req.body.amountPaid,
    }
  );
  res.status(200).json({
    success: true,
    utilsSale,
  });
};

// delete utils sales record
exports.deleteUtilsSalesRecord = async (req, res, next) => {
  const utilsSale = await UtilsSales.updateOne(
    { _id: req.body.userId },
    { $pull: { sales: { _id: req.body.salesId } } }
  );
  res.status(200).json({
    success: true,
    utilsSale,
  });
};

// Update Utils stock

exports.updateUtilsStock = async (req, res) => {
  const utils = await Utils.updateOne(
    { _id: req.body.utilId },
    { stock: req.body.stock }
  );
  res.status(200).json({
    success: true,
    utils,
  });
}; 

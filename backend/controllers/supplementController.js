// Supplements Model Import
const Supplement = require("../mongo/models/supplementModel");
const SupplementSales = require("../mongo/models/supplementSalesModel");
const cloudinary = require("cloudinary");

// Get All Supplements
exports.getAllSupplements = async (req, res, next) => {
  const supplement = await Supplement.find();
  res.status(200).json({
    success: true,
    supplement,
  });
};

// Get All Supplement Sales
exports.getAllSupplementSales = async (req, res, next) => {
  const supplementSales = await SupplementSales.find();
  res.status(200).json({
    success: true,
    supplementSales,
  });
};

// Create Supplement
exports.createSupplement = async (req, res, next) => {
  const cloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "supplements",
    width: 250,
    crop: "scale",
  });

  const { name, stock, amount } = req.body.supplement;

  const supplement = await Supplement.create({
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
    supplement,
  });
};

// Create Supplement Sales
exports.createSupplementSales = async (req, res, next) => {
  const supplementSales = await SupplementSales.create(req.body);
  res.status(201).json({
    success: true,
    supplementSales,
  });
};

// Update Utils Sale Record
// exports.updateUtilsSaleRecord = async (req, res, next) => {
//   const utilsSales = await UtilsSales.findByIdAndUpdate(
//     req.body.userId,
//     {
//       $push: { sales: req.body.salesData },
//     },
//     { new: true, runValidators: true, useFindAndModify: false },
//   )
//   res.status(200).json({
//     success: true,
//     utilsSales,
//   })
// }

// update unpaid utils sales record
exports.updateUnpaidSupplementsSalesRecord = async (req, res, next) => {
  const utilsSale = await SupplementSales.updateOne(
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

// delete supplement sales record
exports.deleteSupplementSalesRecord = async (req, res, next) => {
  const supplement = await SupplementSales.findById(req.body.id);
  if (!supplement) {
    return res.status(404).json({
      success: false,
      message: "Supplement not found!",
    });
  }
  await supplement.remove();
  res.status(200).json({
    success: true,
    message: "Deleted!",
  });
};

// Update Supplement stock

exports.updateSupplementStock = async (req, res) => {
  const supplement = await Supplement.updateOne(
    { _id: req.body.supplementId },
    { stock: req.body.stock }
  );
  res.status(200).json({
    success: true,
    supplement,
  });
};

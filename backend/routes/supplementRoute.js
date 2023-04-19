const express = require("express");
const router = express.Router();

// Controllers
const {
  getAllSupplements,
  createSupplement,
  getAllSupplementSales,
  createSupplementSales,
  deleteSupplementSalesRecord,
  updateUnpaidUtilsSalesRecord
} = require("../controllers/supplementController");

router.get("/supplement", getAllSupplements);
router.post("/supplement/create", createSupplement);
router.get("/supplement/sales", getAllSupplementSales);
router.post("/supplement/sales/create", createSupplementSales);
router.delete("/supplement/sales/delete", deleteSupplementSalesRecord);
router.put("/supplement/sales/update", updateUnpaidUtilsSalesRecord);

module.exports = router;

const express = require("express");
const router = express.Router();

// Controllers
const {
  getAllUtils,
  getAllUtilsSales,
  createUtils,
  createUtilsSales,
  updateUtilsSaleRecord,
  updateUnpaidUtilsSalesRecord,
  deleteUtilsSalesRecord,
  updateUtilsStock,
} = require("../controllers/utilsController");

router.get("/utils", getAllUtils);
router.post("/utils/create", createUtils);
router.put("/utils/stock", updateUtilsStock);
router.get("/utils/sales", getAllUtilsSales);
router.post("/utils/sales/create", createUtilsSales);
router.put("/utils/sales/update", updateUtilsSaleRecord);
router.put("/utils/sales/update/unpaid", updateUnpaidUtilsSalesRecord);
router.delete("/utils/sales/delete", deleteUtilsSalesRecord);

module.exports = router;

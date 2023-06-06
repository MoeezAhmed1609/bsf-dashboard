const express = require("express");
const router = express.Router();

// Controllers
const {
  getAllClients,
  createClient,
  updateClientFees,
  getClientDetails,
  updateClientStatus,
  updateClientAdmissionLedger,
  updateClientFeesLedger,
  deleteClient,
  editClient,
} = require("../controllers/clientController");

router.get("/clients", getAllClients);
router.post("/clients/admission", createClient);
router.get("/clients/:id", getClientDetails);
router.put("/clients/update/fees", updateClientFees);
router.put("/clients/update/status", updateClientStatus);
router.put("/clients/update/admission", updateClientAdmissionLedger);
router.put("/clients/update/fee", updateClientFeesLedger);
router.delete("/clients/delete", deleteClient);
router.put("/clients/edit", editClient);

module.exports = router;

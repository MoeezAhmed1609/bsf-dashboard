const express = require('express')
const router = express.Router()

// Controllers
const {
  getAllClients,
  createClient,
  updateClientFees,
  getClientDetails,
  updateClientStatus
} = require('../controllers/clientController')

router.get('/clients', getAllClients)
router.post('/clients/admission', createClient)
router.get('/clients/:id', getClientDetails)
router.put('/clients/update/fees', updateClientFees)
router.put('/clients/update/status', updateClientStatus)

module.exports = router

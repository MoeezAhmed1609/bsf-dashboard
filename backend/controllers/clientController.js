// Client Model Import
const Client = require("../mongo/models/clientModel");
const cloudinary = require("cloudinary");

// Get All Clients
exports.getAllClients = async (req, res, next) => {
  const clients = await Client.find();
  res.status(200).json({
    success: true,
    clients,
  });
};

// Create Client
exports.createClient = async (req, res, next) => {
  const cloud = await cloudinary.v2.uploader.upload(req.body.profile, {
    folder: "profiles",
    width: 250,
    crop: "scale",
  });

  const {
    date,
    package,
    name,
    gender,
    marital,
    age,
    height,
    weight,
    goalWeight,
    lifeStatus,
    address,
    phone,
    mobile,
    email,
    cnic,
    trainer,
    gymBefore,
    problem,
    guardian,
    isFeePaid,
    isAdmissionFeePaid,
    feeReminder,
    isFeeReminded,
    fees,
  } = req.body.client;

  const client = await Client.create({
    date,
    package,
    name,
    gender,
    marital,
    age,
    height,
    weight,
    goalWeight,
    lifeStatus,
    address,
    phone,
    mobile,
    email,
    cnic,
    trainer,
    gymBefore,
    problem,
    guardian,
    isFeePaid,
    isAdmissionFeePaid,
    feeReminder,
    isFeeReminded,
    profile: {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    },
    fees,
  });
  res.status(201).json({
    success: true,
    client,
  });
};

// Get client details
exports.getClientDetails = async (req, res, next) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    res.status(200).json({
      success: false,
      message: "Client not found!",
    });
  }

  res.status(200).json({
    success: true,
    client,
  });
};

// Update Client Fees
exports.updateClientFees = async (req, res, next) => {
  let client = await Client.findById(req.body.clientId);
  if (!client) {
    res.status(500).json({
      success: false,
      message: "Client not found!",
    });
  }
  client = await Client.findByIdAndUpdate(
    req.body.clientId,
    {
      $push: { fees: req.body.updateFee },
      feeReminder: req.body.feeReminder,
      isFeeReminded: false,
      lastFeePaidDate: req.body.lastFeePaidDate,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
    client,
  });
};

// Update Client Status
exports.updateClientStatus = async (req, res, next) => {
  let client = await Client.findById(req.body.clientId);
  if (!client) {
    res.status(500).json({
      success: false,
      message: "Client not found!",
    });
  }
  client = await Client.findByIdAndUpdate(
    req.body.clientId,
    {
      status: req.body.status,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
    client,
  });
};

// Update Client Admission ledger
exports.updateClientAdmissionLedger = async (req, res, next) => {
  let client = await Client.findById(req.body.clientId);
  if (!client) {
    res.status(500).json({
      success: false,
      message: "Client not found!",
    });
  }
  client = await Client.findByIdAndUpdate(
    req.body.clientId,
    {
      isAdmissionFeePaid: req.body.isAdmissionFeePaid,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
    client,
  });
};

// update unpaid fees record
exports.updateClientFeesLedger = async (req, res, next) => {
  const client = await Client.updateOne(
    { "fees._id": req.body.feesId },
    {
      $set: {
        "fees.$.status": req.body.status,
        "fees.$.paidDate": req.body.paidDate,
        "fees.$.paidAmount": req.body.paidAmount,
        "fees.$.balanceAmount": req.body.balanceAmount,
      },
    }
  );
  res.status(200).json({
    success: true,
    client,
  });
};

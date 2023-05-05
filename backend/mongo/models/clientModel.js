const mongoose = require("mongoose");
require("datejs");

const clientSchema = mongoose.Schema({
  status: { type: String, default: "Active" },
  date: { type: String, required: [true, "Date must be mentioned"] },
  package: { type: String, required: [true, "Package must be mentioned"] },
  name: {
    type: String,
    required: [true, "Full Name is required!"],
    minLength: [3, "Name must have at least 3 characters!"],
  },
  profile: {
    public_id: String,
    url: String,
  },
  gender: {
    type: String,
    required: [true, "Gender is required!"],
  },
  marital: {
    type: String,
    required: [true, "Marital Status is required!"],
  },
  age: {
    type: Number,
    required: [true, "Age is required!"],
  },
  height: String,
  weight: String,
  goalWeight: String,
  lifeStatus: {
    type: String,
    required: [true, "Life Status is required!"],
  },
  address: {
    type: String,
    required: [true, "Address is required!"],
  },
  phone: {
    type: String,
  },
  mobile: {
    type: String,
    required: [true, "Mobile Number is required!"],
  },
  email: String,
  cnic: {
    type: String,
  },
  trainer: {
    type: String,
  },
  gymBefore: String,
  problem: String,
  guardian: {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    relation: {
      type: String,
    },
  },
  isAdmissionFeePaid: {
    status: {
      type: String,
      required: [true, "Admission Fee status is required!"],
    },
    amountPaid: {
      type: String,
      required: [true, "Admission Fee amount is required!"],
    },
    amountBalance: {
      type: String,
      required: [true, "Admission Fee amount is required!"],
    },
    amount: {
      type: String,
      required: [true, "Admission Fee amount is required!"],
    },
    method: {
      type: String,
      required: [true, "Admission Payment Method is required!"],
    },
  },
  fees: [
    {
      status: String,
      feeDate: {
        type: String,
      },
      paidDate: {
        type: String,
      },
      month: {
        type: String,
        default: function () {
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          const d = Date.parse(this.paidDate);
          return monthNames[d.getMonth()];
        },
      },
      amount: {
        type: String,
      },
      paidAmount: String,
      balanceAmount: String,
      method: {
        type: String,
        required: [true, "Fee Payment Method is required!"],
      },
    },
  ],
  feeReminder: String,
  isFeeReminded: Boolean,
  lastFeePaidDate: {
    type: String,
  },
});

module.exports = mongoose.model("Client", clientSchema);

const mongoose = require("mongoose");

const supplementSalesSchema = mongoose.Schema({
  customer: {
    type: String,
    required: [true, "Customer name is required!"],
  },
  sale: {
    isPaid: { type: Boolean, default: false },
    date: { type: String, required: [true, "Date must be mentioned"] },
    category: {
      type: String,
      default: "Supplement"
    },
    year: {
      type: String,
    },
    month: { 
      type: String,
    },
    items: [
      {
        id: String,
        item: {
          type: String,
          required: [true, "Product description is required!"],
        },
        quantity: {
          type: Number,
          required: [true, "Identify product quantity!"],
        },
        amount: Number,
      },
    ],
    amountPaid: { type: Number, required: true },
    amountBalance: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Supplements Sales", supplementSalesSchema);

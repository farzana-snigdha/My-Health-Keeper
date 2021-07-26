const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SMSPayment = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    transactionId: {
      type: String,
      required: true,
    },
    paymentDone: {
      type: Boolean,
      default: false,
    },
    userPhone: {
      type: String,
    },
    amount:{
        type:Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("smspayment", SMSPayment);

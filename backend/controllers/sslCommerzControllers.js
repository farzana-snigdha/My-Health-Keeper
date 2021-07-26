const SSLCommerz = require("ssl-commerz-node");
const PaymentSession = SSLCommerz.PaymentSession;
const shortid = require("shortid");
const PaymentModel = require("../models/Payment.models");
require("dotenv").config();

setInterval(() => {
  // console.log('ss')
  // let user = req.headers['userid'];
  PaymentModel.find({}, (err, ans) => {
    if (err) {
      console.log("PaymentModel notification: ", err);
    }
    if (ans) {
      //for loop reminder.size,
      for (i = 0; i < ans.length; i++) {
        let paymentDate = ans[i].paymentDate;
        let curDate = new Date();
        let timeDiff = curDate.getTime() - paymentDate.getTime();
        let daysDiff = timeDiff / (1000 * 24 * 3600);
        if (daysDiff > 30) {
          PaymentModel.findByIdAndUpdate(
            ans[i]._id,
            { paymentDone: false },
            (err, remind) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    }
  });
}, 60000);

// For live payment set first parameter `false` and for sandbox set it `true`
const payment = new PaymentSession(
  true,
  process.env.STORE_ID,
  process.env.STORE_PASSWORD
);

exports.SSLCommerz_payment_init = async (req, res) => {
  // console.log(req.body);

  const { total_amount } = req.body;

  const transactionId = `transaction_${shortid.generate()}`;
  // let paymentDone = false;

  try {
    // Set the urls
    payment.setUrls({
      // success: "yoursite.com/success", // If payment Succeed
      success: `http://127.0.0.1:5000/payment/success?transactionId=${transactionId}`, // If payment Succeed
      fail: `http://127.0.0.1:5000/payment/fail`, // If payment failed
      cancel: `http://127.0.0.1:5000/payment/cancel`, // If user cancel payment
      ipn: `http://127.0.0.1:5000/ipn`, // SSLCommerz will send http post request in this link
    });
    // Set order details
    payment.setOrderInfo({
      total_amount: 100, // Number field
      currency: "BDT", // Must be three character string
      tran_id: transactionId, // Unique Transaction id
      emi_option: 0, // 1 or 0
      multi_card_name: "internetbank", // Do not Use! If you do not customize the gateway list,
      allowed_bin: "371598,371599,376947,376948,376949", // Do not Use! If you do not control on transaction
      emi_max_inst_option: 3, // Max instalment Option
      emi_allow_only: 0, // Value is 1/0, if value is 1 then only EMI transaction is possible
    });

    // Set customer info
    const { user, userPhone } = customerInfo;
    payment.setCusInfo({
      user: user,
      userPhone: userPhone,
    });

    // Initiate Payment and Get session key
    payment.paymentInit().then(async (response) => {
      console.log("paymentInit", response);
      res.send(response["GatewayPageURL"]);
      // paymentDone = response["status"] === "SUCCESS";

      const SMSPayment = new PaymentModel({
        _id: transactionId,
        user,
        userPhone,
        total_amount: 100,
        transactionId,
        // paymentDone,
      });
      const save = await SMSPayment.save();
    });
  } catch (err) {
    console.log("SMSPayment  ", err);
    return res.status(400).json({ error });
  }
};

exports.SSLCommerz_payment_success = async (req, res) => {
  const { transactionId } = req.query;

  if (!transactionId) {
    return res.json({ message: "transactionId must be required" });
  } else {
    const currentPayment = PaymentModel.findByIdAndUpdate(transactionId, {
      paymentDone: true,
      paymentDate: Date.now(),
    });

    currentPayment.exec((err, result) => {
      if (err) console.log(err);
      res.redirect(
        `http://127.0.0.1:5001/profile/success`
      );
    });
  }
};

exports.SSLCommerz_payment_fail = (req, res) => {
  res.redirect(`http://127.0.0.1:5001/profile/fail`);
};

exports.SSLCommerz_payment_cancel = (req, res) => {
  res.redirect(`http://127.0.0.1:5001/profile/cancel`);
};

// -------------------------------- After Success

// console.log(response['sessionkey']);
//     D37CD2C0A0D322991531D217E194F981

// console.log(response['GatewayPageURL']);
//     https://sandbox.sslcommerz.com/EasyCheckOut/testcded37cd2c0a0d322991531d217e194f981

// -------------------------------- After Failure (Wrong Store ID)

// console.log(response['status']);
//     FAILED

// console.log(response['failedreason']);
//     Store Credential Error Or Store is De-active

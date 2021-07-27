const medConfirmation = require("../../models/medicineConfirmation.model");
const UserModel = require("../../models/userModel");
const sendEmail = require("../sendMail.Controllers");

const sendSMS = require("../SMS.controllers");

setInterval(() => {
  medConfirmation.find({}, (err, reminder) => {
    if (err) {
      console.log("medConfirmation notification: ", err);
    }
    if (reminder) {
      for (i = 0; i < reminder.length; i++) {
        if (!reminder[i].isReminded) {
          var input = reminder[i].medtime;

          var input1 = reminder[i].meddate;
          const q = new Date(input1);
          const aaq = q.toISOString().slice(0, 11) + input + ":00.00";
          const time1 = new Date(aaq);

          if (time1.getTime() - Date.now() < 0) {
            console.log(time1.getTime() - Date.now());

            medConfirmation.findByIdAndUpdate(
              reminder[i]._id,
              {
                isReminded: true,
              },
              (err, remind) => {
                if (err) {
                  console.log(err);
                }
                let msg = `REMINDER for ${remind.medname}!!`;

                UserModel.find({ email: remind.userEmail }).then((res1) => {
                  const userPhone = res1[0].phone;

                  sendSMS(userPhone, msg);
                });

                sendEmail(remind.userEmail, "", msg, "", "");
              }
            );
          }
        }
      }
    }
  });
}, 1000);
const getDoses = async (req, res) => {
  let user = req.user.id;
  const date1 = new Date();
  console.log(new Date(date1.toISOString().slice(0, 10)));

  medConfirmation
    .find({
      user: user,
      meddate: "/^" + new Date(date1.toISOString().slice(0, 10)) + "/",
      isTaken: false,
    })
    .sort({
      medtime: 1,
    })
    .then((result) => {
      res.send(result);
    });
};

const getMissedDoses = async (req, res) => {
  let user = req.user.id;
  const date1 = new Date();
  console.log(new Date(date1.toISOString().slice(0, 10)));

  medConfirmation.find(
    {
      user: user,
      doseId: req.params.id,
      meddate: { $lt: new Date(date1.toISOString().slice(0, 10)) },
      isTaken: false,
    },
    (err, doseList) => {
      if (err) {
        console.log(user);
        console.log("Test :" + err);
      }
      if (doseList) {
        res.send(doseList);
        console.log(doseList);
        console.log("done");
      }
    }
  );
};

const doseConfirmUpdate = async (req, res) => {
  let user = req.headers["userid"];
  medConfirmation.find({ user }, (err, doseList) => {
    if (err) {
      console.log(user);
      console.log("Test :" + err);
    }
    if (doseList) {
      var query = { _id: req.params.id };
      var newvalue = { $set: { isTaken: true } };
      medConfirmation
        .updateOne(query, newvalue)
        .then(() => res.json("Confirmed."))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
};

module.exports = { getDoses, doseConfirmUpdate, getMissedDoses };

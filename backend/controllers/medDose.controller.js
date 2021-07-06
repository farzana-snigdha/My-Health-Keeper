const medConfirmation = require("../models/medicineConfirmation.model");

const getDoses = async (req, res) => {
  let user = req.user.id;
  const date1 = new Date();
  console.log(new Date(date1.toISOString().slice(0, 10)));

  medConfirmation.find(
    {
      user: user,
      meddate: "/^" + new Date(date1.toISOString().slice(0, 10)) + "/",
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
      }
    }
  );
};

const doseConfirmUpdate = async (req, res) => {
  let user = req.user.id;
  medConfirmation.find({ user }, (err, doseList) => {
    if (err) {
      console.log(user);
      console.log("Test :" + err);
    }
    if (doseList) {
      var newvalue = { $set: { isTaken: true } };
      medConfirmation.updateOne(req.params.id, newvalue, function (err, res) {
        if (err) {
          res.status(400).json("Error: " + err);
        } else {
          res.json("Dose Confirmed.");
        }
      });
    }
  });
};

module.exports = { getDoses, doseConfirmUpdate };

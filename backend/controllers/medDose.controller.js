const medConfirmation = require("../models/medicineConfirmation.model");

const getDoses = async (req, res) => {
    let user = req.user.id;

    medConfirmation.find({
        "user": user,
        "meddate": Date.now,
        "isTaken": false
      }, (err, doseList) => {
        if (err) {
          console.log(user);
          console.log("Test :" + err);
        }
        if (doseList) {
          res.send(doseList);
          console.log(doseList);
        }
      });
};

module.exports = { getDoses };
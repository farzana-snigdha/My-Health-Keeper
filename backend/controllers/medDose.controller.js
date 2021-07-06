const medConfirmation = require("../models/medicineConfirmation.model");

const getDoses = async (req, res) => {
    let user = req.user.id;
    const date1 = new Date();
    console.log(new Date(date1.toISOString().slice(0,10)));

    medConfirmation.find({
        "user": user,
        "meddate": "/^"+new Date(date1.toISOString().slice(0,10))+"/",
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
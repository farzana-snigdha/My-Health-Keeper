const medReminder = require("../models/medReminder.model");

const getMedicine = async (req, res) => {
  let user = req.user.id;

  medReminder.find({ user }, (err, reminderList) => {
    if (err) {
      console.log(user);
      console.log("Test :" + err);
    }
    if (reminderList) {
      res.send(reminderList);
      console.log(reminderList);
    }
  });
};

const postMedicine = async (req, res) => {
  let user = req.user.id;

  const { username, medname, descriptionmed, startdate, enddate, doses } =
    req.body;

  const med = new medReminder({
    user,
    username: username,
    medname: medname,
    descriptionmed: descriptionmed,
    startdate: startdate,
    enddate: enddate,
    time: doses,
  });
  // med
  //   .save()
  //   .then((data) => {
  //     res.json(data);
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     res.json(error);
  //   });

  const date1 = new Date(startdate);
  const date2 = new Date(enddate);
  
  const days = ((Math.abs(date2 - date1))/ (1000 * 60 * 60 * 24));
  console.log(doses[0]);
  //console.log(startdate);
};

const deleteMedicine = async (req, res) => {
  let user = req.user.id;
  medReminder.find({ user }, (err, reminderList) => {
    if (err) {
      console.log(user);
      console.log("Test :" + err);
    }
    if (reminderList) {
      medReminder
        .findByIdAndDelete(req.params.id)
        .then(() => res.json("Reminder deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
};

module.exports = { getMedicine, postMedicine, deleteMedicine };
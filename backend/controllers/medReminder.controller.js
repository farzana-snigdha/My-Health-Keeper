const medReminder = require("../models/medReminder.model");
const moment = require("moment");

const date = require("date-and-time");
const now = new Date();

const getMedicine = async (req, res) => {
  let user = req.user.id;
//   medReminder.find({ user }, { "startdate": 1,_id:0 },(err,ans)=>{
//     if (err) {
//         console.log(user);
//         console.log("Test :" + err);
//       }
//       if (ans) {
       
//           console.log("111111asas  ",moment(ans).subtract(1,'days').calendar())
//         // res.send(reminderList);
//         console.log(ans);
//       }
//   });
  
  medReminder.find({ user }, (err, reminderList) => {
    if (err) {
      console.log(user);
      console.log("Test :" + err);
    }
    if (reminderList) {
     
      //   console.log("111111asas  ",date.format(daa.startdate,'YYYY/MM/DD'))
      res.send(reminderList);
      // console.log(reminderList);
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
  med
    .save()
    .then((data) => {
      res.json(data);
      // res.json({startdate:moment().format('L')})
      console.log(data);
    })
    .catch((error) => {
      res.json(error);
    });
};

module.exports = { getMedicine, postMedicine };

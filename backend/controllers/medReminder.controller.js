const medReminder = require('../models/medReminder.model')


const getMedicine = aync (req,res) => {
     medReminder.find({}, (err,reminderList)=> {
         if(err){
             consol.log(err)
         }
         if(reminderList){
             res.send(reminderList)
         }
     })
}

const postMedicine =async (req, res) => {
    let user = req.user.id;

    const {username, medname, descriptionmed,startdate, enddate, doses} = req.body;

    const med = new medReminder ({
        user,
        username : username,
        medname : medname,
        descriptionmed : descriptionmed,
        startdate : startdate,
        enddate : enddate,
        time : doses
    })
    med.save()
    .then(data => {
        res.json(data);
        console.log(data);
    })
    .catch(error => {
        res.json(error)
    })
};

module.exports = { getMedicine, postMedicine };
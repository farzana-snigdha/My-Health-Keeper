const medReminder = require('../models/medReminder.model')

const getMedicine = async (req,res) => {
    let user = req.user.id;

    medReminder.find({user}, (err,reminderList)=> {
        if(err){
            console.log(user)
            console.log("Test :" + err)
        }
        if(reminderList){
            res.send(reminderList)
            console.log(reminderList);
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
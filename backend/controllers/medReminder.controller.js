const medReminder = require('../models/medReminder.model')


const getMedicine = async (req,res) => {
     medReminder.find()
     .then(medList => {
         res.json(medList);
         console.log(medList);
     })
     .catch(err => res.status(400).json('Error: ' + err));
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
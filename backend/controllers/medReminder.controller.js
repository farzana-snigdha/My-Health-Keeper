const medReminder = require('../models/medReminder.model')


const getMedicine = (req,res) => {

}

const postMedicine = (req, res) => {
    const {username, medname, descriptionmed,startdate, enddate, doses} = req.body;

    const med = new medReminder ({
        username : username,
        medname : medname,
        descriptionmed : descriptionmed,
        startdate : startdate,
        enddate : enddate,
        time : doses
    })
    med.save()
    .then(data => {
        res.json(data)
    })
    .catch(error => {
        res.json(error)
    })
};

module.exports = { getMedicine, postMedicine };
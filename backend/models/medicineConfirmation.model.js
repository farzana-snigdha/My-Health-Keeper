const mongoose = require('mongoose')

const medDoseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    dose: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "medicines",
    },
    medname: {
        type: String,
        required: true
    },
    meddate:{
        type: Date,
        required: true
    },
    medtime: {
        type: Date,
        required: true
    },
    isTaken: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('medicineDoses', medDoseSchema)
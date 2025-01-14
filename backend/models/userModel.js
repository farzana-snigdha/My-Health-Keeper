const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
      default:"Male"
    },
    phone: {
        type: String,
           },
    dateOfBirth: {
        type: Date,
       
    },
    avatar: {
        type: String,
        default:"https://res.cloudinary.com/dltouyziu/image/upload/v1624431013/avatar/iqaznmhj092nj4eotjdl.jpg"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users',UserSchema)
const mongoose = require('mongoose')

const recruiterSchema = new mongoose.Schema({
    name :{
        type:String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },

    recruiter : {
        type : String,
        required : true

    },

    address : {
        type : String,
        required : true
    },

    status :{
        type : String,
        default : true,
        required : true
    },

    emailVerify : {
        type : String,
        default : "not verified",
        required : true
    },

    adminVerify : {
        type : String,
        default : "not verified",
        required : true
    }

})

module.exports = mongoose.model("recruiter",recruiterSchema)


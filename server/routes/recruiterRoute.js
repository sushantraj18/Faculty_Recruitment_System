const express = require('express')
const {recruiterRegistration,recruiterEmailVerificationn,recruiterLogin} = require("../controller/recruiterController")
const recruiterRoute = express.Router()
recruiterRoute.use(express.static('public'))

recruiterRoute.get("/recruiterLogin",(req,res)=>{
    res.render("recruiterLogin",{message : ""});
})

recruiterRoute.get("/recruiterRegistration",(req,res)=>{
    res.render("recruiterRegistration",{message : ""});
})

recruiterRoute.post("/recruiterRegistration",recruiterRegistration)
recruiterRoute.get("/verifyEmail",recruiterEmailVerificationn)
recruiterRoute.post("/recruiterLogin",recruiterLogin)

module.exports = recruiterRoute
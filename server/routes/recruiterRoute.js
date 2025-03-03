const express = require('express')

const recruiterRoute = express.Router()
recruiterRoute.use(express.static('public'))

recruiterRoute.get("/recruiterLogin",(req,res)=>{
    res.render("recruiterLogin")
})

recruiterRoute.get("/recruiterRegistration",(req,res)=>{
    res.render("recruiterRegistration")
})

module.exports = recruiterRoute
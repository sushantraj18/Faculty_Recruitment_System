const express = require('express')
const {adminRegistration,adminLogin} = require("../controller/adminController")

const adminRoute = express.Router()
adminRoute.use(express.static('public'))

adminRoute.get("/",(req,res)=>{
    res.render("adminlogin",{message : ""})
})

adminRoute.post("/adminRegistration",adminRegistration)
adminRoute.post("/adminLogin",adminLogin)

module.exports = adminRoute
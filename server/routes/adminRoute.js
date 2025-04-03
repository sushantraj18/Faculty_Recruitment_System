const express = require('express')
const {adminRegistration,adminLogin,adminLogout,adminRecruiterList,adminVerifyRecruiter} = require("../controller/adminController")
const authenticateJWT = require("../middleware/authenticateJWT")

const adminRoute = express.Router()
adminRoute.use(express.static('public'))

adminRoute.get("/",(req,res)=>{
    res.render("adminlogin",{message : ""})
})

adminRoute.post("/adminRegistration",adminRegistration)
adminRoute.post("/adminLogin",adminLogin)
adminRoute.get("/adminHome",authenticateJWT,(req,res)=>{
    res.render("adminHomeHeader" ,{email : req.info.email});
})
adminRoute.get("/adminLogout",adminLogout)
adminRoute.get("/adminRecruiterList",authenticateJWT,adminRecruiterList)
adminRoute.get("/adminVerifyRecruiter",authenticateJWT,adminVerifyRecruiter)

module.exports = adminRoute
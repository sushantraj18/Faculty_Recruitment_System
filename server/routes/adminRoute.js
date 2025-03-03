const express = require('express')

const adminRoute = express.Router()

adminRoute.get("/",(req,res)=>{
    res.render("adminlogin")
})

module.exports = adminRoute
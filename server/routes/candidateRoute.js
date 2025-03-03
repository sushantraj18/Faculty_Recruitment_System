const express = require('express')

const candidateRoute = express.Router()
candidateRoute.use(express.static('public'))

candidateRoute.get("/candidateLogin",(req,res)=>{
    res.render("candidateLogin")
})

candidateRoute.get("/candidateRegistration",(req,res)=>{
    res.render("candidateRegistration")
})


module.exports = candidateRoute
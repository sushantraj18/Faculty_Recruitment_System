const express = require("express")
require('dotenv').config()
const dbConnect = require('./database/dbConnect')
const adminRoute = require("./routes/adminRoute")
const candidateRoute = require("./routes/candidateRoute")
const recruiterRoute = require("./routes/recruiterRoute")
const cookies = require("cookie-parser")
const app = express()

const port = 3000

app.use(cookies())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("views" , "views")

app.set("view engine" ,"ejs")

app.get("/",(req,res)=>{
    res.render("home")
})

app.use("/admin",adminRoute)
app.use("/candidate",candidateRoute)
app.use("/recruiter",recruiterRoute)
app.listen(port,()=>{
    dbConnect()
    console.log(`Server running at http://localhost:${port}`)
})

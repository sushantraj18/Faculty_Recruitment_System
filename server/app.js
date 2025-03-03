const express = require("express")
const adminRoute = require("./routes/adminRoute")
const candidateRoute = require("./routes/candidateRoute")
const recruiterRoute = require("./routes/recruiterRoute")
const app = express()

const port = 3000


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
    console.log(`Server running at http://localhost:${port}`)
})

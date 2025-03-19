const mailer = require('../routes/mailer')
const  bcrypt =  require("bcrypt");
const recruiterModel = require("../model/recruiterModel")



const recruiterRegistration = async (req,res)=>{
    const {name,email,password,contact,address,recruiter} = req.body
    try{

        const hasPassword = await bcrypt.hash(password,10)

        const recruiterObj  = {
            name,
            email,
            password :hasPassword , 
            contact,
            address,
            recruiter
        }

        const mailContent = `Hello ${email},<br>This is a verification mail by Faculty Recruitment System. You needs to verify yourself by clicking on the below link.<br/><a href='http://localhost:3000/recruiter/verifyEmail?email=${email}'>Click here to verify</a>`

        mailer(mailContent,email,async(info)=>{
            if(info){

               const result = await recruiterModel.create(recruiterObj);
               console.log("recruiter registration  : " , result);
                res.render("recruiterLogin",{message : "Email Sent Please verify"});

            }else{
                console.log("error while sending mail");
                res.render("recruiterRegistration",{message : "error while sending mail"});
            }
        })


    }catch(e){
        console.log("error in recruiter registration : ", e.message );
        res.render("recruiterRegistration",{message : "error in recruiter registration"});
    }
}

const recruiterEmailVerificationn = async(req,res)=>{
    const email = req.query.email;
    const updateEmailStatus = {$set:{emailVerify : "verifyed"}};
    const updateResult = await recruiterModel.updateOne({email:email},updateEmailStatus)
   
    console.log("updated result of email status : " , updateResult);
    res.render("recruiterLogin",{message : "email verifyed | admin Verification takes 24 hour time"})
}


const recruiterLogin = async(req,res)=>{
    try{

        const {email,password} = req.body;

        if(!email || !password){
            return res.render("recruiterLogin",{message : "all fields required"})
        }
        const isEmailValid = await recruiterModel.findOne({email:email})

        if(!isEmailValid){
           return res.render("recruiterLogin",{message : "Invalid Email or Password"})
        }
        const checkPassword = await bcrypt.compare(password ,isEmailValid.password);

        if(!checkPassword){
            return res.render("recruiterLogin",{message : "Invalid Password or Email"});
        }

        res.render("recruiterLogin",{message : "Login Success"});


    }catch(e){
        console.log("error in recruiter login : " , e.message);
        res.render("recruiterLogin",{message : "Something went wrong"})
    }
}


module.exports = {recruiterRegistration,recruiterEmailVerificationn,recruiterLogin}
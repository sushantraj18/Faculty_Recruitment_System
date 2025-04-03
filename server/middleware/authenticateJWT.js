const jwt = require("jsonwebtoken");


const authenticateJWT = async(req,res,next)=>{
    try{

        const token = req.cookies.admin_token;
        // console.log(token);

        jwt.verify(token,process.env.ADMIN_SECRET_KEY,(error,info)=>{
            if(error){
                res.render("adminLogin",{message :"please login first"})
            }else{
                req.info = info;
                next();
            }
        })
        

    }catch(e){
        console.log(
            e.message
        )
            res.render("adminLogin",{message : "something went wrong in jwt"})
    }
}

module.exports = authenticateJWT;
const adminModel = require("../model/adminModel")

const  adminRegistration = async(req,res)=>{

    const {email,password}  = req.body
    try{

        const adminCreate = new adminModel({email,password})
        await adminCreate.save()
        
        return res.status(200).json({message : "admin created success"})

    }catch(e){
        console.log(e)
    }
}

const adminLogin = async(req,res)=>{

    const {email,password} = req.body

    try{
        
        const isAdminValid = await adminModel.findOne({$and : [{email},{password}]})

        console.log("result : " , isAdminValid)

        if(isAdminValid){
            res.render("adminHome")

        }else{
            
            res.render("adminLogin",{message: "email id or password is incorrect"})
        }




    }catch(e){
        console.log('admin login error ', e )
        res.render("adminLogin",{message: "Something went wrong"})
    }
}


module.exports = {adminRegistration,adminLogin}
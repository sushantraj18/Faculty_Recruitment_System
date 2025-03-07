const mongoose = require('mongoose')



const dbConnect = async()=>{
    try{

        const conn = await mongoose.connect(process.env.MONGO_URI)
        if(conn){
            console.log("DB Connected")
        }else{
            console.log('DB Connection Fail')
        }

    }catch(e){
        console.log(e)
    }
}


module.exports = dbConnect
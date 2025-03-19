const nodemailer = require("nodemailer")

const mailer = (mailContent,email,cb)=>{
    const transport = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user :'codexsushant@gmail.com',
            pass:process.env.PASS_KEY
        }
    });

    const mailOption = {
        from : 'codexsushant@gmail.comm',
        to : email,
        subject : 'verification mail',
        html: mailContent
    }

    transport.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log("error while sending mail inside sendMail");

        }else{
            console.log("Mail sent from sendMail")
            cb(info)
        }
    });
}

module.exports= mailer
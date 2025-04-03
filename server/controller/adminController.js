const adminModel = require("../model/adminModel")
const recruiterModel = require("../model/recruiterModel");
const jwt = require('jsonwebtoken');
require("dotenv/config");

const adminRegistration = async (req, res) => {

    const { email, password } = req.body
    try {

        const adminCreate = new adminModel({ email, password })
        await adminCreate.save()

        return res.status(200).json({ message: "admin created success" })

    } catch (e) {
        console.log(e)
    }
}

const adminLogin = async (req, res) => {

    const { email, password } = req.body

    try {

        const isAdminValid = await adminModel.findOne({ $and: [{ email }, { password }] })



        if (isAdminValid) {
            const token = jwt.sign({ email: email }, process.env.ADMIN_SECRET_KEY, { expiresIn: "1d" })

            if (!token) {
                console.log("error while setting up the admin token while admin login")
                return res.render("adminLogin", { message: "error while setting up the admin token while admin login" })
            }
            res.cookie("admin_token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })

            res.render("adminHome", { email: email })

        } else {

            res.render("adminLogin", { message: "email id or password is incorrect" })
        }




    } catch (e) {
        console.log('admin login error ', e)
        res.render("adminLogin", { message: "Something went wrong" })
    }
}

const adminLogout = async (req, res) => {
    res.clearCookie("admin_token");

    res.render("adminLogin", { message: "Admin Logout successfully" });
}

const adminRecruiterList = async (req, res) => {
    try {

        const recruiterList = await recruiterModel.find();
        res.render("adminRecruiterList", { email: req.info.email, recruiterList: recruiterList ,message:""})


    } catch (e) {
        console.log("error in admin recruiter lis", e.message)

        res.render("adminHomeHeader", { email: req.info.email ,message })
    }
}

const adminVerifyRecruiter = async (req, res) => {
    try {

        const recruiterEmail = req.query.recruiterEmail
        const updateStatus = { $set: { adminVerify: "verified" } }
        await recruiterModel.updateOne({ email: recruiterEmail }, updateStatus)
        const recruiterList = await recruiterModel.find();
        res.render("adminRecruiterList", { email: req.info.email, recruiterList: recruiterList, message: recruiterEmail +" Recruiter verified successfully" })

    } catch (e) {
        console.log("error in admin verify recruiter controller : ", e)
        const recruiterList = await recruiterModel.find();
        res.render("adminRecruiterList", { email: req.info.email, recruiterList: recruiterList, message: "error while updating recuiter" })

    }
}

module.exports = { adminRegistration, adminLogin, adminLogout, adminRecruiterList, adminVerifyRecruiter }
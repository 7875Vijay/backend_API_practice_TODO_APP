const USERS = require("../models/userDBmodel.js")
const sendCookie = require("../utils/tocken.js")
const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

const register =  async(req, res)=>{
    const {name, email, password} = req.body
    const user = await USERS.findOne({email})
    if(user){
        res.status(404).json({
            success:false,
            massage:"User alrady registered",
        })
    }
    else{
        const encrypted = await bcrypt.hash(password, 10)
        await USERS.create({
            name:name,
            email:email,
            password:encrypted,
        })
        const user2 = await USERS.findOne({email})
        sendCookie(user2, 201, "user created successfully", res)
}
}

const login = async(req, res, next)=>{
    const {email,password} = req.body 
    const user = await USERS.findOne({email}).select("+password")
    if(!user){
        return res.status(404).json({
            success:false,
            massage:"Invalid email / password"
        })
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        res.status(404).json({
            success:false,
            massage:"Invalid email / password"
        })
    }
    

    sendCookie(user, 200, `welcome, ${user.name}`, res)

}

const logout = async(req,res)=>{
    res.status(200).cookie("token", "",{
        expires:new Date(Date.now()), 
        sameSite:process.env.NODE_ENV === "Development"?"lax":"none", 
        secure:process.env.NODE_ENV === "Development"?false:true})
        .json({
            success:true,
            massage:"loged out"
        })
}

const getAllUsers = async(req, res)=>{ //this is the api which is awailable on /users/all

}
const getMydetails = async(req, res)=>{ //this is the api which is awailable on /users/all

    res.status(200).json({
        success:true,
        user:req.USERS,
    })
}

module.exports = {
    register,
    login,
    logout,
    getAllUsers,
    getMydetails,
}


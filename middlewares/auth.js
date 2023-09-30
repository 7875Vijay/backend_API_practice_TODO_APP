const jwt= require("jsonwebtoken")
const USERS = require("../models/userDBmodel.js")

const isAuthenticated = async(req, res, next)=>{
    const {token} = req.cookies
    // console.log(token)
    if(!token){
        return res.status(404).json({
            success:false,
            massage:"Log in first",
        })
    }

    const decoded = jwt.verify(token, process.env.KEY)
    req.USERS = await USERS.findById(decoded._id)
    next()
}



module.exports = {
    isAuthenticated,
}
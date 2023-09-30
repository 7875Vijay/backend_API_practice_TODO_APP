const jwt = require("jsonwebtoken")

function sendCookie(user, statuscode = 201, massage, res){
    const jwtToken = jwt.sign({_id:user._id},process.env.KEY)
    // console.log(jwtToken)
    res.status(statuscode)
                .cookie("token",jwtToken,{
                    httpOnly:true,
                    maxAge:15*60*1000,
                    sameSite:process.env.NODE_ENV === "Development"?"lax":"none",
                    secure:process.env.NODE_ENV === "Development"?false:true,
                })
                .json({
                    success:true,
                    massage:massage,
                })
}

module.exports = sendCookie
const express = require("express")
const routerUser = require("./routes/userRoutes.js")
const routerTask = require("./routes/taskRoutes.js")
const {config} = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()

config({
    path:"./database/config.env"
})

//middelwares
app.use(express.urlencoded({extended:false}))//this is for url
app.use(express.json()) //this is for the json data
app.use(cookieParser()); // Add this line
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))
app.use("/api/v1/users",routerUser)
app.use("/api/v1/tasks", routerTask)

module.exports = app

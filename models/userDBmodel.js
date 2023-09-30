const mongoose = require("mongoose")


// Define a Mongoose schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    createdAt:{
        date:{
            type:Date,
            default:Date.now(),
        }

    }
});
const USERS = mongoose.model("USERS",userSchema)
module.exports = USERS

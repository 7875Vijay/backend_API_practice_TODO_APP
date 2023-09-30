const mongoose = require("mongoose")

// Define a Mongoose schema
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    iscompleted:{
        type:Boolean,
        defalult:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USERS",
        required:true,
    },
    createdAt:{
        date:{
            type:Date,
            default:Date.now(),
        }
    }
});
const TASKS = mongoose.model("TASKS",taskSchema)
module.exports = TASKS

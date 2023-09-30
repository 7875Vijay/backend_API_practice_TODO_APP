
const TASKS = require("../models/taskDBmodel.js")

const addNewTask = async(req, res)=>{

        const {title, description,} = req.body
        // console.log(title, "\n", description)
        await TASKS.create({
            title, 
            description, 
            user:req.USERS,
        })
    
        res.status(201).json({
            success:true,
            massage:"Task added successfully"
        })

    
}

const myTasks = async(req, res)=>{

            const userID = req.USERS._id
            const tasklist = await TASKS.find({user:userID})
            if(!tasklist){
                return res.status(404).json({
                    success:false,
                    massage:"The task not created"
                })
            }
            const task_titles = [] 
            const task_desc = [] 
            // console.log(tasklist)

            for (let i = 0; i < tasklist.length; i++) {
                const element = tasklist[i];
                task_titles.push(element.title)
                task_desc.push(element.description)

            }

            res.status(200).json({
                success:true,
                task_titles,
                task_desc,
            })


}

const updateTask = async(req, res)=>{

        const inputID = req.params.id
        const title = req.body.title
        const desc = req.body.description
        await TASKS.findOneAndUpdate({_id:inputID},{title:title, description:desc})
    
        const getUpdatedTasktoView = await TASKS.findById(inputID)
        res.status(201).json({
            success:true,
            massage:"task updated",
            whatsnew:getUpdatedTasktoView,
        })


}

const completeTask = async(req, res)=>{


        const inputID = req.params.id
        const mark = req.body.iscompleted
        const task = await TASKS.findOneAndUpdate({_id:inputID},{iscompleted:mark})
        if(mark === true){
            res.status(200).json({
                success:true,
                massage:`${task.title} Completed`
            })
        }
        else{
            res.status(200).json({
                success:true,
                massage:`${task.title} need to be Complete`
            })
        }


}

const deleteTask = async(req, res)=>{

        const inputID = req.params.id
        await TASKS.findOneAndDelete({_id:inputID})
        res.status(200).json({
            success:true,
            massage:"Task deleted and belowed tasks are remaining"
        })
    
}

module.exports = {
    addNewTask, 
    myTasks,
    updateTask,
    deleteTask,
    completeTask,
}
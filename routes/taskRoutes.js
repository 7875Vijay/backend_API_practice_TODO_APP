const express = require("express")
const {isAuthenticated} = require("../middlewares/auth.js")
const {addNewTask, myTasks, updateTask, deleteTask, completeTask} = require("../controllers/task.js")
const router = express.Router()


router.post("/newTask", isAuthenticated, addNewTask)
router.get("/myTasks", isAuthenticated, myTasks)
router.route("/:id", isAuthenticated).put(updateTask).delete(deleteTask)
router.put("/iscompleted/:id",isAuthenticated,completeTask)
module.exports = router;
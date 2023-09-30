const express = require("express")
const {  register, login, logout, getAllUsers, getMydetails, } = require("../controllers/userControllers.js")
const {isAuthenticated,} = require("../middlewares/auth.js")
const router = express.Router()

//routs
router.post("/register", register) //register new user 
router.post("/login", login)
router.get("/logout", logout)
router.get("/all", getAllUsers) //get all users
router.get("/me", isAuthenticated,getMydetails)


module.exports = router;
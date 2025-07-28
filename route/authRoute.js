const express=require("express")
const UserHandler=require("../Controllers/authController")

const router=express.Router()

router.route("/signup").post(UserHandler.signUp)
router.post("/login",UserHandler.login)

module.exports=router

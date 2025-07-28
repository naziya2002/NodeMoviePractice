const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const User=require("../Modal/userModal")
const jsonwebtoken=require("jsonwebtoken")
const CustomError=require("../Utils/CustomError")

const signUp=asyncErrorHandler(async(req,res)=>{

    // if(User.find(""))


    const user=await User.create(req.body)
    const token=jsonwebtoken.sign({id:user._id},process.env.SCERET_STR,{
        expiresIn:process.env.LOGIN_EXP
    })

    res.status(201).json({
        status:201,
        message:"User Created Sucessfully",
        token,
        data:user
    })

})


const login=asyncErrorHandler(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        const error=new CustomError("Please Enter Email and Password",400)
        return next(error)
    }
    const user=await User.findOne({email})
    const isMatchPassword=await user.ComparePassword(password,user.password)
    if(!user || !isMatchPassword){
        const error=new CustomError("Verification Failed, Check Email & Password",400)
        return next(error)
    }
    res.status(200).json({
        status:"sucess",
        token:"",
        user
    })


})
module.exports={signUp,login}
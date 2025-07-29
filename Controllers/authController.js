const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const User=require("../Modal/userModal")
const jsonwebtoken=require("jsonwebtoken")
const CustomError=require("../Utils/CustomError")
const util=require("util");
const { Mongoose } = require("mongoose");


const signToken=(id)=>{
    return jsonwebtoken.sign({id},process.env.SCERET_STR,{
        expiresIn:process.env.LOGIN_EXP
    })
}

const signUp=asyncErrorHandler(async(req,res)=>{

    // if(User.find(""))


    const user=await User.create(req.body)
    const token=signToken(user._id)

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
   const token = signToken(user._id)
    res.status(200).json({
        status:"sucess",
        token:token,
        user
    })


})





//middleware

const protect=asyncErrorHandler(async(req,res,next)=>{
    // console.log(req.headertokens)
    //1.Read the token 
    const headertoken=req?.headers.authorization
    // console.log(headertoken)
    let token

    if(headertoken){
        token=headertoken.split(" ")[1]
        // console.log(token)
    }
    if(!headertoken ){
        next(new CustomError('Auth Token Not Found'),401)
    }

  const decodedToken=await util.promisify(jsonwebtoken.verify)(token,process.env.SCERET_STR) // return user id 

  console.log(decodedToken)
    //2.validate the token if exists or not


    //3.check if user exists or not

    const user =await User.findById(decodedToken.id)

    if(!user){
        return next(new CustomError('User with this token does not exist',401))

        

    }

    //4.if user changed password after login 

if( await user.isPasswordChanged(decodedToken.iat)){
  return  next( new CustomError("Password has been changed, Please Login with new password",401))
}

req.user=user


next()


})







module.exports={signUp,login,protect}
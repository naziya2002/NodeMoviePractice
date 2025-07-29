const CustomError = require("../Utils/CustomError")

const developmentError=(res,error)=>{
res.status(error.statusCode).json({
        status:error.status,
        message:error.message,
        stackTrace:error.stack,
        error:error
    })
}



const Proderror=(res,error)=>{
    if(error.isOperational){
        res.status(error.statusCode).json({
        status:error.status,
        message:error.message
    })
    }else{
        res.status(500).json({
            status:500,
            message:"Something went Wrong"
        })
    }


}
const casteErrorHandler=(err)=>{
    const msg=`Invalid Value ${err.value} for field ${err.path}`
    return new CustomError(msg,400)

}
const duplicateKeyError=(err)=>{
    const message=` The title with name "${err.keyValue.title}" alredy exist`
    return new CustomError(message,400)

}


const validationErrorHandler=(err)=>{
    const error=Object.values(err.errors).map(val=>val.message);
// console.log(Object.values(err.errors))
    const errorMessage=error.join('.')
    const msg=`Invalid Input Field: ${errorMessage}`
    return new CustomError(msg,400)

}
const validateTokenHadler=(err)=>{
    return new CustomError('Token Expired , Please Login Again',401)
}
const GlobalErrorController=(error,req,res,next)=>{
    error.statusCode=error.statusCode || 500
    error.status=error.status|| "fail"
    if(process.env.NODE_ENV==='development'){
        developmentError(res,error)
    }else if(process.env.NODE_ENV==='production'){
        console.log('Insideeeee')
    // let err={...error}

        if(error.name==="CastError")error=casteErrorHandler(error)
        if(error.code===11000)error=duplicateKeyError(error)
        if(error.name==="ValidationError") error=validationErrorHandler(error)
        if(error.name==="TokenExpiredError") error=validateTokenHadler(error)
        Proderror(res,error)
    }
    next()
}

module.exports=GlobalErrorController
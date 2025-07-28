const asyncErrorHandler=(func)=>{
    // console.log("inside,fn")
    return (req,res,next)=>{
        func(req,res,next).catch((err)=>next(err))

    }
}

module.exports=asyncErrorHandler
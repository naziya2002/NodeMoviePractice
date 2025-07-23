
const Movie=require("../module/movieModal")
// const mongoose=require('mongoose')

const getAllmovies =async (req, res) => {
   try{
    console.log(req.query)
    const queryObj={...req?.query}
    const excludeFileds=['sort','page','limit','fields']
    excludeFileds.forEach((el)=>{

      delete queryObj[el]
    })
    console.log(queryObj)
const movie=await Movie.find(queryObj)
res.status(200).json({
  status:"sucess",
  length:movie.length,
  data:movie
})

  }catch(err){
    res.status(404).json({
      status:"fail",
      
      message:"Movies Not Found"
    })
  }
 
};

const getmovie =async (req, res) => {

 

  try{
    // const Id = new mongoose.Types.ObjectId(req.params.id);
    const id=req.params.id
    // console.log(Id )
  const movie=await Movie.findById({_id:id})
  
  if(!movie){
    return res.status(404).json({
      status:"fail",
      message:"Movie Not found"
    })
  }
  res.status(200).json({
    status:"sucess",
    data:movie
  })
  
  }catch(err){
    res.status(500).json({
      status:"fail",
      message:"notFound"
    })
  }
};

const createMovie =async (req, res) => {
  try{
    const movie=await Movie.create(req.body)
    console.log(movie._id)

    res.status(201).json({
      status:"sucess",
      data:movie
    })
    

  }catch(err){
    res.status(500).json({
      status:"fail",
      message:err.message
    })
  }

 
};

const updateMovie = async(req, res) => {
try{
// const id=new mongoose.Types.ObjectId(req.params.id)
//   const movie=await Movie.updateOne({_id:id},{$set:req?.body})
const id=req.params.id
const movie=await Movie.findByIdAndUpdate(id,{$set:req.body},{new:true,runValidators:true})

if(!movie){
  return res.status(404).json({
    status:"fail",
    message:"Movie To Be Updated Not Found"
  })
}

  res.status(200).json({
    status:"sucess",
    message:"data Updated Sucessfully",
    data:movie
  })


}catch(err){
  res.status(500).json({
    status:'fail',
    message:err.message
  })
}
  
};


const deleteMovie=async(req, res) => {
  try{
    const id=req.params.id
    const movie=await Movie.findByIdAndDelete(id)
    if(!movie){
      return res.status(404).json({
        status:"fail",
        message:"Movie To Be Deleted Not Found"
      })
    }
res.status(200).json({
  status:"sucess",
  message:"Movie Deleted Sucessfully",
  data:movie
})

  }catch(err){
    res.status(500).json({
      status:"fail",
      message:err.message
    })
  }


}


module.exports= {createMovie,getAllmovies,getmovie,updateMovie,deleteMovie}
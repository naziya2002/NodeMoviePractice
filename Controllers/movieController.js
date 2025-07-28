
const { Mongoose } = require("mongoose");
const Movie=require("../Modal/movieModal")
const asyncErrorHandler=require("../Utils/asyncErrorHandler")
const CustomError=require("../Utils/CustomError")
// const mongoose=require('mongoose')

const getAllmovies = asyncErrorHandler(async (req, res) => {

    const queryObj = { ...req.query };
    const excludeFields = ['sort', 'page', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    const mongoQuery = {};

    for (let key in queryObj) {
      if (key.includes('[')) {
        const field = key.split('[')[0]; // e.g., "duration"
        const operator = key.match(/\[(.*)\]/)[1]; // e.g., "gte"
        if (!mongoQuery[field]) mongoQuery[field] = {};
        mongoQuery[field][`$${operator}`] = Number(queryObj[key]); // convert to number
      } else {
        mongoQuery[key] = queryObj[key];
      }
    }

    console.log(mongoQuery);// Final Mongo-compatible query
 
    let query=Movie.find(mongoQuery)


    //SORT 
    if(req.query.sort){
      let sortBy=req.query.sort.split(',').join(' ')
      query=query.sort(sortBy)
      // console.log(query)

    }else{
      query=query.sort('-createdAt') // desending order 
    }

    //LIMITING FIELDS
    if(req?.query.fields){
      const fields=req?.query?.fields.split(',').join(' ');
      query=query.select(fields)
    }else{
      query=query.select("-__v -createdAt -updatedAt") // if - in front will not be displayed in response
    }

    // Pagination
    const page=req?.query?.page||1
    const limit=req?.query?.limit||10
    const skip=(page-1)*limit

query=query.skip(skip).limit(limit)

if(req?.query?.page){
  const count =await Movie.countDocuments();
  if(skip>=count){
    throw new Error("This Page Is Not Found")
  }
}
    const movies = await query;

    res.status(200).json({
      status: 'success',
      length: movies.length,
      data: movies
    });
 
});


const getmovie =asyncErrorHandler(async (req, res,next) => {
 
    // const Id = new mongoose.Types.ObjectId(req.params.id);
    const id=req.params.id
    // console.log(Id )
  const movie=await Movie.findById({_id:id})
  
  if(!movie){
    const error =new CustomError("Movie Not found",404)
    return next(error)
  }
  res.status(200).json({
    status:"sucess",
    data:movie
  })
  
 
  
});

const createMovie =asyncErrorHandler(async (req, res,next) => {
  console.log("req",req)
 
    // const movie=await Movie.create(req.body)
    const movie = new Movie(req.body);
await movie.save();
    console.log(movie)
    // console.log(movie._id)

    res.status(201).json({
      status:"sucess",
      data:movie
    })

 
});

const updateMovie = asyncErrorHandler(async(req, res,next) => {
// const id=new mongoose.Types.ObjectId(req.params.id)
//   const movie=await Movie.updateOne({_id:id},{$set:req?.body})
const id=req.params.id
const movie=await Movie.findByIdAndUpdate(id,{$set:req.body},{new:true,runValidators:true})

 if(!movie){
    const error =new CustomError("Movie Not found",404)
    return next(error)
  }

  res.status(200).json({
    status:"sucess",
    message:"data Updated Sucessfully",
    data:movie
  })



  
});


const deleteMovie=asyncErrorHandler(async(req, res,next) => {
    const id=req.params.id
    const movie=await Movie.findByIdAndDelete(id)
    if(!movie){
    const error =new CustomError("Movie Not found",404)
    return next(error)
  }
res.status(200).json({
  status:"sucess",
  message:"Movie Deleted Sucessfully",
  data:movie
})

 


})


module.exports= {createMovie,getAllmovies,getmovie,updateMovie,deleteMovie}
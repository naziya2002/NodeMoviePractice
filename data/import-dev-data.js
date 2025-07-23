require('dotenv').config()
const fs=require('fs')
const mongoose=require('mongoose')

// dotenv.config()

const Movie=require("../module/movieModal")

console.log(process.argv)


mongoose.connect(process.env.CONN_STRING,{
  // useNewUrlParser:true
}).then(()=>{
  console.log('Connected to MongoDB')
}).catch((err)=>{
    console.log(err)
  console.log('Failed to Connect to DB')
})

let movieFile=JSON.parse(fs.readFileSync("./movies.json"))
// console.log(movieFile)

const deleteMovie=async (req,res)=>{
    try{
        await Movie.deleteMany()
        console.log("Movie Delated Sucessfully")
    }catch(err){
        console.log(err)
    }
    process.exit()
}
const importMovie=async (req,res)=>{
    try{
        await Movie.create(movieFile)
        console.log("movie Added Sucessfully")

    }catch(err){
        console.log(err)
    }
    process.exit()
}

if(process.argv[2]==='--import'){
    importMovie()

}
if(process.argv[2]==='--delete'){
    deleteMovie()
}
const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

const app=require('./app')

console.log(process.argv)

mongoose.connect(process.env.CONN_STRING,{
  // useNewUrlParser:true
}).then(()=>{
  console.log('Connected to MongoDB')
}).catch(()=>{
  console.log('Failed to Connect to DB')
})




app.listen(3000,'', () => {
  console.log("Server Running on 3000");
});
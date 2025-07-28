const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

const app=require('./app')

// console.log(process.env)

mongoose.connect(process.env.CONN_STRING,{
  // useNewUrlParser:true
}).then(()=>{
  console.log('Connected to MongoDB')
}).catch(err=>{
  console.log('Connect Failed')
})



const server=app.listen(3000,'', () => {
  console.log("Server Running on 3000");
});



process.on('unhandledRejection',(error)=>{
  console.log(error.name,error.message)
  console.log("Unhandled Rejection Occured! shutting Down...")
  server.close(()=>{
    process.exit(1)
  })


})



// console.log(x)
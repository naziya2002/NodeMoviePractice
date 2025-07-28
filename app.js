const express = require("express");
const fs = require("fs");
const morgan=require("morgan")
const movieRoutes=require("./route/movieRoute");
const authRoutes=require("./route/authRoute")
const { error } = require("console");
const CustomError=require("./Utils/CustomError")
const GlobalErrorController=require("./Controllers/errorController")
const app = express();
app.use(express.json());
app.use(morgan('dev'))
app.use(express.static('public'))


app.use("/v1/movies",movieRoutes)
app.use("/v1/user",authRoutes)

// app.all('*', (req, res) => {
//   res.status(404).send('Page not found');
// });
app.use((req, res,next) => {
//   res.status(404).json({
//     status:"fail",
//     message:"Page Not Found"
//   });
const error=new CustomError("Page Not Found",404)


  next(error);
});

app.use(GlobalErrorController)


module.exports=app

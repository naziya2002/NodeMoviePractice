const express = require("express");
const fs = require("fs");
const morgan=require("morgan")
const movieRoutes=require("./route/movieRoute")

const app = express();
app.use(express.json());
app.use(morgan('dev'))


app.use("/v1/movies",movieRoutes)





module.exports=app



const express = require("express");
const movieList=require('../Controllers/movieController.js')
const authController=require("../Controllers/authController.js")

const router=express.Router()
// router.param('id',movieList.checkid)

router.route("/").get(authController.protect,movieList.getAllmovies).post(movieList.createMovie)
router.route("/:id").get(movieList.getmovie).put(movieList.updateMovie).delete(movieList.deleteMovie)

module.exports=router
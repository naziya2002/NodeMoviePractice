

const express = require("express");
const movieList=require('../Controllers/movieController.js')

const router=express.Router()
router.param('id',movieList.checkid)

router.route("/").get(movieList.getAllmovies).post(movieList.validateMiddleWare,movieList.createMovie)
router.route("/:id").get(movieList.getmovie).put(movieList.updateMovie).delete(movieList.deleteMovie)

module.exports=router
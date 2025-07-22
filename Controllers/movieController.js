const fs = require("fs");

const movie = JSON.parse(fs.readFileSync("./data/movies.json")) ||"";
const getAllmovies = (req, res) => {
  res.send({
    status: 200,
    data: {
      movie,
    },
  });
};


const checkid=(req,res, next, value)=>{
    const findmovie = movie.find((el) => el.id === Number(value));

  if (!findmovie) {
    return res.status(404).json({ status: 404, message: "movie not found" });
  }
  next();

}

const validateMiddleWare=(req,res,next)=>{
    if(!req.body.title || !req.body.director  ){
      return  res.status(404).json({
            message:'Please enter valid title OR diretor'
        })
    }



    next()
}
const getmovie = (req, res) => {
  const id = Number(req?.params?.id);
  const singleMovie = movie.find((el) => el.id === id);
  // if (!singleMovie) {
  //   return res.send({ status: 400, message: "Movie Not Found" });
  // }

  res.status(200).json({
    status: 200,
    data: {
      singleMovie,
    },
  });
};

const createMovie = (req, res) => {

  const id = movie.length > 0 ? movie[movie.length - 1].id + 1 : 1;
  const newMovie = {
    ...req.body,
    id,
  };
  movie.push(newMovie);
  fs.writeFile("./data/movies.json", JSON.stringify(movie, null, 2), (err) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: "internal Server Error",
      });
    }

    res.status(200).json({
      status: 200,
      message: "movie Added",
      data: movie,
    });
  });
};

const updateMovie = (req, res) => {
  const id = Number(req?.params?.id);
      const findmovie = movie.find((el) => el.id === id);
  
  const index = movie.indexOf(findmovie);
  Object.assign(findmovie, req.body);
  movie[index] = findmovie;

  fs.writeFile("./data/movies.json", JSON.stringify(movie), (err) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        data: err,
      });
    }
    res.status(200).json({
      status: 200,
      data: movie,
    });
  });
};


const deleteMovie=(req, res) => {
//   const id = Number(req.params.id);

  const findMovie = movie.find((el) => el.id === id);

  const index = movie.indexOf(findMovie);
  movie.splice(index, 1);
  fs.writeFile("./data/movies.json", JSON.stringify(movie), (err) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        data: err,
      });
    }
    res.status(202).json({
      status: 202,
      data: null,
    });
  });
}


module.exports= {createMovie,getAllmovies,getmovie,updateMovie,deleteMovie,checkid,validateMiddleWare}
const mongoose=require('mongoose')

const movieSchema=mongoose.Schema(  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller"],
    },
    description: {
      type: String,
      trim: true,
    },
    releaseDate: {
      type: Date,
      required: [true, "Release date is required"],
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    duration: {
      type: Number, // duration in minutes
      required: [true, "Duration is required"],
    },
    director: {
      type: String,
      trim: true,
    },
    cast: {
      type: [String], // array of actor/actress names
    },
    language: {
      type: String,
      default: "English",
    },
    // posterUrl: {
    //   type: String, // link to poster image
    //   default: "",
    // },
    isAvailable: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);
const Movie=mongoose.model('Movie',movieSchema)

module.exports=Movie




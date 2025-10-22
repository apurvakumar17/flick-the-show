const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://nirbheekshreyas_db_user:ZXqErCcGnFjtH1xu@flick-the-show-cluster.tiigt4v.mongodb.net/?retryWrites=true&w=majority&appName=flick-the-show-cluster"
);

const movieSchema = mongoose.Schema({
  movieName: String,
  movieId: Number,
  moviePoster: String,
});

module.exports = mongoose.model("movie", movieSchema);

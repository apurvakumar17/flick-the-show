const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://nirbheekshreyas_db_user:ZXqErCcGnFjtH1xu@flick-the-show-cluster.tiigt4v.mongodb.net/?retryWrites=true&w=majority&appName=flick-the-show-cluster"
);

const carouselPostersSchema = mongoose.Schema({
  movieName: String,
  movieId: Number,
  posterLink: String,
});

module.exports = mongoose.model("carousel poster", carouselPostersSchema);

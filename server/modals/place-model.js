const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
  place: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  status: { type: String, required: true },
  room: { type: String, required: true },
  location: { type: String, required: true },
});

const placeList = mongoose.model("placeList", placeSchema);
module.exports = placeList;

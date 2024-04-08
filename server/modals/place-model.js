const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
  place: { type: String, required: true },
  image: [{ type: String, required: true }],
  description: { type: String, required: true },
  price: { type: String, required: true },
  status: { type: String, required: true },
  room: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  ogprice: { type: String, required: true },
  refund: { type: String, required: true },
  about: { type: String, required: true },
  housename: { type: String, required: true },
});

const placeList = mongoose.model("placeList", placeSchema);
module.exports = placeList;

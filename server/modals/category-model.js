const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const categoryList = mongoose.model("categoryList", categorySchema);
module.exports = categoryList;

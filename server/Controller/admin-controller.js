const AdminRegister = require("../modals/admin-model");
const placeList = require("../modals/place-model");
const Admin = require("../routes/admin");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");


//homestays//

exports.adminpanel = asyncHandler(async (req, res) => {
  const { place, price, description, status ,room,location} = req.body;
  const image = req.file.filename;
  try {
    const admin = await placeList.create({
      place: place,
      description: description,
      price: price,
      image: image,
      room: room,
      location: location,
      status: status,
    });
    if (admin) {
      res.send("success");
    } else {
      res.send("failed");
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ err: "create failed" });
  }
});

exports.adminpanellist = asyncHandler(async(req,res)=>{
  try{
    const place = await placeList.find()
    res.json(place)
  }catch(err){
    console.log(err);
    return res.status(404).json({err : "place details listing is failed"})
  }
})

exports.deleted= asyncHandler(async(req,res)=>{
  const {_id} =req.params
  try{
    const place = await placeList.findById({_id});
    if(!place){
      return res.status(500).json({err: "This place is not available"})
    }
    await place.deleteOne();
    res.json({message:"Deleted successfully"})
  }catch(err){
    console.log(err);
    return res.status(404).json({err:"deleted failed"})
  }
})


exports.adminpaneledit = asyncHandler(async(req, res) => {
  const {id} =req.params
  try {
    const place = await placeList.findById(id);
    if (!place) {
      return res.status(404).json({ err: "It is not found" });
    }
    res.json(place);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "An error occurred in edit" });
  }
});

exports.updated = asyncHandler(async(req,res)=>{
  const {id} =req.params;
  const { place, price, description, status,room,location } = req.body;
  try{
  const places =await placeList.findById(id)
  if(!place){
    return res.status(404).json({err: "it is not found"})
  }
  places.place=place;
  places.price=price;
  places.room=room;
  places.location=location;
  places.description =description;
  places. status=status;
  if (req.file){
    places.image =req.file.filename;
  }
  const updatedplaces = await places.save()
  res.json(updatedplaces)
  }catch(err){
  console.log(err);
  return res.status(500).json({err:" an error occured in updated"})
  }
})
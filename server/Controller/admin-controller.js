const AdminRegister = require("../modals/admin-model");
const placeList = require("../modals/place-model");
const Admin = require("../routes/admin");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

exports.createadmin = asyncHandler(async (req, res) => {
  const { name, phone, role, password, date, email } = req.body;
  const image = req.file.filename;
  console.log(req.body,"hlooooooooooooooooo");

  try {
    const admins = await AdminRegister.findOne({ email });
    if (admins) {
      return res
        .status(400)
        .json({ invalid: true, message: "email already exist" });
    }
    const admin = await AdminRegister.create({
      name: name,
      email: email,
      phone: phone,
      password: password,
      image: image,
      date: date,
      role: role,
    });
    if (admin) {
      res.send("success");
    } else {
      res.send("failed");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "an error occured in signup" });
  }
});

exports.signin = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const admin = await AdminRegister.findOne({ email: email });
  console.log(admin.email);
  console.log(admin.password);
  console.log(req.body.password);
  const isPasswordMatch = await bcrypt.compare(password, admin.password);
  console.log(isPasswordMatch);
  if (admin && isPasswordMatch) {
    const adminDetails = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      image: admin.image,
      phone: admin.phone,
      date: admin.date,
    };
    const token = jwt.sign({ email: admin.email }, "myjwtsecretkey");
    admin.tokens = token;
    admin.save();
    res.status(200).json({ token: token, adminDetails: adminDetails });
  } else {
    res.status(400).json({ invalid: true, message: "Invalid Credential" });
  }
});

exports.adminlist = asyncHandler(async (req, res) => {
  try {
    const admin = await AdminRegister.find();
    res.json(admin);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ err: "Admin is not found" });
  }
});

//homestays//

exports.adminpanel = asyncHandler(async (req, res) => {
  const { place, details, description, status } = req.body;
  const image = req.file.filename;
  try {
    const admin = await placeList.create({
      place: place,
      description: description,
      details: details,
      image: image,
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
  const { place, details, description, status } = req.body;
  try{
  const places =await placeList.findById(id)
  if(!place){
    return res.status(404).json({err: "it is not found"})
  }
  places.place=place;
  places.details=details;
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
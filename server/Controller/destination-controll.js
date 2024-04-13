const DestinationModel = require("../modals/destination-model");
const asyncHandler = require("express-async-handler");

exports.destinationcreate = asyncHandler(async (req, res) => {
  const { des, loc, add, destination, categories } = req.body;
  const image = req.file.filename;

  try {
    const destinations = await DestinationModel.create({
      des: des,
      loc: loc,
      add: add,
      categories: categories,
      destination: destination,
      image: image,
    });
    if (destinations) {
      res.send("success");
    } else {
      res.send("Failed");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "an error occured" });
  }
});

exports.destinationlist = asyncHandler(async (req, res) => {
  try {
    const destinations = await DestinationModel.find();
    res.json(destinations);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "an error occured in destination listing" });
  }
});

exports.destinationedit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const destinations = await DestinationModel.findById(id);
    if (!destinations) {
      return res.status(404).json({ err: " destination is  not found" });
    }
    res.json(destinations);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "an error occured in destination edit by Id" });
  }
});

exports.destinationupdate = asyncHandler(async (req, res) => {
  const { des, loc, add, destination, categories } = req.body;
  const image = req.filename;
  const { id } = req.params;
  try {
    const destinations = await DestinationModel.findById(id);
    if (!destinations) {
      return res.status(404).json({ err: "destination not found" });
    }
    destinations.des = des;
    destinations.loc = loc;
    destinations.add = add;
    destinations.destination = destination;
    destinations.categories = categories;
    if (req.file) {
      destinations.image = req.file.filename;
    }
    const updatedestination = await destinations.save();
    res.json(updatedestination);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "an error occured in updation" });
  }
});

exports.deletedestination = asyncHandler(async(req,res)=>{
    const {id} =req.params;
    try{
        const destinations =await DestinationModel.findById(id)
        if(!destinations){
            return res.status(404).json({err: "destination is not found"})
        }
        await destinations.deleteOne()
        res.json({ message: "Deleted successfully" });
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "an error occured in destination delete"})
    }
})

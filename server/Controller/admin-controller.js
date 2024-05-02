const placeList = require("../modals/place-model");
const categoryList = require("../modals/category-model");
const asyncHandler = require("express-async-handler");
const CategoryList = require("../modals/category-model");

//homestays//

exports.adminpanel = asyncHandler(async (req, res) => {
  const { place, price, description, status, room, location,refund,ogprice,address,about,housename } = req.body;
  // const image = req.file.filename;
  const image = req.files.map((file) => file.filename);
  try {
    const admin = await placeList.create({
      place: place,
      description: description,
      price: price,
      image: image,
      room: room,
      refund:refund,
      address:address,
      ogprice:ogprice,
      housename:housename,
      about:about,
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

exports.adminpanellist = asyncHandler(async (req, res) => {
  try {
    const place = await placeList.find();
    res.json(place);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ err: "place details listing is failed" });
  }
});

exports.deleted = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  try {
    const place = await placeList.findById({ _id });
    if (!place) {
      return res.status(500).json({ err: "This place is not available" });
    }
    await place.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ err: "deleted failed" });
  }
});

exports.adminpaneledit = asyncHandler(async (req, res) => {
  const { id } = req.params;
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

exports.updated = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { place, price, description, status, room, location,refund,ogprice,address,about,housename} = req.body;
  const newImages = req.files.map((file) => file.filename);
  try {
    const places = await placeList.findById(id);
    if (!place) {
      return res.status(404).json({ err: "it is not found" });
    }
    places.place = place;
    places.price = price;
    places.room = room;
    places.housename = housename;
    places.refund = refund;
    places.ogprice = ogprice;
    places.address = address;
    places.about = about;
    places.location = location;
    places.description = description;
    places.status = status;
    // if (req.file){
    //   places.image =req.file.filename;
    // }
    if (newImages && newImages.length > 0) {
      places.image = newImages;
    }
    const updatedplaces = await places.save();
    res.json(updatedplaces);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: " an error occured in updated" });
  }
});

//category //

exports.createcategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const image = req.file.filename;
  try {
    const category = await CategoryList.create({
      name: name,
      image: image,
    });
    if (category) {
      res.send("success");
    } else {
      res.send("failed");
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ err: "an error occured in category create" });
  }
});

exports.categorylist = asyncHandler(async (req, res) => {
  try {
    const category = await categoryList.find();
    if (!category) {
      return res.status(404).json({ err: "No category" });
    }
    res.json(category);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "An error occured in cateogry listing" });
  }
});

exports.categoryedit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryList.findById(id);
    if (!category) {
      return res.status(404).json({ err: "category not found" });
    }
    res.json(category);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "an error occured in ccategory editing" });
  }
});

exports.updatecategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const category = await categoryList.findById(id);
    if (!category) {
      return res.status(404).json({ err: "category items not found" });
    }
    category.name = name;
    if (req.file) {
      category.image = req.file.filename;
    }
    const updatedcategory = await category.save();
    res.json(updatedcategory);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: " an error occured in update category" });
  }
});

exports.deletecategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryList.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ err: "category is not available to delete" });
    }
    await category.deleteOne();
    res.json({ message: "deleted  successfull" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "an error occured in category delete" });
  }
});


//
exports.placedetails=asyncHandler(async(req,res)=>{
  const {id}=req.params;

  try{

    let category = await categoryList.findById(id);
    let places= await placeList.find({place: category.name})
    res.json(places)
  }catch(err){
    console.log(err);
    return res.status(500).json({err:"An error occured "})
  }
})

// const fetchProducts = async () => {
//   const token = localStorage.getItem("token");
//   axios.defaults.headers.common["Authorization"] = token;
//   axios
//     .get("http://localhost:8000/product/listproduct")
//     .then((response) => {
//       setSimilarProducts(response.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// const relatedProducts = similarproducts.filter(
//   (similar) => similar.category === selectedProductCategory
// );
// const relatedProductsToDisplay = relatedProducts.slice(0, 4);
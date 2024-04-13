var express = require("express");
var router = express.Router();
const Authentication = require("../middleware/authentication");
const Admincontroller = require("../Controller/admin-controller");
const DestinationControll= require("../Controller/destination-controll");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });



//Homestay//
router.post("/adminpanel", upload.array("image"),Admincontroller.adminpanel);
router.get ("/adminpanellist",Admincontroller.adminpanellist);
router.delete("/deleted/:_id",Admincontroller.deleted);
router.get("/adminpaneledit/:id",Admincontroller.adminpaneledit);
router.put("/updated/:id", upload.array("image"),Admincontroller.updated)

//category//
router.post("/createcategory",upload.single("image"),Admincontroller.createcategory)
router.get("/categorylist",Admincontroller.categorylist)
router.get("/categoryedit/:id",Admincontroller.categoryedit)
router.put("/updatecategory/:id",upload.single("image"),Admincontroller.updatecategory)
router.delete("/deletecategory/:id",Admincontroller.deletecategory)

//get place details based on category
router.get("/placedetails/:id",Admincontroller.placedetails);

//destination//
router.post("/destinationcreate",upload.single("image"),DestinationControll.destinationcreate)
router.get("/destinationlist",DestinationControll.destinationlist)
router.get("/destinationedit/:id",DestinationControll.destinationedit)
router.put("/destinationupdate/:id",upload.single("image"),DestinationControll.destinationupdate)
router.delete("/deletedestination/:id",DestinationControll.deletedestination)

module.exports = router;

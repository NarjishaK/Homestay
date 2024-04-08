var express = require("express");
var router = express.Router();
const Authentication = require("../middleware/authentication");
const Admincontroller = require("../Controller/admin-controller");
const UserController = require("../Controller/user-controller");
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
router.get("/placedetails/:id",Admincontroller.placedetails)
//
// router.post("/userRegistration",upload.single("image"),UserController.userRegistration);


module.exports = router;

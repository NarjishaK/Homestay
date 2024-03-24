var express = require("express");
var router = express.Router();
const Authentication = require("../middleware/authentication");
const Admincontroller = require("../Controller/admin-controller");
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

router.post(
  "/createadmin",
  upload.single("image"),
  Admincontroller.createadmin
);
router.post("/signin", Admincontroller.signin);
router.get("/adminlist",Authentication, Admincontroller.adminlist);
module.exports = router;

//Homestay//
router.post("/adminpanel", upload.single("image"),Admincontroller.adminpanel)
router.get ("/adminpanellist",Admincontroller.adminpanellist);
router.delete("/deleted/:_id",Admincontroller.deleted)
// router.get("/adminpaneledit/:_id",Admincontroller.adminpaneledit)
router.get("/adminpaneledit/:id",Admincontroller.adminpaneledit)

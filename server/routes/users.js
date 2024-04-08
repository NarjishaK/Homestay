var express = require('express');
var router = express.Router();
var UserController =require("../Controller/user-controller")
const multer = require("multer");
const Authentication = require("../middleware/authentication");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/userRegistration",upload.single("image"),UserController.userRegistration);
router.post("/loginuser",UserController.loginuser);
router.get("/userlist",UserController.userlist);
router.delete("/deleteuser/:id",UserController.deleteuser);
router.get("/edituser/:id",UserController.edituser);
router.put("/userupdate/:id",upload.single("image"),UserController.userupdate);
module.exports = router;

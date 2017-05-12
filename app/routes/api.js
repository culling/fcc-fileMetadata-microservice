//Configs and Modules
var config      = require("./../../config/config");

//Express and set up router
var express         = require('express');
var router          = express.Router();

var fs              = require("fs");

//Multer and file upload settings
var multer          = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadFolder)
  },
  filename: function (req, file, cb) {
      var filenameParts = file.originalname.split(".");
      var extension = filenameParts[filenameParts.length -1];
    cb(null, filenameParts[0] + '-' + Date.now() +"."+ extension);
  }
});
var upload  = multer({storage: storage});



router.get("/", function(req, res){
    res.sendFile(("apiguide.html"), {root: "public"});
});

router.post("/files/new", upload.single('file'), function(req, res){
        console.log(req.file);
        //res.write("file sent");
        //res.end();
        var responseObject = {};
        responseObject.size = req.file.size;
        res.send( responseObject );

        //DELETE file to reduce size of application
        fs.unlink( req.file.path , function(err) {
        if (err) {
            return console.error(err);
        }
            console.log("File deleted successfully!");
        });
});


module.exports = router;
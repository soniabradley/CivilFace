var express = require("express");
var router = express.Router();
var base64Img = require('base64-img');
var path = require("path");
var formidable = require('formidable');
var fs = require("fs");
// Import the model (.js) to use its database functions.
var civilface = require("../models/civilface.js");

router.get("/", function(req, res){
// call function in models to pull data from mysql, get the newest entry, put it into infoObject, send to handlebarsjs
    res.render("index")
});


// POST method: get user input(the public image URL .jpg, .png) and send to KAIROS API, redirect to mainpage with displayed data
router.post("/", function(req, res){
    civilface.insertDetails(req.body.imgURL, function(result){
        res.render("data", result);
    });
});



// POST method: allow user to upload image(.jpg, .png), encode and send to KAIROS API, redirect to mainpage with displayed data
router.post("/upload", function(req, res){
    //use formidable package to handle data upload, then use base64Img to encode image, save into base64.txt, send to API
    var form = new formidable.IncomingForm();
    //  allow the user to upload multiple files in a single request
    form.multiples = true;
    form.keepExtensions = true;
    // store all uploads in the /uploads
    form.uploadDir = path.join(__dirname, '../img_upload/uploads');

    form.on('file', function(field, file) {
    // console.log(file.name);
    // console.log("file.path: " + file.path);
        fs.rename(file.path, path.join(form.uploadDir, file.name));  // rename file to original name
        var getDir = "./uploads" + file.name;
        console.log(getDir);
    });

    // log any errors that occur
    form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
    res.end('Upload successful');
    });
    // parse the incoming request containing the form data
    form.parse(req);

    res.render("index",{message: "Upload Sucessfull"});

    //encode to base64, save to base64.txt

});

router.post("/getdata", function(req, res){
    civilface.getDetails_base64(function(){
        res.render("data", result);
    })
})

// Export routes for server.js to use.
module.exports = router;
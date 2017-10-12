var express = require("express");
var router = express.Router();

// Import the model (.js) to use its database functions.
var civilface = require("../models/civilface.js");

router.get("/", function(req, res){
// call function in models to pull data from mysql, get the newest entry, put it into infoObject, send to handlebarsjs
    civilface.insertDetails("http://i.huffpost.com/gen/1463843/images/o-WARREN-BUFFETT-facebook.jpg",function(result){
        res.render("index", result)
    })
    // res.send("From controller.js")
});


// POST method: get user input(the public image URL .jpg, .png) and send to KAIROS API, redirect to mainpage with displayed data
router.post("/", function(req, res){
    civilface.insertDetails(req.body.imgURL, function(result){
        res.render("index", result);
        // res.redirect("/");
    });
});



// POST method: allow user to upload image(.jpg, .png), encode and send to KAIROS API, redirect to mainpage with displayed data
router.post("/upload", function(req, res){
//use formidable package to handle data upload, then use base64Img to encode image, save into base64.txt, send to API
    res.redirect("/");
});


// Export routes for server.js to use.
module.exports = router;
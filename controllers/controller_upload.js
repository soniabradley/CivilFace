var express = require("express");
var router_upload = express.Router();

// Import the model (.js) to use its database functions.
var civilface = require("../models/civilface.js");

router_upload.get("/", function(req, res){
// call function in models to pull data from mysql, get the newest entry, put it into infoObject, send to handlebarsjs
    res.send("from controller_upload.js");
});


// POST method: allow user to upload image(.jpg, .png), encode and send to KAIROS API, redirect to mainpage with displayed data
router_upload.post("/", function(req, res){
//use formidable package to handle data upload, then use base64Img to encode image, save into base64.txt, send to API
    
    res.redirect("/");
});


// Export routes for server.js to use.
module.exports = router_upload;
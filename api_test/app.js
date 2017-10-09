// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// Create an instance of the express app.
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Specify the port.
var PORT = process.env.PORT || 3002;
// Set Handlebars as the default templating engine.

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var request = require('request');

//function to encode image to base64

//function to identify ethnic
function ethnic(data) {
  var ethnic = Math.max(data.asian, data.hispanic, data.other, data.black, data.white);
  switch (ethnic) {
    case data.asian:
      ethnic = "Asian";
      break;
    case data.hispanic:
      ethnic = "Hispanic";
      break;
    case data.other:
      ethnic = "Other";
      break;
    case data.black:
      ethnic = "Black";
      break;
    case data.white:
      ethnic = "White";
      break;
  }
  return ethnic;
}

//function to identify gender

function gender(data){
  var gender = Math.max(data.gender.femaleConfidence, data.gender.maleConfidence);
  switch(gender){
    case data.gender.femaleConfidence:
      gender = "female";
      break;
    case data.gender.maleConfidence:
      gender = "Male";
      break;
  }
  return gender;
}

app.get("/", function(req,res){
  var imgURL = "https://pbs.twimg.com/profile_images/889736688624312321/xVAFH9ZH_400x400.jpg";  
  request({
    method: 'POST',
    url: 'https://api.kairos.com/detect',
    headers: {
      'Content-Type': 'application/json',
      'app_id': '7167ee1b',
      'app_key': '35e70a4c3036a339cc3954f24255a4e5'
    },
    body: '{  "image": "' + imgURL +'",  "selector": "ROLL"}'    
    
  }, function (error, response, body) {
      var responseData = JSON.parse(body);
      responseData = responseData.images[0].faces[0].attributes;
      console.log('Response:', responseData);
      
      //build data object to use with handlebars
      var result = {};
      result.ethnic = ethnic(responseData);
      result.age = responseData.age;
      result.glasses = responseData.glasses;
      result.gender = gender(responseData);
      result.imageURL = imgURL;

      //send data to handlebarsjs
      res.render("index", result);      
  });
})

app.post("/", function(req, res){
  var imgURL = req.body.imgURL;
  console.log(imgURL);
  request({
    method: 'POST',
    url: 'https://api.kairos.com/detect',
    headers: {
      'Content-Type': 'application/json',
      'app_id': '7167ee1b',
      'app_key': '35e70a4c3036a339cc3954f24255a4e5'
    },
    body: '{  "image": "' + imgURL +'",  "selector": "ROLL"}'    
    
  }, function (error, response, body) {
      var responseData = JSON.parse(body);
      responseData = responseData.images[0].faces[0].attributes;
      console.log('Response:', responseData);
      
      //build data object to use with handlebars
      var result = {};
      result.ethnic = ethnic(responseData);
      result.age = responseData.age;
      result.glasses = responseData.glasses;
      result.gender = gender(responseData);
      result.imageURL = imgURL;      

      //send data to handlebarsjs
      res.render("index", result);      
  });
})

//listen to PORT;

app.listen(PORT, function(){
  console.log("Start listen on PORT: " + PORT);
})

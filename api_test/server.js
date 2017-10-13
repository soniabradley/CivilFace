// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var formidable = require('formidable');
var fs = require('fs');
var base64Img = require('base64-img');
var path = require("path");
var request = require('request');
var uploadImage = require("./api.js");

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
      gender = "Female";
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

app.post('/upload', function(req, res){
  // create an incoming form object
  var form = new formidable.IncomingForm();
  //  allow the user to upload multiple files in a single request
  form.multiples = true;
  form.keepExtensions = true;
  // store all uploads in the /uploads
  form.uploadDir = path.join(__dirname, './uploads');

  form.on('file', function(field, file) {
    // console.log(file.name);
    // console.log("file.path: " + file.path);
      fs.rename(file.path, path.join(form.uploadDir, file.name));  // rename file to original name

       // function to encode image to base64
      var getDir = "./uploads/" + file.name;
      console.log(getDir);
      base64Img.base64(getDir, function(err, data){
          fs.writeFile('base64.txt', data, (err) => {
              if (err) throw err;
              console.log('Your base64 img data was appended to file!');
            });
      });
      // end encode to base64
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
  
  res.send("Upload successful");
  //calling KAIROS API
});


//listen;
app.listen(PORT, function(){
  console.log("Start listen on PORT: " + PORT);
})

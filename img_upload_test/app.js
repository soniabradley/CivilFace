var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var fs = require('fs');
var formidable = require('formidable');


// app.use(express.bodyParser({uploadDir:'./uploads'}));
app.get("/", function(req, res){
    // var test = path.join(__dirname, "index.html");
    // console.log(test);
    res.sendFile(path.join(__dirname, "index.html"));
});

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
  res.redirect("/");
});


app.listen(3303, function(){
    console.log("Start listen on PORT 3302");
});

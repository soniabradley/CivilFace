var formidable = require('formidable');
var fs = require('fs');
var base64Img = require('base64-img');
var path = require("path");

module.exports = function handleUpload(cb){
    var form = new formidable.IncomingForm();
    //  allow the user to upload multiple files in a single request
    form.multiples = true;
    form.keepExtensions = true;
    // store all uploads in the /uploads
    form.uploadDir = path.join(__dirname, '..img_upload/uploads');
    
    form.on('file', function(field, file) {
      // console.log(file.name);
      // console.log("file.path: " + file.path);
        fs.rename(file.path, path.join(form.uploadDir, file.name));  // rename file to original name
    
         // function to encode image to base64
        var getDir = "..img_upload/uploads" + file.name;
        console.log(getDir);
        base64Img.base64(getDir, function(err, data){
          request({
            method: 'POST',
            url: 'https://api.kairos.com/detect?image=',
            headers: {
              'Content-Type': 'application/json',
              'app_id': '7167ee1b',
              'app_key': '35e70a4c3036a339cc3954f24255a4e5'
            },
            body: '{  "image": "'+ data +'",  "selector": "ROLL"}'
          }, function (error, response, body) {
              var responseData = JSON.parse(body);
          //   console.log('Status:', response.statusCode);
          //   console.log('Headers:', JSON.stringify(response.headers));
              responseData = responseData.images[0].faces[0].attributes;
               console.log('Response:', responseData);
               cb();        
          });
        });
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
}

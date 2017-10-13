var base64Img = require('base64-img');
var fs = require("fs");
// Import the model (.js) to use its database functions.
var getDir = "../img_upload/uploads/reo.png";
    base64Img.base64(getDir, function(err, data){
        fs.writeFile('base64.txt', data, (err) => {
            if (err) throw err;
            console.log('Your base64 img data was appended to file!');
          });
    });


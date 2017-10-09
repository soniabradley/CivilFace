var base64Img = require('base64-img');
var fs = require("fs");

base64Img.base64("./image/test.png", function(err, data){
    fs.writeFile('test.txt', data, (err) => {
        if (err) throw err;
        console.log('Your base64 img data was appended to file!');
      });
})
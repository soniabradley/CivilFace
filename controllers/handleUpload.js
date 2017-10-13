var request = require('request');
var fs = require("fs");
fs.readFile("..img_upload/base64.txt", "utf8", function(err, data){
    if(err) throw err;
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
    });
});

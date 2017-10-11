var request = require('request');
var fs = require("fs");
var imgURL = "https://pbs.twimg.com/profile_images/889736688624312321/xVAFH9ZH_400x400.jpg";  
fs.readFile("./base64.txt", "utf8", function(err, data){
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
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
    });
});


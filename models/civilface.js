// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js")

var civilface = {
    insertData: function(imgURL, cb){
        //request API
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
              console.log(result);

              orm.insertData("#table_name",cols, vals, function(res){
                cb(res);
            })
          });

    },

    getData: function(){

    };
}

// Export the database functions for the controller (controller.js).
module.exports = civilface;
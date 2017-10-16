// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js")
var request = require("request");
var fs = require("fs");
var path = require("path");


//function glasses
function glass(data){
  var glasses = data.glasses;
  switch(glasses) {
    case "Eye":
      glasses = 1;
      break;
    case "Glasses":
      glasses = 1;
      break;
    default:
      glasses = 0
  }
  return glasses;
}
// function to get maximum ethnic
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

// function to get maximum of gender
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


var civilface = {
    insertDetails: function(imgURL, cb){
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
              if (error) throw error;
              else {
                var responseData = JSON.parse(body);
                responseData = responseData.images[0].faces[0].attributes;              
                //build data object result={} and save to mySQL
                var result = {};
                result.ethnic = ethnic(responseData);
                result.age = responseData.age;
                result.glasses = glass(responseData);
                result.gender = gender(responseData);
                result.imageURL = imgURL;      
                console.log(result);
                orm.insertDetails("personDetails",result.imageURL, result.age, result.ethnic, result.gender, result.glasses, function(res){
                  cb(result);
                });
            }
          });
    },

    getDetails_base64 : function(cb){
      var getDir = path.join(__dirname,"../controllers/base64.txt");
      fs.readFile(getDir, "utf8", function(err, data){
        if(err) throw err;
        else{
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
            //function to get uploaded img path
              fs.readFile(path.join(__dirname,"../controllers/img.txt"), function(err, data2){
                var imgURL = data2;
                var responseData = JSON.parse(body);
                responseData = responseData.images[0].faces[0].attributes;
                console.log('Response:', responseData);
                var result = {};
                result.ethnic = ethnic(responseData);
                result.age = responseData.age;
                result.glasses = glass(responseData);
                result.gender = gender(responseData);
                result.imageURL = imgURL;      
                orm.insertDetails("personDetails",result.imageURL, result.age, result.ethnic, result.gender, result.glasses, function(res){
                  cb(result);
                });
              });
          });
        }
      });
    }
}
// Export the database functions for the controller (controller.js).
module.exports = civilface;
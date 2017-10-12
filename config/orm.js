// Import MySQL connection.
var connection = require("../config/connection.js");

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



// orm object contains 2 methods: get data from mysql, insert data to mysql
var orm = {
    
};


module.exports = orm;
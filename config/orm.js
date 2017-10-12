// Import MySQL connection.
var connection = require("../config/connection.js");


// orm object contains 2 methods: get data from mysql, insert data to mysql
var orm = {
    insertData: function(table, cols, vals, cb){
      var queryString = "";
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

    getData: function(){
        
    }
};


module.exports = orm;
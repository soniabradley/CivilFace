// included connection.js file
var connection = require("../config/connection.js");

var orm =
{
	// Retreiving all columns og specific person
	selectAll: function(tableInput, valOfCol, cb){

		var queryString = "SELECT * FROM ?? WHERE person_id = ?";
		connection.query(queryString, tableInput, valOfCol, function(err, result)
		{
			if(err)
				console.log(err);
			else
				console.log(result);
				cb(result);
		});

  },
  
	selectAllMaxId: function(tableInput, cb){
    
        var queryString = "SELECT * FROM ?? WHERE person_id = max(person_id)";
        connection.query(queryString, tableInput, function(err, result)
        {
          if(err)
            console.log(err);
          else
            console.log(result);
            cb(result);
        });
    
      },
	
	//inserting the row of a speficific person
	insertDetails : function(tableInput, imageCol, ageCol, ethiniCol, genderCol, glassCol, cb){

		var queryString = "INSERT INTO " + tableInput + "(image, age, ethinicity, gender, glasses) VALUES(" + "'" + imageCol + "' ," + ageCol +", '" + ethiniCol + "' , '"
															 + genderCol + "' , '"  + glassCol + " ' )";

		connection.query(queryString, function(err, result){

			if(err)
				console.log(err);
			else
				console.log(result);
				cb(result);
		});
	}

};
module.exports = orm;
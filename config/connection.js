// Set up MySQL connection.
var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
   } else {
     connection = mysql.createConnection({
  host: "localhost",
  user: "root",
<<<<<<< HEAD
  password: "MyNewPass",
=======
  password: "root",
>>>>>>> cec13dc9d5c79e2185e4231b54933c6c6044004c
  database: "civilface_DB"
});
};
// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;

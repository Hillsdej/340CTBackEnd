var mysql = require('mysql');

exports.createConnection= function(conData, callback)
{
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "Stock"
  });

  con.connect(function(err){
    if (err) callback(err);
    callback(null, con);
  });
};

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE Stock", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
// });

exports.createTables = function(conData, callback){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "Stock"
    });

    var sql = "CREATE TABLE Items (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), quantity INT, date DATE)";
    con.query(sql, function (err, result){
        if (err) throw err;
        console.log("Table created");
    });
};
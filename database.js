var mysql = require('mysql');

exports.createConnection= function(conData, callback)
{
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "SmartMart"
  });

  con.connect(function(err){
    if (err) callback(err);
    callback(null, con);
  });
};

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE SmartMart", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
// });

exports.createTables = function(conData, callback){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "SmartMart"
    });

    var sql = "CREATE TABLE Order_Items(order_id INT, item_id INT, amount INT)";
    con.query(sql, function (err, result){
        if (err) throw err;
        console.log("Table created");
    });
};

//To check all items
selectAllItems = function(conData, callback){
    var con =mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"password",
      database:"SmartMart"
    });

    var sql ="SELECT * FROM Stock;"
    con.query(sql, function(err, result){
      if (err) throw err;
      console.log(result);
    });
};

selectAllItems();
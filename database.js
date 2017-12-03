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
selectAllOrders = function(conData, callback){
    var con =mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"password",
      database:"SmartMart"
    });

    var milk = 'milk'
    var sql = 'SELECT * FROM Orders ;'
    //var sql ="SELECT item_id FROM Stock ORDER BY item_id DESC LIMIT 1;"
    //var sql ="ALTER TABLE Order_Items ADD PRIMARY KEY(order_id,item_id);"
    var x;
    con.query(sql, function(err, x){
      if (err) throw err;
      console.log(x);
    });
};

// selectAllOrders();
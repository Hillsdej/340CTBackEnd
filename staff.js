var db = require('./database');
//var authentication = require('./security')
//const bcrypt = require('bcryptjs')
//var auth = require('./authenticate');

exports.add = function(conData, req, callback){
    db.createConnection(conData, function(err, data){
        if (err){
            callback(err);
            return;
        }

        var staff = {
            name: req.body['name'],
            role: req.body['role'],
            password: req.body['password']
        };

        // const bcrypt = require('bcryptjs');
        // user.password = bcrypt.hashSync(user.password, 10);

        data.query('INSERT INTO Staff SET ?', staff, function(err, result){
            callback(err, staff);
        });
    });
};

exports.getAll = function(conData, req, callback){
    "use strict"
    db.createConnection(conData, function(err, data){
        if (err){
            callback(err);
            return;
        }

        data.query('SELECT * from Staff', function(err, result){
            let data = JSON.stringify(result);
            callback(err, data);
        });
    });
};

// exports.login = function(conData,req,callback){
//     db.createConnection(conData, function(err, data)
//     {
//         if (err)
//         {
//             callback(err);
//             return err;
//         }

// }




// exports.getUserCredentials = function(conData, req, callback){
//     db.createConnection(conData, function(err, data)
//     {
//         if (err)
//         {
//             callback(err);
//             return err;
//         }

//         var userCredentials = authentication.getCredentials(req);
//         var sql = 'SELECT password FROM users WHERE username = "' + userCredentials.username + '"';      

//         data.query(sql, function(err, result, fields){
//             console.log("dataquery running")
//             if (err) throw err;
//             return setValue(result);
//             //console.log("still running?")
//         });

//         var password = "";
//         function setValue (value) {
//             console.log("setValue function running");
//             password = value;
//             console.log("setValue function:")
//             console.log(password[0].password);


//             if(!bcrypt.compareSync(userCredentials.password, password[0].password)){
//                 console.log('There is no match')
//                 callback(Error("No Match"))
//             }
//             else{
//                 console.log("Passwords are the same")
//                 callback();
//             }
//         }
//     });
    
//     //return err;
// };

// exports.login = function(conData, req, callback){
//     db.createConnection(conData, function(err,data){
//         if(err){
//             callback(err);
//             return;
//         }

//         auth.loginUser(conData, req, function(err,result){
//             if(err){
//                 callback(err);
//                 return;
//             }

//             var data;
            
//             if(result.login === "successful"){
//                 data = {value:1, message:"login success"};
//             }
//             else{
//                 data = {value:0, message:"Incorrect username or password"};
//             }
//             callback(null, data);
//         });      
//     });
// };

// exports.getByID = function(conData, req, callback){
//     "use strict"
//     db.createConnection(conData, function(err,data){
//         if(err){
//             callback(err);
//             return;
//         }

//         auth.loginUser(conData,req, function(err, result){
//             if (err){
//                 callback(err);
//                 return;
//             }
//             if(result.login ==="successful"){
//                 let id = req.params.id;

//                 data.query('SELECT username FROM users WHERE id = ' + id, function(err,result){
//                     let data = JSON.stringify(result);
//                     callback(err,data);
//                 });
//             }
//             else{
//                 let err = {message:"username or password is incorrect"}
//                 callback(err)
//             }

//         });
//     });
// }

// exports.updateUser = function(conData, req, callback){
//     "use strict"
//     db.createConnection(conData, function(err,data){
//         if(err){
//             callback(err);
//             return;
//         }

//         auth.loginUser(conData,req, function(err, result){
//             if (err){
//                 callback(err);
//                 return;
//             }
//             if(result.login ==="successful"){
//                 let id = req.params.id;

//                 var user = {username: req.body['username']};

//                 data.query('UPDATE users SET ? WHERE id = ' + id, user, function(err,result){
//                     let data = JSON.stringify(result);
//                     callback(err,user);
//                 });
//             }
//             else{
//                 let err = {message:"username or password is incorrect"}
//                 callback(err)
//             }

//         });
//     });
// }

// exports.deleteById = function(conData, req, callback){
//     "use strict"
//     db.createConnection(conData, function(err,data){
//         if(err){
//             callback(err);
//             return;
//         }

//         auth.loginUser(conData,req, function(err, result){
//             if (err){
//                 callback(err);
//                 return;
//             }
//             if(result.login ==="successful"){
//                 let id = req.params.id;

//                 data.query('DELETE from users WHERE id = ' + id, function(err,result){
//                     let data = JSON.stringify(result);
//                     callback(err,data);
//                 });
//             }
//             else{
//                 let err = {message:"username or password is incorrect"}
//                 callback(err)
//             }

//         });
//     });
// };
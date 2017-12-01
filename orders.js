var db = require('./database');
var auth = require('./authentication');

exports.add = function(conData, req, callback){
    "use strict"
    db.createConnection(conData, function(err, data){
        if (err){
            callback(err);
            return;
        }

        auth.loginStaff(conData, req, function(err, result){
            if (err){
                callback(err);
                return;
            }
            console.log(result.login);
            console.log(result);
            
            if (result.login === "successful"){
                var order = {
                    arrived : false,
                    staff_id: result.staff_id[0].staff_id,
                    date: new Date()
                };

                data.query('INSERT INTO Orders SET ?', order, function(err, result){
                    callback(err, order);
                });

            }
            else{
                let err = "incorrect name or password";
                callback(err);
                return;
            }
        })
    });
};

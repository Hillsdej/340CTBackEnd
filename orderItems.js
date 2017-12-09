var db = require('./database');

exports.getAll = function(conData, req, callback){
    "use strict"
    db.createConnection(conData, function(err, data){
        if (err){
            callback(err);
            return;
        }

        data.query('SELECT * from Order_Items', function(err, result){
            let data = JSON.stringify(result);
            callback(err, data);
        });
    });
};

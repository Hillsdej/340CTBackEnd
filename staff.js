var db = require('./database');

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

        data.query('SELECT staff_id, name, role from Staff', function(err, result){
            let data = JSON.stringify(result);
            callback(err, data);
        });
    });
};
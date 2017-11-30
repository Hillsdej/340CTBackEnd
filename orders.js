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
            name : req.body['name'],
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

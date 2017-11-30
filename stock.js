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

        var item = {
            item_name: req.body['item_name'],
            item_price: req.body['item_price'],
            quantity: req.body['quantity'],
            maximum_stock: req.body['maximum_stock'],
            minimum_stock: req.body['minimum_stock'],
            date: new Date()
        };

        // const bcrypt = require('bcryptjs');
        // user.password = bcrypt.hashSync(user.password, 10);

        data.query('INSERT INTO Stock SET ?', item, function(err, result){
            callback(err, item);
        });
    });
};

exports.deleteById = function(conData, req, callback){
    "use strict"
    db.createConnection(conData, function(err,data){
        if(err){
            callback(err);
            return;
        }

        let id = req.params.id;

        data.query('DELETE from Stock WHERE item_id = ' + id, function(err,result){
            let data = JSON.stringify(result);
            callback(err,data);
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

        data.query('SELECT * from Stock', function(err, result){
            let data = JSON.stringify(result);
            callback(err, data);
        });
    });
};

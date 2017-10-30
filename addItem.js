var db = require('./database');

exports.add = function(conData, req, callback){
    db.createConnection(conData, function(err, data){
        if (err){
            callback(err);
            return;
        }

        var item = {
            name: req.body['name'],
            quantity: req.body['quantity'],
            date: req.body['date']
        };

        data.query('INSERT INTO Items SET ?', item, function(err, result){
            callback(err, item);
        });
    });
};
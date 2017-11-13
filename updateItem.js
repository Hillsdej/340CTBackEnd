var db = require('./database');

// use get method to retrieve name of item from frontend form data
// check if item exists in table with a get method
// if item exists update item quantity and date and return success message, else return an error message

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

        // data.query('INSERT INTO Items SET ?', item, function(err, result){
        //     callback(err, item);
        // });
    });
};
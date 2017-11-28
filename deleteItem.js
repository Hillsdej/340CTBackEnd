var db = require('./database');

//use get method to retrieve name of item from frontend form data
//check if item exists in table with a get method
//if item exists delete item and return success message, else return an error message

exports.deleteByID = function(conData, req, callback){
    db.createConnection(conData, function(err, data){
        if (err){
            callback(err);
            return;
        }
        
        id = req.params.id;
        console.log(id);

        data.query(' DELETE FROM Items WHERE id = '+ id, function(err, result){
            data = JSON.stringify(result);
            callback(err, data);
        });
    });
};
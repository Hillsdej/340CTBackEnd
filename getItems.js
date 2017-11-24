var db = require("./database");

exports.getAll = function(conData, req, callback){
    db.createConnection(conData, function(err,data){
        if(err){
            callback(err);
            return;
        }
        data.query("SELECT * FROM Items", function(err, result){
            data = JSON.stringify(result);
            callback(err, data);
        });
    });
};

var db = require('./database');
var validate = require('./validation')
//var authentication = require('./security')
//const bcrypt = require('bcryptjs')
//var auth = require('./authenticate');

exports.add = function(conData, req, callback){
    "use strict"
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
        
        var itemArray = [];
        
        for(var i in item)
            itemArray.push(item[i]);

        validateStr = validate.validateStr(item.item_name);
        if (validateStr == "invalid"){
            let err = "invalid type"
            callback(err);
            return
        }
        else if(validation == "empty field"){
            let err = "missing/empty field"
            callback(err);
            return
        } 
        else if(validation == "string too long"){
            console.log("error at: "+ i)
            let err = "item over max character count"
            callback(err);
            return
        } 
        
        
        for (i=2; i<6; i++){
            var validateInt = validate.validateInt(itemArray[i]);
            if (validateInt == "invalid"){
                console.log("error at: "+ i)
                let err = "invalid type"
                callback(err);
                return
            }
            else if(validation == "empty field"){
                console.log("error at: "+ i)
                let err = "missing/empty field"
                callback(err);
                return
            } 
        }

        

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

        data.query('DELETE FROM Stock WHERE item_id = ' + id, function(err,result){
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

        data.query('SELECT * FROM Stock', function(err, result){
            let data = JSON.stringify(result);
            callback(err, data);
        });
    });
};

exports.updateById = function(conData, req, callback ){
    'use strict'
    db.createConnection(conData, function(err, data){
        if (err){
            callback(err);
            return;
        }

        let id = req.params.id;

        var itemInfo;
        data.query('SELECT quantity FROM Stock WHERE item_id = '+id, function(err,itemInfo){
            callback(err, itemInfo);  
            makeSale(itemInfo, id);
        })
        //console.log(itemInfo);
        function makeSale(itemInfo, item_id){
            console.log(itemInfo)
            var item = {
                quantity: itemInfo[0].quantity - req.body['quantity'],
                date: new Date()
            };
            data.query('UPDATE Stock SET ? WHERE item_id = ' + item_id, item, function(err, result){
                callback(err, result);
            });
        }
    });
};

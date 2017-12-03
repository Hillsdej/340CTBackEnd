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

                //get order id from

                data.query('INSERT INTO Orders SET ?', order, function(err, result){
                    if(err){
                        callback(err);
                        return;
                    }
                    else{
                         addToOrderItems();
                    }
                    callback(err, order);                    
                });
            }
            else{
                let err = "incorrect name or password";
                callback(err);
                return;
            }
        });

        function addToOrderItems(){
            var order_id;
            data.query('SELECT order_id FROM Orders ORDER BY order_id DESC LIMIT 1;', function(err,order_id){
                if(err){
                    callback(err);
                    return;
                }
                else{
                    var item_id;
                    data.query('SELECT item_id FROM Stock WHERE item_name="' + req.body['item_name'] + '";', function(err,item_id){
                        if (err) throw err;
                        
                        var itemInfo = {
                            order_id : order_id[0].order_id,
                            item_id : item_id[0].item_id,
                            amount : req.body['amount']
                        }
                        
                        data.query('INSERT INTO Order_Items SET ?', itemInfo, function(err, result){
                            callback(err, itemInfo);
                        });
                    })
                }
            })
        }

    });
};

exports.updateById = function(conData, req, callback){
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

            var order = {
                arrived : true,
                staff_id: result.staff_id[0].staff_id,
                date: new Date()
            }
            
            if (result.login === "successful"){
                data.query(' UPDATE Orders SET ? WHERE order_id = ' +req.params.id, order, function(err, result){
                    callback(err, data);
                });
                var itemInfo;
                data.query('SELECT item_id, amount FROM Order_Items WHERE order_id = "'+req.params.id+'"', function(err, itemInfo){
                    callback(err,itemInfo);
                    getQuantity(itemInfo);
                    //return itemInfo;
                })
            }
        });
        
        function getQuantity(itemInfo){
            console.log(itemInfo)
            

            data.query('SELECT quantity FROM Stock WHERE item_id = "'+itemInfo[0].item_id+'";', function(err, result){
                console.log("this is the result")
                console.log(result);
                updateStock(result, itemInfo);
                callback(err, result);
            })
        }

        function updateStock(quantity, itemInfo){
            var item = {
                quantity: itemInfo[0].amount + quantity[0].quantity,
                date: new Date()
            };
    
            
            data.query(' UPDATE Stock SET ? WHERE item_id = ' + itemInfo[0].item_id, item, function(err, result){
                callback(err, result);
            });
        }
    });
} 

exports.getAll = function(conData, req, callback){
    "use strict"
    db.createConnection(conData, function(err, data){
        if (err){
            callback(err);
            return;
        }

        data.query('SELECT * from Orders', function(err, result){
            let data = JSON.stringify(result);
            callback(err, data);
        });
    });
};

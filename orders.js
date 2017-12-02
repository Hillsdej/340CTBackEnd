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
                    console.log(order_id);
                    console.log(req.body['item_name'])
                    var item_id;
                    data.query('SELECT item_id FROM Stock WHERE item_name="' + req.body['item_name'] + '";', function(err,item_id){
                        if (err) throw err;
                        console.log(item_id)
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

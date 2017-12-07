'use strict'

var db = require("./database");

exports.loginStaff = (conData, request, callback)=>{
    if (request.authorization === undefined || request.authorization.basic === undefined){
        let err = {message:'authorization header missing'};
        console.log(err.message);
        callback(err);
        return;
    }
    
    const auth = request.authorization.basic;

    if (auth.username === undefined || auth.password === undefined){
        let err = {message:'missing username and/or password'};
        console.log(err.message);
        callback(err);
        return; 
    }

    db.createConnection(conData, function(err,data){
        if (err){
            console.log("failed to connect to database");
            callback(err);
            return;
        }

        console.log(auth.username)
        data.query('SELECT staff_id FROM Staff WHERE name="'+auth.username+'"AND password="'+auth.password+'";',function(err,result){
            console.log(result);
            if(err){
                console.log("error executing query");
                callback(err);
                return;
            }

            if(result && result.length > 0){
                callback(null, {login:"successful", staff_id:result});
            }
            else{
                let err = "Incorrect username or password"
                callback(err);
                return;
            }
        });
    });
}

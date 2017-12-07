//imports necessary modules
var restify = require('restify');
var item = require('./addItem');
var staff = require('./staff');
var stockProcessor = require('./stock');
var db = require('./database');
var orderProcessor = require('./orders');
var orderItemProcessor = require('./orderItems');
var items = require("./getItems");
var removeItem = require("./deleteItem");

const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins:['http://127.0.0.1:8081'],
    credentials:true,
    allowHeaders:['API-Token', 'Authorization'],
    exposeHeaders: ['API-Token-Expiry']
});

//creates restful API
const eventLoop = restify.createServer(); //constant loop that looks for client requests
eventLoop.pre(cors.preflight);
eventLoop.use(cors.actual);

eventLoop.use(restify.plugins.fullResponse());
eventLoop.use(restify.plugins.bodyParser());
eventLoop.use(restify.plugins.queryParser());
eventLoop.use(restify.plugins.authorizationParser());

//information required to access the database
const databaseData = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "SmartMart"
};

//runs on localhost port
var port = 8080;

//---------------Staff Events--------------------------//
eventLoop.post('staff',(req, res)=>{
    staff.add(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
        }
        res.status(201);
        res.end("success");
    });
});

eventLoop.get('staff',(req, res)=>{
    staff.getAll(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        res.status(200);
        res.end(data);
    });
});

//------------------Stock Events----------------------//
eventLoop.post('stock',(req, res)=>{
    stockProcessor.add(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            console.log(err)
            res.end("error: "+err);
        }
        res.status(201);
        res.end("success");
    });
});

eventLoop.get('stock',(req, res)=>{
    stockProcessor.getAll(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        res.status(200);
        res.end(data);
    });
});

//for updating stock removing
eventLoop.put('stock/:id',(req,res)=>{
    
    stockProcessor.updateById(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        
        res.status(200);
        res.end("success");
    });
});

eventLoop.del('stock/:id',(req, res)=>{
    stockProcessor.deleteById(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        res.status(201);
        res.end(data);
    });
})

//--------------------Order Events-----------------//
eventLoop.post('order',(req, res)=>{
    orderProcessor.add(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
        }
        res.status(201);
        res.end("success");
    });
});

eventLoop.get('order',(req, res)=>{
    orderProcessor.getAll(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        res.status(200);
        res.end(data);
    });
});

eventLoop.put('order/:id',(req,res)=>{
    
    orderProcessor.updateById(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        
        res.status(200);
        res.end("success");
    });
});

eventLoop.del('order/:id',(req, res)=>{
    orderProcessor.deleteById(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        res.status(200);
        res.end(data);
    });
});

//---------------Order Item Events--------------//

eventLoop.get('order/item',(req, res)=>{
    orderItemProcessor.getAll(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        res.status(200);
        res.end(data);
    });
});

eventLoop.listen(port, err => {
    if (err) {
        console.error(err)
    }
    else{
        console.log('App is ready on port 8080')
    }
});

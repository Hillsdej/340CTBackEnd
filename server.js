var restify = require('restify');
var item = require('./addItem');
var staff = require('./staff');
var stock = require('./stock');
var db = require('./database');
var order = require('./orders');
var orderItems = require('./orderItems');
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

//create restify module
const eventLoop = restify.createServer();
eventLoop.pre(cors.preflight);
eventLoop.use(cors.actual);

eventLoop.use(restify.plugins.fullResponse());
eventLoop.use(restify.plugins.bodyParser());
eventLoop.use(restify.plugins.queryParser());
eventLoop.use(restify.plugins.authorizationParser());

const databaseData = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "SmartMart"
};

var port = 8080;
//---------------staff--------------------------//
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

//------------------stock----------------------//
eventLoop.post('stock',(req, res)=>{
    stock.add(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            console.log(err)
            res.end("error: "+err);
        }
        res.status(201);
        res.end("success");
    });
});

eventLoop.del('stock/:id',(req, res)=>{
    stock.deleteById(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        res.status(201);
        res.end(data);
    });
})

eventLoop.get('stock',(req, res)=>{
    stock.getAll(databaseData, req, function(err, data){
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
    
    stock.updateById(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        
        res.status(200);
        res.end("success");
    });
});

//for updating order adding 
eventLoop.put('order/:id',(req,res)=>{
    
    order.updateById(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        
        res.status(200);
        res.end("success");
    });
});

eventLoop.post('order',(req, res)=>{
    order.add(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
        }
        res.status(201);
        res.end("success");
    });
});

eventLoop.get('order',(req, res)=>{
    order.getAll(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        res.status(200);
        res.end(data);
    });
});

eventLoop.get('order/item',(req, res)=>{
    orderItems.getAll(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        res.status(200);
        res.end(data);
    });
});

eventLoop.del('order/:id',(req, res)=>{
    order.deleteById(databaseData, req, function(err, data){
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

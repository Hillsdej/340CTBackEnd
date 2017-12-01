var restify = require('restify');
var item = require('./addItem');
var staff = require('./staff');
var stock = require('./stock');
var db = require('./database');
var items = require("./getItems")
var removeItem = require("./deleteItem")

const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins:['http://127.0.0.1:8081'],
    credentials:true,
    allowHeaders:['API-Token', 'Authorization'],
    exposeHeaders: ['API-Token-Expiry']
});

//create restify module
const server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.authorizationParser());

const databaseData = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "SmartMart"
};

var port = 8080;
//---------------staff--------------------------//
server.post('staff',(req, res)=>{
    staff.add(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
        }
        res.status(201);
        res.end("success");
    });
});

server.get('staff',(req, res)=>{
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
server.post('stock',(req, res)=>{
    stock.add(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
        }
        res.status(201);
        res.end("success");
    });
});

server.del('stock/:id',(req, res)=>{
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

server.get('stock',(req, res)=>{
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

server.put('stock/:id',(req,res)=>{
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




server.listen(port, err => {
    if (err) {
        console.error(err)
    }
    else{
        console.log('App is ready on port 8080')
    }
});

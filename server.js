var restify = require('restify');
var item = require('./addItem');
var staff = require('./staff');
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

// server.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Methods","GET");
//     res.header("Access-Control-Allow-Headers","Content-Type");
//     next();
// })

const databaseData = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "SmartMart"
};

var port = 8080;

server.post('item/add',(req, res)=>{
    item.add(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
        }
        res.status(201);
        res.end("success");
    });
});

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


server.get('/items',(req, res)=>{
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // db.selectAllItems(databaseData, req, function(err, data){
        items.getAll(databaseData, req, function(err,data){
       
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts','GET');
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        console.log("reached?");
        console.log(data);

        // res.send(200,data);
        res.status(200);
        res.end(data);
    });
});

server.del('/items/4',(req,res)=>{
    removeItem.deleteByID(databaseData, req, function(err,data){
        if(err){
            res.status(400);
            res.end("error: "+err);
            return;
        }
        console.log("reached?");
        console.log(data);

        // res.send(200,data);
        res.status(200);
        res.end(data);
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

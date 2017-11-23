var restify = require('restify');
var user = require('./addItem');
var db = require('./database');

const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins:['*'],
    allowHeaders:['API-Token'],
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
    database: "Stock"
};

var port = 8080;

server.post('item/add',(req, res)=>{
    user.add(databaseData, req, function(err, data){
        if(err){
            res.status(400);
            res.end("error: "+err);
        }
        res.status(201);
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
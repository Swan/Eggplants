// Express
var express = require('express');
var app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
}); 


// Path
var path = require('path');

// Body-Parser
var bodyParser = require('body-parser');

// Require in our routes
 var indexRoutes = require('./routes/index');

// Cors
 var cors = require('cors');
 app.use(cors())

// Setting Port
app.set('port', 8080);

// Logging GET & POST Requests
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});


// Use Public Folder
app.use(express.static(__dirname + "/public"));

// Use node_modules Folder
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Use Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Use Routes
app.use(indexRoutes);

    app.all('/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE");
        console.log("Hello")
        next();
    });


// Start server
var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log("Server started on port: " + port);
});

// Express
var express = require('express');
var app = express();

// Path
var path = require('path');

// Body-Parser
var bodyParser = require('body-parser');

// Require in our routes
 var indexRoutes = require('./routes/index');

// Cors
 var cors = require('cors');

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

// Use cors
app.use(cors({origin: 'http://localhost:8888'}));

// Use Routes
app.use(indexRoutes);

// Start server
var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log("Server started on port: " + port);
});

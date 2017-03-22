
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index');

const logger = require('morgan');
app.use(logger('dev'));

app.set('port', 8080);

app.use(express.static(__dirname + "/public"));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(indexRoutes);

const server = app.listen(app.get('port'), function(){
    const port = server.address().port;
    console.log("Server started on port: " + port);
});

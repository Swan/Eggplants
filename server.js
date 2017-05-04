const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const api = require('./routes/api');
const index = require('./routes/index');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);
app.use('/', index);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Port the application will be served const
const PORT = process.env.PORT || '8080';

// Listen to requests on the provided port
app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});
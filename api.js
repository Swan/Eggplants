const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config/config.json');
const routes = require('./routes');

// App Setup
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

const PORT = process.env.PORT || config.api_server_port;
app.listen(PORT, () => {
   console.log(`[API] HTTP API SERVER STARTED ON PORT: ${PORT}`);
});
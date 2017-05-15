const mongoose = require('mongoose');
const config = require('../config/config.json');

mongoose.Promise = global.Promise;

mongoose.connect(config.MONGODB_URI, (err) => {
    if (err) throw new Error(err);
    console.log("Successfully connected to the database");
});
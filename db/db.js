const mongoose = require('mongoose');
const config = require('./config.json');

mongoose.connect(config.mongoURI, err => {
  if (err) throw new Error("Error connecting to the database. Please check your MongoDBURI configuration.", err);
  console.log("Connected to the database!");
});

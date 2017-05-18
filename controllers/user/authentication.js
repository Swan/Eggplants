const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../../models/user');

module.exports.register = (req, res) => {
  // If all three don't exists, then return
  if (!req.body.username && req.body.email && req.body.password) {
    return res.status(400).json({status: 400, error: "Bad Registration Request"});
  }

  // Create a new user and attempt to save to the database
  let user = new User();
  
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save((err) => {
    
    // Return error if unable to save to the database
    if (err) {
      return res.status(500).json({status: 500, error: "Internal Server Error, Could not create user"});
    }

    // Generate a JWT & return it
    let token = user.generateAuthToken();
    return res.status(200).json({ status: 200, token: token });
  });

};

module.exports.login = (req, res) => {
    console.log(`Logging in user: ${req.body.username}`);
    res.status(200);
    res.json({
      status: 200,
      message: `Successfully logged in user: ${req.body.username}`
    });
};

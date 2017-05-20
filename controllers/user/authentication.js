const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../../models/user');

module.exports.register = (req, res) => {
  // If all three don't exists, then return
  if (!req.body.username && req.body.email && req.body.password) {
    return res.status(400).json({status: 400, error: err});
  }

  // Create a new user and attempt to save to the database
  let user = new User();
  
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save((err) => {
    
    // Return error if unable to save to the database
    if (err) {
      return res.status(500).json({status: 500, error: err});
    }

    // Generate a JWT & return it
    let token = user.generateAuthToken();
    return res.status(200).json({ status: 200, token: token });
  });

};


module.exports.login = (req, res) => {
  // If somehow a username or email was never provided
   if (!req.body.username && req.body.password)
    return res.status(400).json({status: 400, error: err}); 

  // Authenticate the user
  passport.authenticate('local', (err, user, info) => {
    let token;

    // Error handling
    if (err) return res.status(404).json(err);

    // If a user is found, generate a JWT and return it
    if (user) {
      token = user.generateAuthToken();
      return res.status(200).json({status: 200, token: token});
    // If a user wasn't found
    } else {
      res.status(401).json(info);
    }

  })(req, res);
};

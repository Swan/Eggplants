const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../../models/user');

module.exports.register = (req, res) => {
  // If all three don't exists, then return
  if (!req.body.username && req.body.email && req.body.password) {
    return res.status(200).json({status: 200, ok: false, message: "A username, email, or password was not provided."});
  }

  // If Password is too short
  if (req.body.password.length < 6) return res.status(200).json({status: 200, ok: false, message: "The password provided is too short"});

  // Create a new user and attempt to save to the database
  let user = new User();
  
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save((err) => {
    
    // Return error if unable to save to the database
    if (err) {
      return res.status(200).json({status: 200, ok: false, message: err});
    }

    // Return that the user successfully signed ok
    return res.status(200).json({ status: 200, ok: true, message: `${user.username} has successfully registered!`});
  });

};


module.exports.login = (req, res) => {
  // If somehow a username or email was never provided
   if (!req.body.username && req.body.password)
    return res.status(200).json({status: 200, ok: false, message: err}); 

  // Authenticate the user
  passport.authenticate('local', (err, user, info) => {
    let token;

    // Error handling
    if (err) return res.status(200).json({status: 200, ok: false, message: err});

    // If a user is found, generate a JWT and return it
    if (user) {
      token = user.generateAuthToken();
      return res.status(200).json({status: 200, ok: true, token: token});
    // If a user wasn't found
    } else {
      res.status(200).json({status: 200, ok: false, message: info});
    }

  })(req, res);
};

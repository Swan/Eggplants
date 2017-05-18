const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user.js');

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    },
    (req, username, password, done) => {
    User.findOne({username: username.toLowerCase()}, (err, user) => {
        // Return if err
        if (err) return done(err);

        // Return if user not found in database
        if (!user) return done(null, false, {message: "User not found!"});
        
        // Return if password is wrong
        if (!user.validatePassword(password)) return done(null, false, {message: "Password was incorrect"});
    
        // If credentials were correct, return the user object
        return done(null, user);
    })
}
))
const mongoose = require('mongoose');
const User = require('../../models/user');

module.exports.userSettings = (req, res) => {
    // If no user id exists in the JWT, return a 401
    if (!req.payload._id) 
        return res.status(401).json({status: 401, message: "UnauthorizedError: User not authenticated"});
    else
        // Return the user if they exist
        User.findById(req.payload._id)
            .exec((err, user) => {
                if (err) return res.status(400).json({status: 500, message: "Bad Request"});
                return res.status(200).json(user);
            });  
};
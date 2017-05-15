const mongoose = require('mongoose');
const _ = require('lodash');
const User = require('../../models/euser');

module.exports.createUser = (req, res) => {
    let body = _.pick(req.body, ['username', 'email', 'password', 'privileges']);

    let user = new User(body);
    user.save(user).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
};
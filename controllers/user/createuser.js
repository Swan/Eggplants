const mongoose = require('mongoose');
const _ = require('lodash');
const User = require('../../models/user');

module.exports.createUser = (req, res) => {
    let body = _.pick(req.body, ['username', 'email', 'password', 'privileges']);

    let user = new User(body);
    user.save(user).then((user) => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
};

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const config = require('../config/config.json');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        unique: true,
        validate: [{
            validator: value => validator.isEmail(value),
            msg: 'Invalid Email.'
        }]
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    privileges: {
        type: Number,
        required: false,
        default: 0
    },
    collections: [{
        name: {
            type: String,
            minlength: 3,
            maxlength: 32,
            required: false
        },
        mapsets: [{
            type: Number,
            required: false
        }]
    }]
});


// Generates a jwt for the user
userSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access: access}, config.secret).toString();

  user.tokens.push({
    access,
    token
  });

  return user.save().then((user) => {
    return token;
  }).catch((err) => {
    console.log("Error generating auth token");
  });
};


// Explicitly states wheat gets sent back to the user.
userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'username', 'email'])
};

module.exports = mongoose.model("User", userSchema);

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const crypto = require('crypto');

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
    hash: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
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


// Encrypt user password and salt
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};


// Validate password
userSchema.methods.validatePassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};


// Generates a jwt for the user
userSchema.methods.generateAuthToken = function () {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        collections: this.collections,
        exp: parseInt(expiry.getTime() / 1000)
    }, config.JWT_SECRET);
};


// Explicitly states wheat gets sent back to the user.
userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'username', 'email'])
};

module.exports = mongoose.model("User", userSchema);

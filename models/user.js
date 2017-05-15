const mongoose = require('mongoose');
const validator = require('validator');

/*
    Sample Document
    {   
        username: Swan,
        email: contact@swan.moe,
        password: notapassword123,
        privileges: 3,
        tokens: [{
            access: 'auth',
            token: 'm9lka9bap1a2fa2o2j3dd0a02kak2'
        }]
        collections: [
            {
                name: "Vibro",
                mapsets: [320118, 29182, 193330, 182731, 38910]
            }
        ]
    }
*/

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

module.exports = mongoose.model("User", userSchema);
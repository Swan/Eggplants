const mongoose = require('mongoose');
// passportLocalMongoose

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 15

    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }

})

module.exports = mongoose.model("User", userSchema);



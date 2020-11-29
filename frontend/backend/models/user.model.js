const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Each user account requires a unique username and password.
// Both must be at least 2 characters in length.
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    }, 
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    }, 
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
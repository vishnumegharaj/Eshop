const mongoose = require('mongoose');

const Users = mongoose.model('users', new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    contactNumber: Number
}, { timestamps: true }
));

module.exports =  Users ;
const mongoose = require('mongoose');

const Users = mongoose.model('users', new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    contactNumber: Number,
    roleType: { type: Number, enum: [0, 1], default: 0 },
}, { timestamps: true }
));

module.exports =  Users ;
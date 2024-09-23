const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users.models');

async function signup(req, res) {
    console.log('Request Body:', req.body); // Debugging log

    const { email, contactNumber, password } = req.body;

    if (!email || !contactNumber || !password) {
        return res.status(400).send('Missing required fields');
    }

    let userexist = await User.findOne({ email });
    let number = await User.findOne({ contactNumber });

    if (userexist) {
        return res.status(400).send("try with another email this email already exist");
    }

    if (number) {
        return res.status(400).send("try with another contact number this contact already exist");
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            ...req.body,
            password: hashedPassword
        });

        const response = await user.save();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send("email not found");
    }

    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).send("invalid Credentials!");
    }

    // Generating token
    const token = jwt.sign({ _id: user._id, name: user.username }, '12345');
   // Use res.set instead of res.setHeader
    res.json({
        name: user.username,
        email: user.email,
        isAuthenticated: true,
        authToken : token                                                                                                                                                  
    });

    console.log(token);
}

module.exports = {
    signup, 
    login
}
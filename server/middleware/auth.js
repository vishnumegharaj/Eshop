const express = require('express');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        console.log("unauthorised");
        return res.status(401).send("Unauthorized, please login first");
        
    }

    try {
        const decodedToken = jwt.verify(token, '12345');
        req.user = decodedToken;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized User');
    }
};

module.exports = auth;

const mongoose = require('mongoose');

// Use environment variable from .env, fallback to local DB if not provided
const mongoURL = process.env.mongoURL || 'mongodb://localhost:27017/eshop';

module.exports = {
    mongoose,
    mongoURL
};

const mongoose = require('mongoose');

const userCredsSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: String,
    preferredCategory: String
});

module.exports = mongoose.model('UserCreds', userCredsSchema);

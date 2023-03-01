const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    events: {
        type: Array,
        default: []
    },
    groupIds: {
        type: Array,
        default: []
    },
    invites: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
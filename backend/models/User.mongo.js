const mongoose = require('mongoose');

const P5History = require('./P5History.mongo');
const RewardHistory = require('./RewardHistory.mongo');

const UserSchema = new mongoose.Schema({
    ID: {
        type: String, 
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    P5: {
        balance: {
            type: Number,
            default: 100
        },
        history: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'P5History'
        }]
    },
    Reward: {
        balance: {
            type: Number,
            default: 0
        },
        history: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RewardHistory'
        }]
    }
})

module.exports = mongoose.model('User', UserSchema);
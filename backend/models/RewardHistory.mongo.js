const mongoose = require('mongoose');

const RewardHistorySchema = new mongoose.Schema({
    datetimeStamp: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    givenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('RewardHistory', RewardHistorySchema);
const mongoose = require('mongoose');

const P5HistorySchema = new mongoose.Schema({
    datetimeStamp: {
        type: Date, 
        default: Date.now
    },
    amount: {
        type: Number,
        required: true,
    },
    givenTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('P5History', P5HistorySchema);
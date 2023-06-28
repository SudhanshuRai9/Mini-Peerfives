const express = require('express');
const p5router = express.Router();

const {
    httpGetP5Transactions,
    httpCreateP5Transaction,
    httpDeleteP5Transaction,
} = require('./p5.controller');

// Get all P5 transactions
p5router.get('/:id/p5', httpGetP5Transactions);

// Create a P5 transaction
p5router.post('/:id/p5', httpCreateP5Transaction);

// Delete a P5 transaction
p5router.delete('/:id/p5/:historyId', httpDeleteP5Transaction);

module.exports = p5router;
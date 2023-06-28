const P5History = require('../models/P5History.mongo');
const User = require('../models/User.mongo');

async function httpGetP5Transactions(req, res) {
    try {
        const user = await User.findOne({ ID: req.params.id });
        const p5Transactions = user.P5.history;

        res.status(200).json(p5Transactions);
    } catch(error) {
        res.status(500).json({ error: 'Failed to get all P5 transactions' });
    }
}

async function httpCreateP5Transaction(req, res) {
    try {
        const { amount, givenTo } = req.body;
        const user = await User.findOne({ ID: req.params.id });

        if (user.P5.balance >= amount) {
            const p5History = await P5History.create({
                amount,
                givenTo,
            });

            user.P5.balance -= amount;
            user.P5.history.push(p5History);
            await user.save();

            res.status(201).json(p5History);
        } else {
            res.status(400).json({ error: 'Insufficient P5 balance' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create P5 transaction' });
    }
}

async function httpDeleteP5Transaction(req, res) {
    try {
        const user = await User.findOne({ ID: req.params.id });
        const p5History = await P5History.findById(req.params.historyId);
    
        if (p5History && user.P5.history.includes(p5History._id)) {
            user.P5.balance += p5History.amount;
            user.P5.history.pull(p5History._id);
            await user.save();
        
            await P5History.findByIdAndDelete(p5History._id);
        
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: 'P5 transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete P5 transaction' });
    }
}

module.exports = {
    httpGetP5Transactions,
    httpCreateP5Transaction,
    httpDeleteP5Transaction,
}
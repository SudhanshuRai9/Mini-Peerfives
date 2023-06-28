const express = require('express');
const router = express.Router();
const User = require('../models/User.mongo');
const RewardHistory = require('../models/RewardHistory.mongo');

// Get all reward transactions for a user
router.get('/:id/rewards', async (req, res) => {
    try {
        const user = await User.findOne({ ID: req.params.id }).populate('Reward.history');
        res.json(user.Reward.history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve reward transactions' });
    }
});

module.exports = router;
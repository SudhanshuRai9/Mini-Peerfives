const {
    getUsers,
    addNewUser,
    findUserById,
    updateUserById,
} = require('../models/User.model');

async function httpGetUsers(req, res) {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
}

async function httpAddNewUser(req, res) {
    try {
        const user = req.body;
        await addNewUser(user);
        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}

async function httpFindUserById(req, res) {
    try {
        const user = await findUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
}

async function httpUpdateUserById(req, res) {
    try {
        const user = await updateUserById(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user' });
    }
}

module.exports = {
    httpGetUsers,
    httpAddNewUser,
    httpFindUserById,
    httpUpdateUserById,
}
const express = require('express');
const {
    httpGetUsers,
    httpAddNewUser,
    httpFindUserById,
    httpUpdateUserById,
} = require('./user.controller');

const userRouter = express.Router();

// Create a user
userRouter.post('/', httpAddNewUser);

// Get all users
userRouter.get('/', httpGetUsers);

// Get a user by ID
userRouter.get('/:id', httpFindUserById);
  
// Update a user
userRouter.put('/:id', httpUpdateUserById);

module.exports = userRouter;
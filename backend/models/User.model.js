const User = require('./User.mongo');

const DEFAULT_USER_ID = 0;

async function getLatestUserID() {
    const latestUser = await User
        .findOne()
        .sort('-ID');

    if (!latestUser) {
        return DEFAULT_USER_ID;
    }

    return latestUser.ID;
}

async function saveUser(user) {
    await User.findOneAndUpdate({
        ID: User.ID,
    }, user, {
        upsert: true,
    })
}

async function getUsers() {
    return await User.find({}).sort({ ID: 1 });
}

async function addNewUser(user) {
    const newUserID = Number(await getLatestUserID()) + 1;

    const newUser = Object.assign(user, {
        ID: newUserID,
    });

    await saveUser(newUser);
}

async function findUserById(id) {
    return await User.findOne({ ID: id});
}

async function updateUserById(id, body) {
    return await User.findOneAndUpdate({ ID: id }, body, { new: true });
}

module.exports = {
    getUsers,
    addNewUser,
    findUserById,
    updateUserById,
}
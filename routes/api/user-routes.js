////////////// import express router ////////////////////////////////////////////////////////////////////////////////////////////////
const router = require('express').Router(); 
const { ////////////// import functions from the user-controller /////////////
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser); // /api/users

router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById); // /api/users/:userId

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend); // /api/users/:userId/friends/:friendId

module.exports = router;
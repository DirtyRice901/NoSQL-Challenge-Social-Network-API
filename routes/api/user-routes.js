////////////// import express router ////////////////////////////////////////////////////////////////////////////////////////////////
const router = require('express').Router(); 
const { ////////////// import functions from the user-controller /////////////
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser); // /api/users

router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUser); // /api/users/:userId

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend); // /api/users/:userId/friends/:friendId

module.exports = router;
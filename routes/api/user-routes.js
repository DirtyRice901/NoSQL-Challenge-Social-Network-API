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

////////////// get, update, and delete user by id ////////////////////////////////////////////////////////////////////////////////////////////////
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById); // /api/users/:userId

////////////// add and remove friends ////////////////////////////////////////////////////////////////////////////////////////////////
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend); 

module.exports = router;
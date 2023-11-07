////////////////////// DEPENDENCIES ////////////////////////////////////////////////////////////////////////////////////////////////////
const { User } = require('../models');


////////////////////// USER CONTROLLER ////////////////////////////////////////////////////////////////////////////////////////////////////
const userController = {
    ///////// GET ALL USERS //////////////////////
    getAllUsers(req, res) {
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },

    ///////// GET ONE USER By ID //////////////////////
    getUserById(req, res) {
        User.findById(req.params.userId)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },

    ///////// CREATE USER /////////////////////////////
    createUser(req, res) {
        User.create(req.body)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },

    ///////// UPDATE USER By ID ///////////////////////
    updateUserById(req, res) {
        User.findOneAndUpdate(req.params.id, req.body,{ new: true })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },

    ///////// DELETE USER By ID ///////////////////////
    deleteUserById(req, res) {
        User.findOneAndDelete(req.params.id)
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },

    ///////// ADD FRIEND //////////////////////////////
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId || req.params.friendId } },
            { new: true }   
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },

    ///////// REMOVE FRIEND //////////////////////////////
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }   
        )    
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
            }
            ///////////////// CONFITMED FRIEND REMOVAL ///////////////////////
            const removed = !dbUserData.friends.includes(req.params.friendId);
            if (removed) {
                res.json({ message: 'Friend removed!', dbUserData });
            } else {
                res.json(dbUserData);
            }
        })
        .catch(err => res.status(500).json(err));
    },
};

module.exports = userController;

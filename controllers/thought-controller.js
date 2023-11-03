//////////////// establish controller dependencies //////////////////////////////////////////////////////////////////////////////
const { Thought } = require('../models');
const { Types } = require('mongoose');

//////////////// establish controller methods //////////////////////////////////////////////////////////////////////////////
const thoughtController = {
    ////////// get all thoughts
    async getAllThoughts(req, res) {
        // find all thoughts
        try {
            const thoughtsDB = await Thought.find({});
            ///////// return all thoughts
            res.json(thoughtsDB); 
            ///////// error handling
        } catch (err) {
            res.status(500).json(err);
        }
    },
    ////////// get one thought by id ////////////////////////////////////////////////////////////////////////////////////////////////
    async getThoughtsById(req, res) { //
        // find thought by id
        try {
            const thoughtDB = await Thought.findOne({ _id: req.params.thoughtID });
            // if no thought found, return 404
            if (!thoughtDB) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            } else {
                // return thought
                res.json(thoughtDB);
            }   
            // error handling
        } catch (err) {
            res.status(500).json(err);
        }
    },
    ////////// create thought ////////////////////////////////////////////////////////////////////////////////////////////////
    async createThought(req, res) {
        try {
            const thoughtDB = await Thought.create(req.body);
            res.json(thoughtDB);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    ////////// delete a thought ////////////////////////////////////////////////////////////////////////////////////////////////
    async deleteThought(req, res) {
        try {
            const thoughtDB = await Thought.findOneAndDelete({ _id: req.params.thoughtID });
            res.status(200).json(thoughtDB);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    ////////// update a thought by ID api endpoint ////////////////////////////////////////////////////////////////////////////////////////////////
    async updateThoughtByID(req, res) {
        try {
            const thoughtDB = await Thought.findOneAndUpdate(req.params.thoughtID, req.body, { new: true, });
            if (!thoughtDB) {
                res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thoughtDB);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    ////////// create reaction ////////////////////////////////////////////////////////////////////////////////////////////////
    async createReaction(req, res) {
        try {
            const thoughtDB = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtID },
                { $addToSet: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            thoughtDB ? res.json(thoughtDB) : res.status(404).json({ message: 'No thought found with this id!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    ////////// delete reaction ////////////////////////////////////////////////////////////////////////////////////////////////
    async deleteReaction(req, res) {
        try {
            const thoughtDB = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtID },
                { $pull: { reactions: { reactionId: req.params.reactionID } } },
                { new: true, runValidators: true }
            );

            thoughtDB ? res.json(thoughtDB) : res.status(404).json({ message: 'No thought found with this id!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

//////////////// export controller //////////////////////////////////////////////////////////////////////////////
module.exports = thoughtController;
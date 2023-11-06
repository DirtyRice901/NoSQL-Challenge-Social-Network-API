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
    async getThoughtById(req, res) {
        try {
            const thoughtDB = await Thought.findById({ _id: req.params.thoughtId });
            if (!thoughtDB) {
                res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thoughtDB);
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
            const thoughtDB = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            res.status(200).json(thoughtDB);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    ////////// update a thought by ID api endpoint ////////////////////////////////////////////////////////////////////////////////////////////////
    async updateThoughtById(req, res) {
        try {
          const thoughtDB = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true }
          );
          if (!thoughtDB) {
            res.status(404).json({ message: 'No thought with this ID!' });
            return;
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
                { _id: req.params.thoughtId },
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
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
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
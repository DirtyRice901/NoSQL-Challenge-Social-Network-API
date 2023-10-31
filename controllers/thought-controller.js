//////////////// establish controller dependencies //////////////////////////////////////////////////////////////////////////////
const { Thought, User, Reaction } = require('../models');
const { Types } = require('mongoose');

//////////////// establish controller methods //////////////////////////////////////////////////////////////////////////////
const thoughtController = {
    // get all thoughts
    async getAllThoughts(req, res) {
        // find all thoughts
        try {
            const thoughtsDB = await Thought.find({});
            // return all thoughts
            res.json(thoughtsDB); 
            // error handling
        } catch (err) {
            res.status(500).json(err);
        }
    },
}
const router = require('express').Router();
////////////////// import all of the API routes from /api/index.js //////////////
const {
    getAllThoughts, // get all thoughts
    getThoughtsById, // get one thought by id
    createThought, // create a thought
    updateThoughtByID,  // update a thought by id
    deleteThought, // delete a thought by id
    createReaction,  // add a reaction to a thought
    deleteReaction  // delete a reaction from a thought
 ////////////// import functions from the thought-controller //////////////    
} = require('../../controllers/thought-controller'); 

router.route('/').get(getAllThoughts).post(createThought); // /api/thoughts

router.route('/:thoughtId').get(getThoughtsById).put(updateThoughtByID).delete(deleteThought); // /api/thoughts/:thoughtId

router.route('/:thoughtId/reactions').post(createReaction); // /api/thoughts/:thoughtId/reactions

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction); // /api/thoughts/:thoughtId/reactions/:reactionId

module.exports = router;
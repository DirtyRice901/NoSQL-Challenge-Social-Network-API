////////////// Importing Dependencies //////////////////////////////////////////////////////////////////////////////    ///////////////
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    ////////// establish thoughtText /////////////////////////////////////////////////////////////////////////////////////////////
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
    ////////// establish createdAt /////////////////////////////////////////////////////////////////////////////////////////////
        createdAt: {
            // set type
            type: Date,
            // default value is current timestamp
            default: Date.now,
            // use getter method to format timestamp on query ///
            get: timestamp => new Date(timestamp).toLocaleDateString(),
        },
    ////////// establish username /////////////////////////////////////////////////////////////////////////////////////////////
        username: {
            type: String,
            required: true,
        },
    ////////// establish reactions /////////////////////////////////////////////////////////////////////////////////////////////
        reactions: [reactionSchema],
    },  
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,    
    },
);

/////////////////////// virtual to get total count of reactions on retrieval //////////////////////////////////////////////////
thoughtSchema.virtual('reactionCount').get(function() {
    ////////// return length of the thought's reactions array //////////////////////////////////////////////////////////////////
    return this.reactions.length;
});

/////////////////////// create the Thought model using the thoughtSchema /////////////////////////////////////////////////////
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
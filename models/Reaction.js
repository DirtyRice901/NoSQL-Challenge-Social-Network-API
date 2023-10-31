const { Schema, Types} = require('mongoose');
const reactionSchema = new Schema(
    {
        ////////////// use mongoose's ObjectId data type /////////////////////////////////////////////////////////////////////////////////////////////
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        ///////////// establish reaction body /////////////////////////////////////////////////////////////////////////////////////////////
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        ///////////// establish username /////////////////////////////////////////////////////////////////////////////////////////////
        username: {
            type: String,
            required: true,
        },
        ///////////// establish createdAt /////////////////////////////////////////////////////////////////////////////////////////////
        createdAt: {
            type: Date, // use a timestamp
            default: Date.now, // default value is the current timestamp
            get: timestamp => new Date(timestamp).toLocaleDateString(), // use a getter method to format the timestamp 
        },   
    },
    {
        ///////////// use toJSON to allow getters /////////////////////////////////////////////////////////////////////////////////////////////
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;
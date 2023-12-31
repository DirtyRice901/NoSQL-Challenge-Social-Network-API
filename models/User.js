///////////// Importing required dependencies from the mongoose schema /////////////////////////////////////////////////////////////////////////////////////////////
const { Schema, model, Types } = require('mongoose');


///////////// establish User schema /////////////////////////////////////////////////////////////////////////////////////////////
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        //////////////   establish email validation /////////////////////////////////////////////////////////////////////////////////////////////
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v);
                }
            }
        },
        //////////////   establish thoughts and friends /////////////////////////////////////////////////////////////////////////////////////////////
        thoughts: [
            {
                type: Schema.Types.ObjectId,  /// use ObjectId data type to create unique identifier MongoDB
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId, /// use ObjectId data type to create unique identifier MongoDB
                ref: 'User',
            }
        ],
    },

    /////////// allows virutal properties to be used when a user document is transformed into JSON /////////////////////////////////////////////////////////////////////////////////////////////
    {
        toJSON: { //
            virtuals: true, 
        },
        id: false, // prevents virtuals from creating duplicate of _id as `id`
    }
    
);

///////////// establish virtual for friend count /////////////////////////////////////////////////////////////////////////////////////////////
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

///////////// establish User model /////////////////////////////////////////////////////////////////////////////////////////////
const User = model('User', userSchema);

///////////// export User model /////////////////////////////////////////////////////////////////////////////////////////////
module.exports = User;
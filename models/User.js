///////////// establish User model /////////////////////////////////////////////////////////////////////////////////////////////
const { Schema, model, Types } = require('mongoose');

///////////// establish User schema /////////////////////////////////////////////////////////////////////////////////////////////
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required!',
            trim: true
        },
        email: {
            type: String,
            requred: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v);
                }
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
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
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

///////////// establish User model /////////////////////////////////////////////////////////////////////////////////////////////
const User = model('User', UserSchema);

///////////// export User model /////////////////////////////////////////////////////////////////////////////////////////////
module.exports = User;
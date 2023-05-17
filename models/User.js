const{ Schema, model } = require('mongoose');
const myObjectId = Schema.Types.ObjectId;

//DOES IT MATTER WHICH ORDER THESE ARE IN? model first or Schema first?

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match:[/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/]
        },  
        thoughts:
        [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
        },
        {
            toJSON: {
                virtuals: true,
                getters: true,
            },
            id: false
        }
)

//get total count of friends on retrieval
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//create  User model using the UserSchema
const User = model('User', userSchema);

//export the User model
module.exports = User;


const{ Schema, model ,Types} = require('mongoose');
//moment -  node module for formatting dates.
const moment = require('moment');

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: function (createdAt) {
          return moment(createdAt).format("MMM DD, YYYY [at] hh:mm a");
        }
      },
    },
    {
      toJSON: {
        // include getters in createdAt
        getters: true,
      },
    }
  );

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(createdAt){
            return moment(createdAt).format('MMM DD, YYYY [at] hh:mm a');
        },
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
}
);

  // Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
  thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
  });
  

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;


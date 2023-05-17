const { Thought, User } = require('../models');

// /api/thought

const thoughtController = {
  // get all thoughts
  async getAllThought(req, res) {
    try {
      const dbThoughtData = await Thought.find()
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");
      if (!dbThoughtData) {
        res.status(404).json({ message: "Thought not found" });
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get single thought by id
  async getSingleThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId })
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");
      if (!dbThoughtData) {
        return res.status(404).json({ message: "ID not found" });
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create new thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body); //create thought
      const dbUserData = await User.findOneAndUpdate(
        //update user
        { _id: req.params.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //delete thought 
  async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
     }
      res.json({ message: "Thought deleted" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // update thought
  async updateThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
          .populate({ path: "reactions", select: "-__v" })
          .select("-__v")
      );
      if (!dbThoughtData) {
       return res.status(404).json({ message: "Thought not found" });
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //add reaction
  async addReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: { reactionBody: req.body.reactionBody, username: req.body.username } } },
        { new: true, runValidators: true }
      );
      if (!dbThoughtData) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //remove reaction
  async removeReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: {  reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!dbThoughtData) {
        return res.status(404).json({ message: "reaction not found" });
      }
      
      res.json({ message: "Reaction removed" });
    } catch (err) {
      console.log(err);
     res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
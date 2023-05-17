
const { User } = require("../models");

// /api/user

const userController = {
  //Get all users
  async getUser(req, res) {
    try {
      const user = await User.find()
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .sort({ _id: -1 })
      res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },


  // GET a single user by its _id and populated thought and friend data
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" })
        .select("-__v");
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      res.json({ user });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  // POST a new user:
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },

  // PUT to update a user by its _id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  // DELETE to remove user by its _id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  // Add a new friend to a user's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error adding friend." });
    }
  },
  
  // DELETE to remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        {_id: req.params.userId},
        { $pull: { friends: req.params.friendId } },
        {new: true}
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      
      res.json({ message: "Friend removed" });
    } catch (err) {
      console.log(err);
     res.status(500).json(err);
    }
  },
};

module.exports = userController;
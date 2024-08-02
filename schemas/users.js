// Importing mongoose
const mongoose = require('mongoose');

// Defining a schema for a user
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    }
  });

// Creating a model from the schema
const UserModel = mongoose.model('User', userSchema);

// Define methods
const createUser = (user) => {
    console.log("Saved: " + user);
    user.save();
};

exports.User = UserModel;
exports.createUser = createUser;
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
const createUser = async (user) => {
    console.log("Saved: " + user);
    await user.save();
};

const findUserById = async (id) => {
  const user = UserModel.findOne({_id: id}).then(foundUser => {
    console.log("Found: " + foundUser);
    return foundUser.username;
  });
  return user;
};

const findAllUsers = async () => {
  const users = UserModel.find({}).then(foundUsers => {
    return foundUsers;
  });
  return users;
};

exports.User = UserModel;
exports.createUser = createUser;
exports.findUserById = findUserById;
exports.findAllUsers = findAllUsers;
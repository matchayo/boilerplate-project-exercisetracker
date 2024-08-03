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

// Define methods
const findUserById = async (id) => {
  const user = UserModel.findOne({_id: id}).then(foundUser => {
    console.log("Found: " + foundUser);
    return foundUser.username;
  });
  return user;
};
const promise1 = new Promise((resolve, reject) => {
  resolve('Success!');
});

exports.User = UserModel;
exports.createUser = createUser;
exports.findUserById = findUserById;
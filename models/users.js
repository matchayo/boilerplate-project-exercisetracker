// Importing mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exercise = require('./exercises').Exercise;

// Defining a schema for a user
const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    count: {
      type: Number,
      default: 0
    },
    log: [{
      type: Schema.Types.ObjectId,
      ref: 'Exercise'
    }]
  });

// Creating a model from the schema
const UserModel = mongoose.model('User', userSchema);

// Define methods
const createUser = async (user) => {
    // console.log("Saved: " + user);
    try {
      await user.save();
    } catch (error) {
    }
};

const findUserById = async (id) => {

  const user = UserModel.findOne({_id: id}).then(foundUser => {
    return foundUser;
  });
  return user;
};

const findAllUsers = async () => {
  const users = UserModel.find({}).then(foundUsers => {
    var usersList = [];
    foundUsers.forEach(curr => {
      let user = {
        username: curr.username,
        _id: curr.id
      }
      usersList.push(user);
    });
    return usersList;
  });
  return users;
};

const addExerciseToUser = async (userId, exerciseId) => {
  await UserModel.findOne({_id: userId}).then(foundUser => {
    if (foundUser) {
      foundUser.log.push(exerciseId);
      foundUser.count++;
      foundUser.save();
    }
  });
}

const findUserLogs = async (id) => {
  const user = UserModel.findOne({_id: id})
    .populate("log")
    .then(foundUser => {
    return foundUser;
  });
  return user;
};

exports.User              = UserModel;
exports.createUser        = createUser;
exports.findUserById      = findUserById;
exports.findAllUsers      = findAllUsers;
exports.addExerciseToUser = addExerciseToUser;
exports.findUserLogs      = findUserLogs;
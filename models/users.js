// Importing mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    console.log("Saved: " + user);
    await user.save();
};

const findUserById = async (id) => {
  const user = UserModel.findOne({_id: id}).then(foundUser => {
    console.log("Found: " + foundUser);
    return foundUser;
  });
  return user;
};

const findAllUsers = async () => {
  const users = UserModel.find({}).then(foundUsers => {
    return foundUsers;
  });
  return users;
};

const addExerciseToUser = async (userId, exerciseId) => {
  await UserModel.findOne({_id: userId}).then(foundUser => {
    foundUser.log.push(exerciseId);
    foundUser.count++;
    foundUser.save();
    console.log('Updated: ' + foundUser);
  });
}

exports.User              = UserModel;
exports.createUser        = createUser;
exports.findUserById      = findUserById;
exports.findAllUsers      = findAllUsers;
exports.addExerciseToUser = addExerciseToUser;
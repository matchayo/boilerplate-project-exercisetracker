// Importing mongoose
const mongoose = require('mongoose');
const User = require('./users');
const Schema = mongoose.Schema;

// Defining a schema for a exercise
const exerciseSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    description: {
      type: String
    },
    duration: { //in Minutes
      type: Number
    },
    date: {
      type: String
    }
  });

// Creating a model from the schema
const ExerciseModel = mongoose.model('Exercise', exerciseSchema);

// Define methods
const createExercise = (userId, exercise) => {
    console.log("Saved: " + exercise);
    exercise.save();
    // Add the exercise Id to the User
};

const findAllExercise = (exercises) => {
  ExerciseModel.find();
}

const addExerciseToUser = (userId, exerciseId) => {
  // Find the user
  // Update the user's log to add the new exercise Id
};

exports.Exercise = ExerciseModel;
exports.createExercise = createExercise;
// Importing mongoose
const mongoose = require('mongoose');
const User = require('./users');

// Defining a schema for a exercise
const exerciseSchema = new mongoose.Schema({
    username: {
      type: String,
    },
    description: {
      type: String
    },
    duration: { //in Minutes
      type: Number
    },
    date: {
      type: Date
    }
  });

// Creating a model from the schema
const ExerciseModel = mongoose.model('Exercise', exerciseSchema);

// Define methods
const createExercise = (exercise) => {
    console.log("Saved: " + exercise);
    exercise.save();
};

const findAllExercise = (exercises) => {
  ExerciseModel.find();
}

exports.Exercise = ExerciseModel;
exports.createExercise = createExercise;
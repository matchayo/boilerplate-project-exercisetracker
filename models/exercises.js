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
      type: Date
    }
  });

// Creating a model from the schema
const ExerciseModel = mongoose.model('Exercise', exerciseSchema);

// Define methods
const createExercise = (userId, exercise) => {
    exercise.save();
};

const findAllExercise = (exercises) => {
  ExerciseModel.find();
}

exports.Exercise = ExerciseModel;
exports.createExercise = createExercise;
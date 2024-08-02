// Importing mongoose
const mongoose = require('mongoose');
const User = require('./users');

// Defining a schema for a exercise
const exerciseSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    },
    description: {
      type: String
    },
    duration: { //in Seconds
      type: Number
    },
    date: {
      type: Date
    }
  });

// Creating a model from the schema
const ExerciseModel = mongoose.model('Exercise', exerciseSchema);

// Define methods
const createExercise = (exercise, done) => {
    console.log("Saved: " + exercise);
    exercise.save(function(err, data) {
        done(null, data);
    });
};

exports.Exercise = ExerciseModel;
exports.createExercise = createExercise;
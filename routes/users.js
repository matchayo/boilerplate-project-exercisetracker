const express = require('express');
const router = express.Router();

const User = require('../models/users').User;
const Exercise = require('../models/exercises').Exercise;
const createUser = require('../models/users').createUser;
const findUserById = require('../models/users').findUserById;
const createExercise = require('../models/exercises').createExercise;

router.post('/', function(req, res) {
    console.log(req.body);
    const newUser = new User(req.body);
    createUser(newUser);
});

router.post('/:_id/exercises', async function(req, res) {
    console.log(req.body);
    console.log(req.body[':_id']);
    const foundUser = await findUserById(req.body[':_id']);
    console.log('foundUser: ' + foundUser);
    const newExercise = new Exercise({
        username: foundUser,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date
    });
    createExercise(newExercise);
});

module.exports = router;
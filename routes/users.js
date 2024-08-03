const express           = require('express');
const router            = express.Router();

const User              = require('../models/users').User;
const createUser        = require('../models/users').createUser;
const findUserById      = require('../models/users').findUserById;
const findAllUsers      = require('../models/users').findAllUsers;
const addExerciseToUser = require('../models/users').addExerciseToUser;

const Exercise          = require('../models/exercises').Exercise;
const createExercise    = require('../models/exercises').createExercise;

router.post('/', async function(req, res) {
    const newUser = new User(req.body);
    await createUser(newUser);
    res.send(newUser);
});

router.post('/:_id/exercises', async function(req, res) {
    const foundUser = await findUserById(req.body[':_id']);

    if (foundUser === null) {
        res.send()
    }

    const newExercise = new Exercise({
        user: req.body[':_id'],
        description: req.body.description,
        duration: req.body.duration,
        date: (new Date(req.body.date)).toDateString()
    });

    if (!req.body.date) {
        var now = new Date();
        newExercise.date = now.toDateString();
    }

    createExercise(newExercise.user, newExercise);
    addExerciseToUser(newExercise.user, newExercise._id)

    const response = {
        _id: foundUser._id,
        username: foundUser.username,
        description: newExercise.description,
        duration: newExercise.duration,
        date: newExercise.date
    }
    res.send(response);
});

router.get('/', async function(req, res) {
    const users = await findAllUsers();
    res.send(users);
});

module.exports = router;
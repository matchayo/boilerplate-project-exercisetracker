const express           = require('express');
const router            = express.Router();

const User              = require('../models/users').User;
const createUser        = require('../models/users').createUser;
const findUserById      = require('../models/users').findUserById;
const findAllUsers      = require('../models/users').findAllUsers;
const addExerciseToUser = require('../models/users').addExerciseToUser;

const Exercise          = require('../models/exercises').Exercise;
const createExercise    = require('../models/exercises').createExercise;

/* 
 * PASSED:
 * 1. You can POST to /api/users with form data username to create a new user.
 * 2. The returned response from POST /api/users with form data username will 
 *    be an object with username and _id properties.
 */
router.post('/', async function(req, res) {
    const newUser = new User(req.body);
    await createUser(newUser);
    res.send(newUser);
});

/* 
 * PASSED:
 * 1. You can POST to /api/users/:_id/exercises with form data description, duration, 
 *   and optionally date. If no date is supplied, the current date will be used.
 * 
 * TODO:
 * - The response returned from POST /api/users/:_id/exercises will be the user 
 *   object with the exercise fields added.
 */
router.post('/:_id/exercises', async function(req, res) {
    const foundUser = await findUserById(req.body[':_id']);

    if (!foundUser) {
        res.send('')
        return
    }

    const newExercise = new Exercise({
        user: req.body[':_id'],
        description: req.body.description,
        duration: req.body.duration,
        date: new Date(req.body.date)
    });

    if (!req.body.date) {
        newExercise.date = new Date();
    }

    createExercise(newExercise.user, newExercise);
    addExerciseToUser(newExercise.user, newExercise._id)

    const response = {
        username: foundUser.username,
        description: newExercise.description,
        duration: newExercise.duration,
        date: newExercise.date.toDateString(),
        _id: foundUser._id
    }
    res.send(response);
});

/* 
 * PASSED:
 * 1. You can make a GET request to /api/users to get a list of all users.
 * 2. The GET request to /api/users returns an array.
 * 3. Each element in the array returned from GET /api/users is an object 
 *    literal containing a user's username and _id.
 * 
 * TODO:
 * 
 */
router.get('/', async function(req, res) {
    const users = await findAllUsers();
    res.send(users);
});

/* 
 * PASSED:
 * 1. 
 * 
 * TODO:
 * - You can make a GET request to /api/users/:_id/logs to retrieve
 *   a full exercise log of any user.
 * - A request to a user's log GET /api/users/:_id/logs returns a user 
 *   object with a count property representing the number of exercises that belong to 
 *   that user.
 * - A GET request to /api/users/:_id/logs will return the user object with a log array 
 *   of all the exercises added.
 * - Each item in the log array that is returned from GET /api/users/:_id/logs is an 
 *   object that should have a description, duration, and date properties.
 * - The description property of any object in the log array that is returned from GET 
 *   /api/users/:_id/logs should be a string.
 * - The duration property of any object in the log array that is returned from GET 
 *   /api/users/:_id/logs should be a number.
 * - The date property of any object in the log array that is returned from GET 
 *   /api/users/:_id/logs should be a string. Use the dateString format of the Date API.
 * - You can add from, to and limit parameters to a GET /api/users/:_id/logs request to 
 *   retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. 
 *   limit is an integer of how many logs to send back.
 */
router.get('/:_id/logs', async function(req, res) {
    const foundUser = await findUserById(req.params._id);

    
    console.log(foundUser)
    if (!foundUser) {
        res.send('')
        return
    }
    res.send(foundUser);
});

module.exports = router;
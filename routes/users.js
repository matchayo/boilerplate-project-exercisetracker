const express = require('express');
const router = express.Router();
const User = require('../schemas/users').User;
const createUser = require('../schemas/users').createUser;

router.post('/', function(req, res) {
    console.log(req.body);
    const newUser = new User(req.body);
    createUser(newUser);
});

router.get('/', function(req, res) {
    res.send('Hello2');
});

module.exports = router;
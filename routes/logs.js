const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
    //
});

router.get('/', function(req, res) {
    res.send('Hello3');
});

module.exports = router;
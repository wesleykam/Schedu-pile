const express = require('express');

const router = express.Router();

const {
    updateUserEvents
} = require('../controllers/userController');


router.patch('/', updateUserEvents);


module.exports = router;
const express = require('express');

const router = express.Router();

const {
    updateUserEvents,
    getUserEvents
} = require('../controllers/userController');


router.get('/:id', getUserEvents);

router.patch('/', updateUserEvents);


module.exports = router;
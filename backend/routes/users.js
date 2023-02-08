const express = require('express');

const router = express.Router();

const {
    updateUserEvents,
    getUserEvents,
    getUserGroups
} = require('../controllers/userController');


router.get('/:id', getUserEvents);

router.patch('/', updateUserEvents);

router.get('/groups/:id', getUserGroups);


module.exports = router;
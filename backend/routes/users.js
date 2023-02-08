const express = require('express');

const router = express.Router();

const {
  updateUserEvents,
  getUserEvents,
  getUserGroups,
  getUserGroupsInfo,
} = require('../controllers/userController');

router.get('/:id', getUserEvents);

router.patch('/', updateUserEvents);

router.get('/groups/:id', getUserGroups);

router.get('/groupsinfo/:id', getUserGroupsInfo);

module.exports = router;

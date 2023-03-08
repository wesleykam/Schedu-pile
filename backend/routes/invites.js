const express = require('express');

const router = express.Router();

const {
    getInvites,
    sendInvite,
    acceptInvite,
    declineInvite,
} = require('../controllers/inviteController');

router.get('/:id', getInvites);

router.patch('/send', sendInvite);

router.patch('/accept', acceptInvite);

router.patch('/decline', declineInvite);

module.exports = router;

const router = require('express').Router();
const {
  getGroup,
  createGroup,
  deleteGroup,
  updateGroup,
  updateGroupDeleteMember,
} = require('../controllers/groupController');
// GET a single group
router.get('/:id', getGroup);

// POST a new group
router.post('/', createGroup);

// DELETE a group
router.delete('/:id', deleteGroup);

// UPDATE a group
router.patch('/:id', updateGroup);

//UPDATE group members
router.patch('/members/:id', updateGroupDeleteMember);

module.exports = router;

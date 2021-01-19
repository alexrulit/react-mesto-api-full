const router = require('express').Router();
const {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', findUsers);
router.get('/:userId', findUserById);
router.post('/', createUser);
router.post('/me', updateUser);
router.post('/me/avatar', updateUserAvatar);

module.exports = router;

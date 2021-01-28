const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findUsers,
  findUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', findUsers);
router.get('/me', findUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), updateUserAvatar);

module.exports = router;

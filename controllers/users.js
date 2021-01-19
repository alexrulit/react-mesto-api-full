const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

const findUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err }));
};

const findUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user !== null) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Пользователь с таким id не найден' });
      }
    })
    .catch(() => res.status(400).send({ message: 'Неверный формат id' }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send(user))
    .catch(() => res.status(404).send({ message: 'Пользователь не найден' }));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports = {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  updateUserAvatar,
};

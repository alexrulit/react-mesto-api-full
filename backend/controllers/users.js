const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthError = require('../errors/auth-err');
const NotFoundError = require('../errors/not-found-err');
const NotCorrectDataError = require('../errors/not-correct-data-err');
const InternalServerError = require('../errors/internal-srv-err');

const createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  bcrypt.hash(password, 10)
  .then(password => User.create({email, password, name, about, avatar})
                    .then((user) => {
                      if(!user) {
                        throw new NotCorrectDataError('Переданы некорректные данные');
                      }
                      res.send(user);
                    })
                    .catch(next)
  );

};

const findUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if(!users) {
        throw new InternalServerError('Не удалось получить список пользователей');
      }
      res.send(users)
    })
    .catch(next);
};

const findUserById = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user !== null) {
        res.send(user);
      } else {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if(!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => { 
      if(!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const {email, password} = req.body;
  const { JWT_SECRET } = process.env;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if(!user){
        throw new AuthError('Ошибка авторизации');
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
}

module.exports = {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  updateUserAvatar,
  login,
};

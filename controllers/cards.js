const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

const findCards = (req, res) => {
  Card.find({})
    .then((cardsList) => res.send(cardsList))
    .catch((err) => res.status(500).send({ message: err }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card !== null) {
        res.send(card);
      } else {
        res.status(404).send({ message: 'Карточка с данным id не найдена' });
      }
    })
    .catch(() => res.status(400).send({ message: 'Неверный формат id' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card !== null) {
        res.send(card);
      } else {
        res.status(404).send({ message: 'Карточка с указанным id не найдена' });
      }
    })
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card !== null) {
        res.send(card);
      } else {
        res.status(404).send({ message: 'Карточка с указанным id не найдена' });
      }
    })
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

module.exports = {
  createCard,
  findCards,
  deleteCard,
  likeCard,
  dislikeCard,
};

const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const NotCorrectDataError = require('../errors/not-correct-data-err');
const InternalServerError = require('../errors/internal-srv-err');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new NotCorrectDataError('Переданы некорректные данные');
      }
      res.send(card);
    })
    .catch(next);
};

const findCards = (req, res, next) => {
  Card.find({})
    .then((cardsList) => {
      if (!cardsList) {
        throw new InternalServerError('Не удалось получить список карточек');
      }
      res.send(cardsList);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  if (!req.params.cardId.match(/^[0-9a-fA-F]{24}$/)) {
    throw new NotCorrectDataError('Передан некорректный id карточки');
  }
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
      if (toString(card.owner) === toString(req.user._id)) {
        Card.findByIdAndRemove(card._id)
          .then((removeCard) => {
            if (removeCard !== null) {
              res.send(removeCard);
            } else {
              throw new NotFoundError('Карточка с указанным id не найдена');
            }
          })
          .catch(next);
      } else {
        throw new NotCorrectDataError('Вы можете удалять только собственные карточки');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card !== null) {
        res.send(card);
      } else {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card !== null) {
        res.send(card);
      } else {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
    })
    .catch(next);
};

module.exports = {
  createCard,
  findCards,
  deleteCard,
  likeCard,
  dislikeCard,
};

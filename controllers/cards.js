// **импорт модели
const Card = require('../models/cards');

// **создание карточки
module.exports.createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка'}));
};

// **список карточек
module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((card) => res.send(card))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка'}));
};

// **удаление карточки
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .populate('user')
    .then((card) => res.send(card))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка'}));
};

// **дополнительные действия с карточками
// *лайк
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка'}));
};

// *дислайк
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка'}));
};

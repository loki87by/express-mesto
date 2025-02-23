/* eslint-disable no-else-return */
/* eslint-disable no-useless-return */
// **импорт модели
const Card = require('../models/card');

// **создание карточки
module.exports.createCard = (req, res) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      // eslint-disable-next-line quotes
      if (err.name === "ValidationError") {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// **список карточек
module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((card) => res.send(card))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' }));
};

// **удаление карточки
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .populate('user')
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Такая карточка отсутствует в базе' });
        return;
      } else {
        res.send(card);
      }
    })
    .catch((err) => res.status(err.message ? 404 : 500).send({ message: err.message || 'На сервере произошла ошибка' }));
};

// **дополнительные действия с карточками
// *лайк
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Неверный запрос' });
        return;
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' }));
};

// *дислайк
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Неверный запрос' });
        return;
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' }));
};

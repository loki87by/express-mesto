/* eslint-disable no-else-return */
/* eslint-disable no-useless-return */
/* eslint-disable quotes */
// **импорт модели
const User = require('../models/users');

// **список пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' }));
};

// **получение пользователя по айдишнику
module.exports.getCurrentUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(err.message ? 404 : 500).send({ message: 'Нет такого пользователя' || 'На сервере произошла ошибка' });
      }
    });
};

// **новый пользователь
module.exports.createUser = (req, res) => {
  const { name, about, avatar = req.user._id } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// **изменение юзердаты
// *обновление текстовой инфы
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет такого пользователя' });
        return;
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' }));
};

// *обновление аватара
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет такого пользователя' });
        return;
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' }));
};

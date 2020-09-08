// **импорт модели
const User = require('../models/users');

// **список пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка'}));
};

// **получение пользователя по айдишнику
module.exports.getCurrentUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка'}));
};

// **новый пользователь
module.exports.createUser = (req, res) => {
  const { name, about, avatar = req.user._id } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка'}));
};

// **изменение юзердаты
// *обновление текстовой инфы
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about },
    {new: true,
    runValidators: true})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка'}));
};

// *обновление аватара
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar },
    {new: true,
    runValidators: true})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка'}));
};

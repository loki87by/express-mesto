//**импорты
const users = require('express').Router();
const path = require('path');
const fs = require('fs');
//**функционал
const userList = path.join(__dirname, '..', 'data', 'users.json');
//*...для списка юзеров
users.get('/', (req, res) => {
  fs.readFile(userList, {encoding: 'utf8'}, (err, data) => {
    if (err) {
      return res.status(500).send({ Error: err.message });
    }
    try {res.status(200).send(JSON.parse(data));}
    catch(err) {console.log(err.message)}
})})
//*...для одного юзера
users.get('/:_id', (req, res) => {
  fs.readFile(userList, {encoding: 'utf8'}, (err, data) => {
  const currentUser = JSON.parse(data).find(u => {
    const keys = Object.values(u)
    if (keys.some(c => {return c === req.params._id}))
      {return u}})
  if (!currentUser) {
    return res.status(404).send({message: 'Нет пользователя с таким id'});
  }
  return res.status(200).send(currentUser)
})});
//**экспорт
module.exports = { users };
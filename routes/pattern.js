//**импорт
const pattern = require('express').Router();
//**функционал
pattern.get('/:page', (req, res) => {
  return res.status(200).send({message: 'Запрашиваемый ресурс не найден'});
});
//**экспорт
module.exports = { pattern }
// **импорты
const cards = require('express').Router();
const path = require('path');
const fs = require('fs');
// **функционал
const cardList = path.join(__dirname, '..', 'data', 'cards.json');
cards.get('/', (req, res) => {
  fs.readFile(cardList, { encoding: 'utf8' }, (err, data) => {
    try {
      res.status(200).send(JSON.parse(data));
    } catch (e) { res.status(500).send({ Error: e.message }); }
  });
});
// **экспорт
module.exports = { cards };

const cards = require('express').Router();
const path = require('path');
const fs = require('fs');
const cardList = path.join(__dirname, '..', 'data', 'cards.json');
cards.get('/', (req, res) => {
fs.readFile(cardList, {encoding: 'utf8'}, (err, data) => {
if(err) {
  return res.status(500).send({Error: err.message});
}
  try {res.status(200).send(JSON.parse(data));}
  catch(err) {console.log(err.message)}
});
});
module.exports = { cards }

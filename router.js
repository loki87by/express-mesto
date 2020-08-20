const router = require('express').Router();
const { users } = require('./db')
const { cards } = require('./db')
router.get('/cards', (req, res) => {
  res.send(cards);
});
router.get('/users', (req, res) => {
  res.send(users);
});
router.get('/users/:_id', (req, res) => {
  const currentUser = req.params._id;
  const result = users.find((u) => {
    const keys = Object.values(u)
    if (keys.some((c) => {return c === currentUser})){
    return u}})
  if (result) {
  res.send(result)
  } else {res.send({message: 'Нет пользователя с таким id'})};
});
module.exports = router;
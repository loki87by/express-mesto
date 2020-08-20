//**импорты
const express = require('express');
const fs = require('fs');
const path = require('path');
const { cards } = require('./routes/cards');
const { users } = require('./routes/users');
const { pattern } = require('./routes/pattern');
const { PORT = 3000 } = process.env;
const app = express();
//**функционал
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', cards);
app.use('/users', users);
app.use('/', pattern);
app.listen(PORT, () => {
  console.log('Server started');
});
// **импорты
const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const cardRouter = require('./routes/cardRouter');
const userRouter = require('./routes/userRouter');
const { pattern } = require('./routes/pattern');

const { PORT = 3000 } = process.env;
const app = express();

// **подключаемся к монго
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// **функционал
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    // eslint-disable-next-line quotes, comma-dangle
    _id: "5f55fe32484648230c101c87"
  };
  next();
});
app.use('/cards', cardRouter);
app.use('/users', userRouter);
app.use('*', pattern);
app.listen(PORT, () => {
  console.log('Server started');
});

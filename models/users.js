const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, 'Введите ссылку в формате http(s)://'],
    validate: {
      validator(str) {
        return /https?:\/{2}\S+\.(jpg|png|gif|svg)/gi.test(str);
      },
      // eslint-disable-next-line arrow-body-style
      message: (props) => {
        return `Ссылка ${props.str} введена не верно`;
      },
    },
  },
});
// **экспорт
module.exports = mongoose.model('user', userSchema);

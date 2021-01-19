const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cards = require('./routes/cards');
const users = require('./routes/users');
const error = require('./routes/error');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '5f9fc5a4c7c110631fb7bb87',
  };

  next();
});
app.use('/cards', cards);
app.use('/users', users);
app.use('/', error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

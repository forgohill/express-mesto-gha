// создаем фукнцию экспресс из пакета
const express = require('express');
// подключаем бадиПарсер
const bodyParser = require('body-parser');
// импортируем монгус
const mongoose = require('mongoose');
// берем присвоение порта из лобального окружения
const { PORT = 3000 } = process.env;
// импорт usersRouter
const usersRouter = require('./routes/users');
// импорт cardsRouter
const cardsRouter = require('./routes/cards');
// запускаем приложение из пакета экспресс
const app = express();

// подключаем базу данных
mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  // mongoose.connect('mongodb://localhost:27017/mestodb')
  .then((data) => {
    console.log('mongobd connecting');
  })
  .catch((error) => {
    console.log(error);
  });

// временное решение авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '64a410674333ff3ca0f2290a' // тут _id одного из созданных пользователей
    // _id: '64a412f14811e93539c8fa13' // тут _id одного из созданных пользователей
  };

  next();
});

// используем bodyParser
app.use(bodyParser.json());

// используем при обращаении к /users
app.use('/users', usersRouter);

// используем при обращаении к /cards
app.use('/cards', cardsRouter);

// выводим сообщение на экран
app.get('/', (req, res) => res.send('Hello World!'));

// создаем слушателя PORT, 2й аргумент колбек — выводим сообщение
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

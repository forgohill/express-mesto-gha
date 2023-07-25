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
// импорт статусов
const { STATUS_CODE } = require('./utils/constants');
// импортируем контролеры авторизации и регистрации
const { login, createUser } = require('./controllers/users');
// добавим мидлвар авторизации
const auth = require('./middlewares/auth');
// запускаем приложение из пакета экспресс
const app = express();

// подключаем базу данных
mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Соединение с базой данной установлено.');
  })
  .catch((error) => {
    console.log(`Ошибка соединения с базой данных ${error.message}`);
  });

// временное решение авторизации
app.use((req, res, next) => {
  req.user = { _id: '64a410674333ff3ca0f2290a' }; // тут _id одного из созданных пользователей
  next();
});

// используем bodyParser
app.use(bodyParser.json());

app.use('/signin', login);
app.use('/signup', createUser);


app.use(auth);
// используем при обращаении к /users
app.use('/users', usersRouter);
// используем при обращаении к /cards
app.use('/cards', cardsRouter);

// обработка несуществующей страницы
app.use((req, res, next) => {
  res.status(STATUS_CODE.NOT_FOUND).send({ message: 'URL запроса не существует' });
  next();
});

// создаем слушателя PORT, 2й аргумент колбек — выводим сообщение
app.listen(PORT, () => console.log(`Приложение можно прослушать на порту: ${PORT}!`));

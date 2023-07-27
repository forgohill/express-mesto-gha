// создаем фукнцию экспресс из пакета
const express = require('express');
// подключаем бадиПарсер
const bodyParser = require('body-parser');
// импортируем монгус
const mongoose = require('mongoose');
// берем присвоение порта из лобального окружения
const { PORT = 3000 } = process.env;
// включаем кукаПарсер
const cookieParser = require('cookie-parser');
// подключим обработчик ошибок от celebrate
const { errors } = require('celebrate');
// подключаем обработчик нестандратных ошибок
const handleErrors = require('./middlewares/handleErrors');
// повдключим роуты с авторизацией
const router = require('./routes');
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

// используем bodyParser
app.use(bodyParser.json());
// используем cookieParser
app.use(cookieParser());
// подключаем роутеры
app.use(router);

// обработка ошибки не правильно роута URL_NOT_FOUND
app.use('/', (req, res, next) => {
  handleErrors({ name: 'URL_NOT_FOUND' }, req, res, next);
  next();
});
// обработка ошибок от JOI.CELEBRATE
app.use(errors());
// обработка нестандартных ошибок
app.use((err, req, res, next) => {
  handleErrors(err, req, res, next);
  next();
});

app.use(require('./middlewares/errorServer'));

// создаем слушателя PORT, 2й аргумент колбек — выводим сообщение
app.listen(PORT, () => console.log(`Приложение можно прослушать на порту: ${PORT}!`));

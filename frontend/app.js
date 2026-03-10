require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { checkAuth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to pass user to views
app.use(checkAuth);

const indexRoutes = require('./routes/index');
const medicineRoutes = require('./routes/medicines');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/medicines', medicineRoutes);
app.use('/chat', chatRoutes);

app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Страница не найдена',
        message: 'Запрашиваемая страница не существует'
    });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('error', {
        title: 'Ошибка',
        message: 'Произошла внутренняя ошибка сервера'
    });
});

app.listen(PORT, () => {
    console.log(`Frontend server running on port ${PORT}`);
});
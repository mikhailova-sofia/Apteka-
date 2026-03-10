const apiClient = require('../utils/api-client');

exports.showLoginForm = (req, res) => {
    res.render('login', {
        title: 'Вход в систему',
        error: null
    });
};

exports.showRegisterForm = (req, res) => {
    res.render('register', {
        title: 'Регистрация',
        error: null
    });
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await apiClient.login({ username, password });
        
        if (data.token) {
            res.cookie('token', data.token, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
            res.redirect('/');
        } else {
            res.render('login', { title: 'Вход в систему', error: 'Неверные учетные данные' });
        }
    } catch (error) {
        res.render('login', { title: 'Вход в систему', error: error.response?.data?.error || 'Ошибка авторизации' });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        
        if (password !== confirmPassword) {
            return res.render('register', { title: 'Регистрация', error: 'Пароли не совпадают' });
        }

        const data = await apiClient.register({ username, password });
        
        if (data.token) {
            res.cookie('token', data.token, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
            res.redirect('/');
        } else {
            res.render('register', { title: 'Регистрация', error: 'Ошибка регистрации' });
        }
    } catch (error) {
        res.render('register', { title: 'Регистрация', error: error.response?.data?.error || error.response?.data?.message || 'Пользователь уже существует или другая ошибка' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};
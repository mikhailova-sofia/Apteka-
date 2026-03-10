const jwt = require('jsonwebtoken');

exports.checkAuth = (req, res, next) => {
    const token = req.cookies.token;
    res.locals.user = null;

    if (token) {
        try {
            const decoded = jwt.decode(token);
            if (decoded) {
                res.locals.user = decoded;
            }
        } catch (e) {
            console.error(e);
        }
    }
    next();
};

exports.requireAuth = (req, res, next) => {
    if (!res.locals.user) {
        return res.redirect('/login');
    }
    next();
};

exports.requireAdmin = (req, res, next) => {
    if (!res.locals.user || res.locals.user.role !== 'admin') {
        return res.status(403).render('error', { 
            title: 'Доступ запрещен', 
            message: 'Эта страница доступна только администраторам.' 
        });
    }
    next();
};
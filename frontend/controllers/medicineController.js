const apiClient = require('../utils/api-client');

exports.list = async (req, res, next) => {
    try {
        const search = req.query.search || '';
        const medicines = await apiClient.getMedicines(search);
        res.render('medicines/list', {
            title: 'Каталог препаратов',
            medicines: medicines,
            search: search,
            success: req.query.success,
            error: req.query.error
        });
    } catch (error) {
        next(error);
    }
};

exports.showCreateForm = (req, res) => {
    res.render('medicines/create', {
        title: 'Добавить препарат',
        medicine: {},
        error: null
    });
};

exports.create = async (req, res, next) => {
    try {
        const { name, description, price, quantity, arrivalDate, imageUrl } = req.body;
        if (!name || !price || !quantity) {
            return res.render('medicines/create', {
                title: 'Добавить препарат',
                medicine: req.body,
                error: 'Заполните все обязательные поля'
            });
        }
        await apiClient.createMedicine({ name, description, price, quantity, arrivalDate, imageUrl }, req.cookies.token);
        res.redirect('/medicines?success=Препарат добавлен');
    } catch (error) {
        next(error);
    }
};

exports.showEditForm = async (req, res, next) => {
    try {
        const medicine = await apiClient.getMedicineById(req.params.id);
        res.render('medicines/edit', {
            title: 'Редактировать препарат',
            medicine: medicine,
            error: null
        });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { name, description, price, quantity, arrivalDate, imageUrl } = req.body;
        await apiClient.updateMedicine(req.params.id, { name, description, price, quantity, arrivalDate, imageUrl }, req.cookies.token);
        res.redirect('/medicines?success=Препарат обновлен');
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        await apiClient.deleteMedicine(req.params.id, req.cookies.token);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
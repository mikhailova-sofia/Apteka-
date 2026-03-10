const express = require('express');
const router = express.Router();
const apiClient = require('../utils/api-client');

router.get('/', async (req, res, next) => {
    try {
        let apiStatus = 'notAvailable';
        try {
            await apiClient.healthCheck();
            apiStatus = 'available';
        } catch (error) {
            console.warn('API health check failed:', error.message);
        }

        const upcoming = await apiClient.getUpcomingArrivals().catch(() => []);

        res.render('index', {
            title: 'Главная | Аптека',
            apiStatus: apiStatus,
            upcoming: upcoming
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
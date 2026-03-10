const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const { requireAdmin } = require('../middleware/auth');

router.get('/', medicineController.list);
router.get('/create', requireAdmin, medicineController.showCreateForm);
router.post('/', requireAdmin, medicineController.create);
router.get('/:id/edit', requireAdmin, medicineController.showEditForm);
router.post('/:id/update', requireAdmin, medicineController.update);
router.delete('/:id', requireAdmin, medicineController.delete);

module.exports = router;
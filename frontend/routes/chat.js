const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, chatController.showChat);
router.get('/rooms', requireAuth, chatController.getRooms);
router.get('/:roomId/messages', requireAuth, chatController.getMessages);
router.post('/:roomId/messages', requireAuth, chatController.sendMessage);

module.exports = router;
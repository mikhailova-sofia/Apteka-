const apiClient = require('../utils/api-client');

exports.showChat = async (req, res) => {
    res.render('chat', {
        title: 'Чат поддержки'
    });
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await apiClient.getChatRooms(req.cookies.token);
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await apiClient.getChatMessages(req.params.roomId, req.cookies.token);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { content } = req.body;
        const message = await apiClient.sendMessage(req.params.roomId, content, req.cookies.token);
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
};
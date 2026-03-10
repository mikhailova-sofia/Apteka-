const axios = require('axios');
require('dotenv').config();

const baseURL = process.env.API_BASE_URL || 'http://localhost:8080/api';

class ApiClient {
    constructor() {
        this.client = axios.create({
            baseURL: baseURL,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    _getConfig(token) {
        if (token) {
            return { headers: { Authorization: `Bearer ${token}` } };
        }
        return {};
    }

    async login(credentials) {
        const response = await this.client.post('/auth/login', credentials);
        return response.data;
    }

    async register(credentials) {
        const response = await this.client.post('/auth/register', credentials);
        return response.data;
    }

    async getMedicines(search = '') {
        const response = await this.client.get('/medicines', { params: { search } });
        return response.data;
    }

    async getMedicineById(id) {
        const response = await this.client.get(`/medicines/${id}`);
        return response.data;
    }

    async createMedicine(data, token) {
        const response = await this.client.post('/medicines', data, this._getConfig(token));
        return response.data;
    }

    async updateMedicine(id, data, token) {
        const response = await this.client.put(`/medicines/${id}`, data, this._getConfig(token));
        return response.data;
    }

    async deleteMedicine(id, token) {
        const response = await this.client.delete(`/medicines/${id}`, this._getConfig(token));
        return response.data;
    }

    async getUpcomingArrivals() {
        const response = await this.client.get('/medicines/upcoming');
        return response.data;
    }

    async healthCheck() {
        const response = await this.client.get('/health');
        return response.data;
    }

    async getChatRooms(token) {
        const response = await this.client.get('/chat/rooms', this._getConfig(token));
        return response.data;
    }

    async getChatMessages(roomId, token) {
        const response = await this.client.get(`/chat/${roomId}`, this._getConfig(token));
        return response.data;
    }

    async sendMessage(roomId, content, token) {
        const response = await this.client.post(`/chat/${roomId}`, { content }, this._getConfig(token));
        return response.data;
    }
}

module.exports = new ApiClient();
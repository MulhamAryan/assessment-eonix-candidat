import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default {
    getAllIPs() {
        return axios.get(`${API_URL}/ips`);
    },

    createIP(ipData) {
        return axios.post(`${API_URL}/ips`, ipData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },

    deleteIP(ipId) {
        return axios.delete(`${API_URL}/ip/${ipId}`);
    },

    getIP(ipId) {
        return axios.get(`${API_URL}/ip/${ipId}`);
    },

    updateIP(ipId, ipData) {
        return axios.put(`${API_URL}/ip/${ipId}`, ipData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

}
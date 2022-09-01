import axios from 'axios';
const endpoint = 'http://localhost:5000/api/v1/';

export const axiosInstance = axios.create({
	baseURL: endpoint,
});

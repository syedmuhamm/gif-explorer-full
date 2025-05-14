import axios from 'axios';
import https from 'https';

const isTest = process.env.NODE_ENV === 'test';

const axiosInstance = axios.create({
  httpsAgent: isTest
    ? new https.Agent({ keepAlive: false }) // Disable keep-alive in test
    : undefined,
});

export default axiosInstance;

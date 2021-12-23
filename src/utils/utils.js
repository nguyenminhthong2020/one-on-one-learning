/* eslint-disable */
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://api.app.lettutor.com/",
    timeout: 5000,
    //'Content-Type': 'application/json'
  });

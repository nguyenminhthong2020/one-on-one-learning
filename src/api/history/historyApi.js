/* eslint-disable */
import axios from 'axios';
import { BASE_URL } from '../../globals/constant';

export const getHistory = async (payload) => {
      const axiosInstance1 = axios.create({
        baseURL: BASE_URL,
        timeout: 5000,
        headers: {
          Authorization: 'Bearer '+ payload.accessToken
        },
      });

      
      const res = await axiosInstance1.get(payload.str);
      return res.data.data;
}
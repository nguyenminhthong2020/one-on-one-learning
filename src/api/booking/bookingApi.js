/* eslint-disable */
import axios from 'axios';
import { BASE_URL } from '../../globals/constant';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    //'Content-Type': 'application/json'
  });
export const getScheduleBooking = async (payload) => {
      const axiosInstance1 = axios.create({
        baseURL: BASE_URL,
        timeout: 5000,
        headers: {
          Authorization: 'Bearer '+ payload.accessToken
        },
      });

      
      const res = await axiosInstance1.post(`${BASE_URL}schedule`, 
      {
          tutorId: payload.tutorId,
      });
      return res.data.data;
}


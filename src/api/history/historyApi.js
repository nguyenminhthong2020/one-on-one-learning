/* eslint-disable */
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.app.lettutor.com/',
    timeout: 5000,
    //'Content-Type': 'application/json'
  });
export const getHistory = async (payload) => {
    const token = await axiosInstance.post('auth/login',{
        "email": "phhai.fit@gmail.com",
        "password": "123456"
        // "email": "songoku.minhthong@gmail.com",
        // "password": "thanhthongle"
      });
      //const accessToken = token.tokens.access.token;
      //console.log("accToken: \n" +accessToken)

      const axiosInstance1 = axios.create({
        baseURL: 'https://api.app.lettutor.com/',
        timeout: 5000,
        headers: {
          Authorization: 'Bearer '+ token.data.tokens.access.token
        },
      });

      
      const res = await axiosInstance1.get(payload.str);
      return res.data.data;
}
/* eslint-disable */
import axios from 'axios';
import { BASE_URL } from '../globals/constant';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    //'Content-Type': 'application/json'
  });

export const handleAverage = arrayFeedbacks => {
  let rate;
  if (arrayFeedbacks.length == 0) {
    rate = 'No reviews yet';
  } else {
    let sum = 0;
    for (let i = 0; i < arrayFeedbacks.length; i++) {
      sum += arrayFeedbacks[i].rating;
    }
    rate = (Math.round((sum / arrayFeedbacks.length)*2)/2) + '/5';
  }
  return rate;
};
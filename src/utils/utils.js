/* eslint-disable */
import axios from 'axios';
import { BASE_URL } from '../globals/constant';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
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

export const handleAverage1 = arrayFeedbacks => {
  let rate;
  if (arrayFeedbacks.length == 0) {
    rate = 0;
  } else {
    let sum = 0;
    for (let i = 0; i < arrayFeedbacks.length; i++) {
      sum += arrayFeedbacks[i].rating;
    }
    rate = (Math.round((sum / arrayFeedbacks.length)*2)/2);
  }
  return rate;
};

export const convertSubject = (id) => {
  switch (id) {
    case 3:
      return 'english-for-kids';
    case 4:
      return "business-english";
    default:
      return "conversational-english";
  }
}

export const convertTestPre = (id) => {
  switch (id) {
    case 1:
      return "starters";
    case 2:
      return "movers";
    case 3:
      return "flyers";
    case 4:
      return "ket";
    case 5:
      return "pet";
    case 6:
      return "ielts";
    case 7:
      return "toefl";
    default:
      return "toeic";
  }
}
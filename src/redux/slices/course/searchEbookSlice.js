/* eslint-disable */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import { searchApi } from '../../../api/course/searchApi';
import axios from 'axios';

/* 
   Lấy list favorite tutor
https://api.app.lettutor.com/tutor/more?perPage=9&page=1
*/
const initialState = {
  data: {},
};

export const ConvertLevel2 = (str) => {
  switch (str) {
    case 'Any Level':
      return 0;
    case 'Beginner':
      return 1;
    case 'Upper-Beginner':
      return 2;
    case 'Pre-Intermediate':
      return 3;
    case 'Intermediate':
      return 4;
    case 'Upper-Intermediate':
      return 5;
    case 'Pre-advanced':
      return 6;
    case 'Advanced':
      return 7;
    default:
      return 8;
  }
}

export const listCate = [
    {
      id: "255c96b6-fd6f-4f43-8dbd-fec766e361e0",
      title: "English for Kids",
      key: "KID",
    },
    {
      id: "488cc5f8-a5b1-45cd-8d3a-47e690f9298e",
      title: "English for Beginners",
      key: "BEGINNER",
    },
    {
      id: "f01cf003-25d1-432f-aaab-bf0e8390e14f",
      title: "Business English",
      key: "BUSINESS",
    },
    {
      id: "d95b69f7-b810-4cdf-b11d-49faaa71ff4b",
      title: "Conversational English",
      key: "CONVERSATIONAL",
    },
    {
      id: "968e7e18-10c0-4742-9ec6-6f5c71c517f5",
      title: "For studying abroad",
      key: "ABROAD",
    },
    {
      id: "c4e7f418-4006-40f2-ba13-cbade54c1fd0",
      title: "English for Traveling",
      key: "TRAVEL",
    },
    {
      id: "0b89ead7-0e92-4aec-abce-ecfeba10dea5",
      title: "PET",
      key: "PET",
    },
    {
      id: "534a94f1-579b-497d-b891-47d8e28e1b2c",
      title: "MOVERS",
      key: "MOVERS",
    },
    {
      id: "df9bd876-c631-413c-9228-cc3d6a5c34fa",
      title: "FLYERS",
      key: "FLYERS",
    },
    {
      id: "248ca9f5-b46d-4a55-b81c-abafebff5876",
      title: "KET",
      key: "KET",
    },
    {
      id: "1e662753-b305-47ad-a319-fa52340f5532",
      title: "TOEIC",
      key: "TOEIC",
    },
    {
      id: "d87de7ba-bd4c-442c-8d58-957acb298f57",
      title: "TOEFL",
      key: "TOEFL",
    },
    {
      id: "975f83f6-30c5-465d-8d98-65e4182369ba",
      title: "STARTERS",
      key: "STARTERS",
    },
    {
      id: "fb92cf24-1736-4cd7-a042-fa3c37921cf8",
      title: "IELTS",
      key: "IELTS",
    }
  ]

export const _listCate = {
  "English for Kids": "255c96b6-fd6f-4f43-8dbd-fec766e361e0",
  "English for Beginners": "488cc5f8-a5b1-45cd-8d3a-47e690f9298e",
  "Business English": "f01cf003-25d1-432f-aaab-bf0e8390e14f",
  "Conversational English": "d95b69f7-b810-4cdf-b11d-49faaa71ff4b",
  "For studying abroad": "968e7e18-10c0-4742-9ec6-6f5c71c517f5",
  "English for Traveling": "c4e7f418-4006-40f2-ba13-cbade54c1fd0",
  "PET": "0b89ead7-0e92-4aec-abce-ecfeba10dea5",
  "MOVERS": "534a94f1-579b-497d-b891-47d8e28e1b2c",
  "FLYERS": "df9bd876-c631-413c-9228-cc3d6a5c34fa",
  "KET": "248ca9f5-b46d-4a55-b81c-abafebff5876",
  "TOEIC":"1e662753-b305-47ad-a319-fa52340f5532",
  "TOEFL": "d87de7ba-bd4c-442c-8d58-957acb298f57",
  "STARTERS": "975f83f6-30c5-465d-8d98-65e4182369ba",
  "IELTS": "fb92cf24-1736-4cd7-a042-fa3c37921cf8"
}

export const searchEbookAsync = createAsyncThunk(
  'course/searchCourseAsync',
  async (payload, {rejectWithValue}) => {
    try {
  
      const axiosInstance1 = axios.create({
        baseURL: 'https://api.app.lettutor.com/',
        timeout: 5000,
        headers: {
          Authorization: 'Bearer '+ payload.accessToken
        },
      });
      
      const res = await axiosInstance1.get(payload.str);
      return res.data.data;
      
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);

const searchEbookSlice = createSlice({
  name: 'searchebook',
  initialState,
  reducers: {
    // init: (state, action) =>{
    //     state.isLoggin = false;
    // },
    // searchName: (state, action) =>{
    //       return state.rows.filter(item => item.name.includes(action.payload.query));
    // }
  },
  extraReducers: {
    [searchEbookAsync.fulfilled]: (state, action) => {
      //state.current = action.payload;
      state.data = action.payload;
    },
  },
});

export const {} = searchEbookSlice.actions;
export default searchEbookSlice.reducer;

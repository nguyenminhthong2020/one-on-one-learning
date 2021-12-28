/* eslint-disable */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
// import { moreApi } from '../../../api/tutor/moreApi';
import { BASE_URL } from '../../../globals/constant';

/* 
   Lấy list favorite tutor
https://api.app.lettutor.com/tutor/more?perPage=9&page=1
*/
const initialState = {
    rows: []
}
export const moreAsync = createAsyncThunk(
  'tutor/moreAsync',
    async (payload, {rejectWithValue}) => {
      try{
        const axiosInstance1 = axios.create({
            baseURL: BASE_URL,
            timeout: 5000,
            headers: {
              Authorization: 'Bearer ' + payload.accessToken,
            },
          });
        const res = await axiosInstance1.get(`tutor/more?perPage=${payload.perPage}&page=${payload.page}`);
        let arrId;
        if(res.data.favoriteTutor.length == 0){
          arrId = [];
        }else{
          arrId = res.data.favoriteTutor.map(item => item.secondId);
        }
        return {
            message: 'ok',
            rows: arrId
        }
      }catch(err){
        alert(err)
        return {
            message: err,
        }
      }
 }
);

export const addFavAsync = createAsyncThunk(
    'tutor/addAsync',
      async (payload, {rejectWithValue}) => {
        try{
          const axiosInstance1 = axios.create({
              baseURL: BASE_URL,
              timeout: 5000,
              headers: {
                Authorization: 'Bearer ' + payload.accessToken,
              },
            });
          const res = await axiosInstance1.post(`user/manageFavoriteTutor`, {
            tutorId: payload.tutorId
          });
          alert('Favorite tutor successfully')
          return {
              message: 'ok',
              tutorId: payload.tutorId
          }
        }catch(err){
          alert(err)
          return {
              message: err,
          }
        }
     }
  );

export const removeFavAsync = createAsyncThunk(
    'tutor/removeAsync',
      async (payload, {rejectWithValue}) => {
        try{
          const axiosInstance1 = axios.create({
              baseURL: BASE_URL,
              timeout: 5000,
              headers: {
                Authorization: 'Bearer ' + payload.accessToken,
              },
            });
          const res = await axiosInstance1.post(`user/manageFavoriteTutor`, {
            tutorId: payload.tutorId
          });
          alert('Unfavorite tutor successfully')
          return {
              message: 'ok',
              tutorId: payload.tutorId
          }
        }catch(err){
          alert(err)
          return {
              message: err,
          }
        }
     }
  );

const moreSlice = createSlice({
    name: 'moretutor',
    initialState,
    reducers:{
    },
    extraReducers:{
        [moreAsync.fulfilled]: (state, action) => {  // moreAsync = get list favorite tutor
          if(action.payload.message == 'ok'){
            state.rows = action.payload.rows;
          }
        },
        [addFavAsync.fulfilled]: (state, action) => {  
          if(action.payload.message == 'ok'){
            state.rows.push(action.payload.tutorId);
          }
        },
        [removeFavAsync.fulfilled]: (state, action) => {  
          if(action.payload.message == 'ok'){
            state.rows = [...state.rows].filter(item => item != action.payload.tutorId)
          }
        }
    }
})

export const {} = moreSlice.actions;
export default moreSlice.reducer;
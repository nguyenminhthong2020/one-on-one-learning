/* eslint-disable */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { searchApi } from '../../../api/tutor/searchApi';
import axios from 'axios';

/* 
   Lấy list favorite tutor
https://api.app.lettutor.com/tutor/more?perPage=9&page=1
*/
const initialState = {
    rows: [],
    count : 0,
    isPageTwoExist :false
}
export const searchSpecAsync = createAsyncThunk(
  'tutor/searchSpecAsync',
    async (payload, {rejectWithValue}) => {
      try{
        const axiosInstance1 = axios.create({
            baseURL: 'https://api.app.lettutor.com/',
            timeout: 5000,
            headers: {
              Authorization: 'Bearer ' + payload.accessToken,
            },
          });
        const res = await axiosInstance1.post(`tutor/search`, {
          ...payload
        });
         
        return {
            message: 'ok',
            rows: res.data.rows,
            count: res.data.count
        }
      }catch(err){
        alert(err)
        return {
            message: err,
        }
      }
   }
);

// payload 
// filters: {specialties: spec, date: '2021-12-04T06:03:15.995Z'},
//         page: 2,
//         perPage: 12,
export const isPageTwoExistAsync = createAsyncThunk(
    'tutor/isPageTwoExistAsync',
      async (payload, {rejectWithValue}) => {
          try{
          const res = await searchApi.searchSpec(payload);  
          return res.rows.length > 0;
        }catch(err){
          if(!err.data){
                    throw err
                  }
                  return rejectWithValue(err.data)
        }
     }
  );


const searchSlice = createSlice({
    name: 'searchtutor',
    initialState,
    reducers:{
        // init: (state, action) =>{
        //     state.isLoggin = false;
        // },
        // searchName: (state, action) =>{
        //       return state.rows.filter(item => item.name.includes(action.payload.query));
        // }
    },
    extraReducers:{
        [searchSpecAsync.fulfilled]: (state, action) => {  
          if(action.payload.message == 'ok'){
            state.rows = action.payload.rows,
            state.count = action.payload.count
          }
        },
        [isPageTwoExistAsync.fulfilled]: (state, action) => {  
            //state.current = action.payload;
            state.isPageTwoExist = action.payload;
        }
    }
})

export const {} = searchSlice.actions;
export default searchSlice.reducer;
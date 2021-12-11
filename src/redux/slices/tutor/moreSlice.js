/* eslint-disable */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { moreApi } from '../../../api/tutor/moreApi';

/* 
   Lấy list favorite tutor
https://api.app.lettutor.com/tutor/more?perPage=9&page=1
*/
const initialState = {
    rows: []
}
export const moreAsync = createAsyncThunk(
  'tutor/moreAsync',
//   async (payload) => {
//   	const resp = await fetch('http://localhost:7000/todos', {
//   		method: 'POST',
//   		headers: {
//   			'Content-Type': 'application/json',
//   		},
//   		body: JSON.stringify({ title: payload.title }),
//   	});

//   	if (resp.ok) {
//   		const todo = await resp.json();
//   		return { todo };
//   	}
//   }
    async (payload, {rejectWithValue}) => {
        try{
        //res = await axiosInstance1.get(`curated?per_page=${per_page}&page=${page}`);
        //return res.data.photos
        const res = await moreApi.more(payload);  
        return res.rows;
      }catch(err){
        if(!err.data){
                  throw err
                }
                return rejectWithValue(err.data)
      }
   }
);

export const addFavAsync = createAsyncThunk(
    'tutor/moreAsync',
      async (payload, {rejectWithValue}) => {
          try{
          //res = await axiosInstance1.get(`curated?per_page=${per_page}&page=${page}`);
          //return res.data.photos
          const res = await moreApi.add(payload);  
          return res.rows;
        }catch(err){
          if(!err.data){
                    throw err
                  }
                  return rejectWithValue(err.data)
        }
     }
  );

export const removeFavAsync = createAsyncThunk(
    'tutor/moreAsync',
      async (payload, {rejectWithValue}) => {
          try{
          //res = await axiosInstance1.get(`curated?per_page=${per_page}&page=${page}`);
          //return res.data.photos
          const res = await moreApi.remove(payload);  
          return res.rows;
        }catch(err){
          if(!err.data){
                    throw err
                  }
                  return rejectWithValue(err.data)
        }
     }
  );

const moreSlice = createSlice({
    name: 'moretutor',
    initialState,
    reducers:{
        // init: (state, action) =>{
        //     state.isLoggin = false;
        // },
        // logout: (state, action) =>{
        //       state.isLoggin = false;
        // }
    },
    extraReducers:{
        [moreAsync.fulfilled]: (state, action) => {  // moreAsync = get list favorite tutor
            //state.current = action.payload;
            state.rows = action.payload;
        },
        [addFavAsync.fulfilled]: (state, action) => {  
            //state.current = action.payload;
            state.rows = action.payload;
        },
        [removeFavAsync.fulfilled]: (state, action) => {  
            //state.current = action.payload;
            state.rows = action.payload;
        }
    }
})

export const {} = moreSlice.actions;
export default moreSlice.reducer;
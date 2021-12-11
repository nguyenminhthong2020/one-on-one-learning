/* eslint-disable */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { searchApi } from '../../../api/tutor/searchApi';

/* 
   Lấy list favorite tutor
https://api.app.lettutor.com/tutor/more?perPage=9&page=1
*/
const initialState = {
    rows: [],
    isPageTwoExist :false
}
export const searchSpecAsync = createAsyncThunk(
  'tutor/searchSpecAsync',
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
        
        // payload: 
        // {
        //     filters: {specialties: spec, date: '2021-12-04T06:03:15.995Z'},
        //     page: 1,
        //     perPage: 12,
        //   }
        const res = await searchApi.searchSpec(payload);  
        return res.rows;
      }catch(err){
        if(!err.data){
                  throw err
                }
                return rejectWithValue(err.data)
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
            //state.current = action.payload;
            state.rows = action.payload;
        },
        [isPageTwoExistAsync.fulfilled]: (state, action) => {  
            //state.current = action.payload;
            state.isPageTwoExist = action.payload;
        }
    }
})

export const {} = searchSlice.actions;
export default searchSlice.reducer;
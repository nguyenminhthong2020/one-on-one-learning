/* eslint-disable */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { searchApi } from '../../../api/tutor/searchApi';

/* 
   Lấy list favorite tutor
https://api.app.lettutor.com/tutor/more?perPage=9&page=1
*/
const initialState = {
    rows: []
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
        const res = await searchApi.searchSpec(payload);  // payload: {specialties: []}
        return res.rows;
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
        }
    }
})

export const {} = searchSlice.actions;
export default searchSlice.reducer;
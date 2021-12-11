/* eslint-disable */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { searchApi } from '../../../api/course/searchApi';

/* 
   Lấy list favorite tutor
https://api.app.lettutor.com/tutor/more?perPage=9&page=1
*/
const initialState = {
    data: {}
}
export const searchCourseAsync = createAsyncThunk(
  'course/searchCourseAsync',
    async (payload, {rejectWithValue}) => {
        try{
        const res = await searchApi.search(payload);  
        return res.data;
      }catch(err){
        if(!err.data){
                  throw err
                }
                return rejectWithValue(err.data)
      }
   }
);


const searchCourseSlice = createSlice({
    name: 'searchcourse',
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
        [searchCourseAsync.fulfilled]: (state, action) => {  
            //state.current = action.payload;
            state.data = action.payload;
        },
    }
})

export const {} = searchCourseSlice.actions;
export default searchCourseSlice.reducer;
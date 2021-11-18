/* eslint-disable */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { userApi } from '../../../api/auth/userApi';

const initialState = {
    current: {

    },
    isLoggin: false,
    loading: false,
    error: '',
    // email: '',
    // name: '',
}
export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
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
   async(payload, thunkAPI) => {
       const currentUser = await userApi.login(payload);
       return currentUser;
    //    if(currentUser.isLogging == false){
    //        alert("Loggin fail");
    //        return currentUser;
    //    }else{
    //        return currentUser;
    //    }
   }
);

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        init: (state, action) =>{
            state.isLoggin = false;
        },
        logout: (state, action) =>{
              state.isLoggin = false;
        }
    },
    extraReducers:{
        [loginAsync.fulfilled]: (state, action) => {
            //state.current = action.payload;
            state.current = action.payload; // = currentUser
            console.log("Action nè: " + JSON.stringify(action));
            state.isLoggin = true;
        }
    }
})

export const {init, logout} = loginSlice.actions;
export default loginSlice.reducer;
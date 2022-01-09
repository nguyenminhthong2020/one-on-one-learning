/* eslint-disable */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from '../../../utils/utils';
import { BASE_URL } from '../../../globals/constant';

const initialState = {
    current: {  //current: user & tokens

    },
    isLoggin: false,
    loading: false,
    error: '',
}
export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
   async(payload, thunkAPI) => {
       try{
        const res = await axiosInstance.post("auth/login", {
          email: payload.email,
          password: payload.password,
        });
        return {
            message: 'ok',
            current: res.data
        }
      }catch(err){
        if (JSON.stringify(err).includes('message')) {
            alert('FAIL:\n' + err.response.data.message);
            return {
                message: err.response.data.message
            }
          } else {
            alert('FAIL:\n' + err);
            return{
                message: err+''
            }
          }
      }
   }
);

export const changeInfoAsync = createAsyncThunk(
    'auth/changeInfoAsync',
     async(payload, thunkAPI) => {
        try{
            const arr = [...payload.whatToLearn].map(i => i.id);
            const arr1 = [...payload.whatToLearn1].map(i => i.id);
          
            const axiosInstance1 = axios.create({
                baseURL: BASE_URL,
                timeout: 5000,
                headers: {
                  Authorization: 'Bearer ' + payload.accessToken,
                },
              });
            const res = await axiosInstance1.put("user/info", {
                birthday: payload.birthday,
                country: payload.country,
                language: payload.language,
                learnTopics: arr,
                level: payload.level,
                name: payload.name,
                phone: payload.phone,
                testPreparations: arr1,
            });
            return {
                message: 'ok',
                user: res.data.user
            }
          }catch(err){
            alert(err)
            return {
                message: err,
            }
          }
     }
  );

export const changeAvatar = createAsyncThunk(
    'auth/changeAvatar',
    async(payload, thunkAPI) => {
        try{
         const res = await axiosInstance.post("auth/login", {
           email: payload.email,
           password: payload.password,
         });
         return {
             message: 'ok',
             current: res.data
         }
       }catch(err){
        if (JSON.stringify(err).includes('message')) {
            alert('FAIL:\n' + err.response.data.message);
            return {
                message: err.response.data.message
            }
          } else {
            alert('FAIL:\n' + err);
            return {
                message: err + ''
            }
          }
       }
    }
)

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        init: (state, action) =>{
            state.isLoggin = false;
        },
        logout: (state, action) =>{
            state.isLoggin = false;
        },
        initNew: (state, action) => {
            state.current = action.payload.current; // = currentUser
            state.isLoggin = true;
        },
        initNewAvatar: (state, action) => {
           state.current = {
               ...state.current,
               user: {
                   ...state.current.user,
                   avatar: action.payload.newAvatar
               }
           }
           alert('Avatar uploaded successfully')
        }
    },
    extraReducers:{
        [loginAsync.fulfilled]: (state, action) => {
            if(action.payload.message == 'ok'){
                state.current = action.payload.current; // = currentUser
                state.isLoggin = true;
            }
        },
        [changeInfoAsync.fulfilled]: (state, action) => {
            if(action.payload.message == 'ok'){
                state.current = {
                    ...state.current,
                    user: action.payload.user
                }
                state.isLoggin = true;
            }
        }
    }
})

export const {init, logout, initNew, initNewAvatar} = loginSlice.actions;
export default loginSlice.reducer;
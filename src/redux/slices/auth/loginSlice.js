/* eslint-disable */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import { userApi } from '../../../api/auth/userApi';
import axios from 'axios';
import { axiosInstance } from '../../../utils/utils';



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
        // const currentUser = await userApi.login(payload);
        const res = await axiosInstance.post("auth/login", {
          email: payload.email,
          password: payload.password,
        });
        return {
            message: 'ok',
            current: res.data
        }
      }catch(err){
        alert(err.response.data.message)
        return {
            message: err.response.data.message,
        }
      }
   }
);

export const changeInfoAsync = createAsyncThunk(
    'auth/changeInfoAsync',
     async(payload, thunkAPI) => {
        //  const currentUser = await userApi.changeInfo(payload)
        //  return currentUser.current;
        try{
            const arr = [...payload.whatToLearn].map(i => i.id);
            const arr1 = [...payload.whatToLearn1].map(i => i.id);
          
            const axiosInstance1 = axios.create({
                baseURL: 'https://api.app.lettutor.com/',
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
         alert(err.response.data.message)
         return {
             message: err.response.data.message,
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
                // console.log(state.current)
                state.isLoggin = true;
            }
        }
    }
})

export const {init, logout, initNew, initNewAvatar} = loginSlice.actions;
export default loginSlice.reducer;
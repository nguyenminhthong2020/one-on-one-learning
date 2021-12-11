/* eslint-disable */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isDarkTheme: false
}

const themeSlice = createSlice({
    name: 'changeTheme',
    initialState,
    reducers:{
        // init: (state, action) =>{
        //     state.isLoggin = false;
        // },
        // logout: (state, action) =>{
        //       state.isLoggin = false;
        // }
        changeTheme: (state, action) => {
            state.isDarkTheme = !state.isDarkTheme;
        }
    },
    // extraReducers:{
    //     [loginAsync.fulfilled]: (state, action) => {
    //         //state.current = action.payload;
    //         state.current = action.payload; // = currentUser
    //         console.log("Action nè: " + JSON.stringify(action));
    //         state.isLoggin = true;
    //     }
    // }
})

//export const {init, logout} = themeSlice.actions;
export const {changeTheme} = themeSlice.actions;
export default themeSlice.reducer;
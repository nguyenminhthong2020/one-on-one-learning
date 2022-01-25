/* eslint-disable */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isDarkTheme: false
}

const themeSlice = createSlice({
    name: 'changeTheme',
    initialState,
    reducers:{
        changeTheme: (state, action) => {
            state.isDarkTheme = !state.isDarkTheme;
        }
    },
})

export const {changeTheme} = themeSlice.actions;
export default themeSlice.reducer;
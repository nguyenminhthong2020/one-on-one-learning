// /* eslint-disable */
// import {createSlice} from '@reduxjs/toolkit';
// import i18n from '../../../utils/i18n';

// const initialState = {
//     currentLang: "en",  // en, vi
//     i18n: i18n
// }


// const langSlice = createSlice({
//     name: 'lang',
//     initialState,
//     reducers:{
//         init: (state, action) =>{
//             state.isLoggin = false;
//         },
//         logout: (state, action) =>{
//               state.isLoggin = false;
//         },
//         change: (state, action) => {
//             if(state.currentLang == "en")
//             {
//                state.currentLang = "vi";
//                state.i18n.changeLanguage('vi');
//             }else{
//                 state.currentLang = "en";
//                 state.i18n.changeLanguage('en');
//             }
//         }
//     },
// })

// export const {init, logout, change} = langSlice.actions;
// export default langSlice.reducer;
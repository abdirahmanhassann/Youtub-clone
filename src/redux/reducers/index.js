import { configureStore, createSlice } from "@reduxjs/toolkit";
const searchslice=createSlice(
    {
        name:'search',
        initialState:'',
reducers:{
    addby :(state,action)=>{
        return {...state, search: action.payload};
    },
    // deletePreviousIterations: (state,action) => {
    //     state = '';
    //   }
  
}
    }
)
export const {addby} =searchslice.actions;

const store=configureStore({
    reducer:searchslice.reducer,

}) 
export default store;
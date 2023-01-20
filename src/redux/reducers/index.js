import { configureStore, createSlice } from "@reduxjs/toolkit";

const searchslice=createSlice(
    {
        name:'search',
        initialState:'',
reducers:{
    addby :(state,action)=>{
        return {...state, search: action.payload};
    },
   
  
}
    }
)
const channelslice=createSlice(
    {
        name:'channelonclick',
        initialState:{},
reducers:{
    channelonclickreducer :(state,action)=>{
        return {...state, search: action.payload};
    },
  
}
    }
)
export const {addby} =searchslice.actions;
export const {channelonclickreducer}=channelslice.actions;
const store=configureStore({
    reducer:{
        search: searchslice.reducer,
        channelonclick: channelslice.reducer
}
}) 
export default store;
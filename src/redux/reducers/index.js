import { configureStore, createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";


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
const accountslice=createSlice(
    {
        name:'account',
        initialState:{},
reducers:{
    accountreducer :(state,action)=>{
        return {...state, account: action.payload};
    },
  
}
}
)
const loginslice=createSlice(
    {
        name:'login',
        initialState:false,
reducers:{
    loginslicereducer :(state,action)=>{
        return {...state, login: action.payload};
    },
  
}
    }
)

const persistConfig={
    key:"root",
    version:1,
    storage,
};
const reducer= combineReducers({
    channelonclick:channelslice.reducer,
    search: searchslice.reducer,
    login:loginslice.reducer,
    account:accountslice.reducer
})
const persistedReducer=persistReducer(persistConfig,reducer);


export const {addby} =searchslice.actions;
export const {channelonclickreducer}=channelslice.actions;
export const {loginslicereducer}=loginslice.actions
export const {accountreducer}=accountslice.actions
const store=configureStore({
    reducer:{ 
               reducer:persistedReducer,
      }
      ,  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    

}) 
export  let persistor= persistStore(store)

export default store;
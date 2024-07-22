import { createSlice } from "@reduxjs/toolkit";

export const initialState={
    username:"",
    email:"",
    mobile:"",
    department:"",
    photo:[],
    qualification:"",
    type:"",
}
const userSlice =createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        updateUser:(state,action)=>{
            state.username =action.payload.username;
            state.email =action.payload.email;
            state.mobile =action.payload.mobile;
            state.type =action.payload.type;
            state.department =action.payload.department;
            state.photo =action.payload.photo;
            state.qualification =action.payload.qualification;

        },
        
    }
})

export const {updateUser} =userSlice.actions;
export default userSlice.reducer
import {createReducer}  from "@reduxjs/toolkit"

const initialState = {
    isLoading: true
}


export const adminReducer = createReducer(initialState, {
  LoadAdminRequest: (state) => {
      state.isLoading = true;
    },
    LoadAdminSuccess: (state, action) => {
      state.isAdmin = true;
      
      state.isLoading = false;
      state.admin = action.payload;
    },
    LoadAdminFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    
    clearErrors: (state) => {
        state.error = null;
      },
   
  });
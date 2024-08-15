import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const brandReducer = createReducer(initialState, {
    brandCreateRequest: (state) => {
    state.isLoading = true;
  },
  brandCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.brand = action.payload;
    state.success = true;
  },
  brandCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  getAllBrandRequest: (state) => {
    state.isLoading = true;
  },
  getAllBrandSuccess: (state, action) => {
    state.isLoading = false;
    state.allBrand = action.payload;
   
  },
  getAllBrandFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    
  },



  getSingleBrandRequest: (state) => {
    state.isLoading = true;
  },
  getSingleBrandSuccess: (state, action) => {
    state.isLoading = false;
    state.singleBrand = action.payload;
  },
  getSingleBrandFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },


  brandUpdateRequest: (state) => {
    state.isLoading = true;
  },
  brandUpdateSuccess: (state, action) => {
    state.isLoading = false;
    state.updateBrand = action.payload;
    state.uploadSuccess = true
  },
  brandUpdateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.uploadSuccess = false
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
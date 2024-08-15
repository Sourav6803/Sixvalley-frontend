import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const categoryReducer = createReducer(initialState, {
  categoryCreateRequest: (state) => {
    state.isLoading = true;
  },
  categoryCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.category = action.payload;
    state.success = true;
  },
  categoryCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  getAllCategoryRequest: (state) => {
    state.isLoading = true;
  },
  getAllCategorySuccess: (state, action) => {
    state.isLoading = false;
    state.allCategory = action.payload;
   
  },
  getAllCategoryFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    
  },



  getSingleCategoryRequest: (state) => {
    state.isLoading = true;
  },
  getSingleCategorySuccess: (state, action) => {
    state.isLoading = false;
    state.singleCategory = action.payload;
  },
  getSingleCategoryFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },


  categoryUpdateRequest: (state) => {
    state.isLoading = true;
  },
  categoryUpdateSuccess: (state, action) => {
    state.isLoading = false;
    state.updateCategory = action.payload;
    state.uploadSuccess = true
  },
  categoryUpdateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.uploadSuccess = false
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const subSubCategoryReducer = createReducer(initialState, {
    subSubCategoryCreateRequest: (state) => {
    state.isLoading = true;
  },
  subSubCategoryCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.subSubCategory = action.payload;
    state.success = true;
  },
  subSubCategoryCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },


  getAllSubSubCategoryRequest: (state) => {
    state.isLoading = true;
  },
  getAllSubSubCategorySuccess: (state, action) => {
    state.isLoading = false;
    state.allSubSubCategory = action.payload;
   
  },
  getAllSubSubCategoryFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    
  },



  getSingleSubSubCategoryRequest: (state) => {
    state.isLoading = true;
  },
  getSingleSubSubCategorySuccess: (state, action) => {
    state.isLoading = false;
    state.singleSubSubCategory = action.payload;
  },
  getSingleSubSubCategoryFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },


  subSubCategoryUpdateRequest: (state) => {
    state.isLoading = true;
  },
  subSubCategoryUpdateSuccess: (state, action) => {
    state.isLoading = false;
    state.updateSubSubCategory = action.payload;
    state.subSubCategoryUploadSuccess = true
  },
  subSubCategoryUpdateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.subSubCategoryUploadSuccess = false
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
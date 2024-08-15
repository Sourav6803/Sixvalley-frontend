import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const subCategoryReducer = createReducer(initialState, {
    subCategoryCreateRequest: (state) => {
    state.isLoading = true;
  },
  subCategoryCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.subCategory = action.payload;
    state.success = true;
  },
  subCategoryCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  getAllSubCategoryRequest: (state) => {
    state.isLoading = true;
  },
  getAllSubCategorySuccess: (state, action) => {
    state.isLoading = false;
    state.allSubCategory = action.payload;
   
  },
  getAllSubCategoryFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    
  },



  getSingleSubCategoryRequest: (state) => {
    state.isLoading = true;
  },
  getSingleSubCategorySuccess: (state, action) => {
    state.isLoading = false;
    state.singleSubCategory = action.payload;
  },
  getSingleSubCategoryFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },


  subCategoryUpdateRequest: (state) => {
    state.isLoading = true;
  },
  subCategoryUpdateSuccess: (state, action) => {
    state.isLoading = false;
    state.updateSubCategory = action.payload;
    state.subCategoryUploadSuccess = true
  },
  subCategoryUpdateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.subCategoryUploadSuccess = false
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
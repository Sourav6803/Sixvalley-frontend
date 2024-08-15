import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const bannerReducer = createReducer(initialState, {
    bannerCreateRequest: (state) => {
    state.isLoading = true;
  },
  bannerCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.banner = action.payload;
    state.success = true;
  },
  bannerCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  getAllBannerRequest: (state) => {
    state.isLoading = true;
  },
  getAllBannerSuccess: (state, action) => {
    state.isLoading = false;
    state.allBanner = action.payload;
   
  },
  getAllBannerFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    
  },



  getSingleBannerRequest: (state) => {
    state.isLoading = true;
  },
  getSingleBannerSuccess: (state, action) => {
    state.isLoading = false;
    state.singleBanner = action.payload;
  },
  getSingleBannerFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },


  bannerUpdateRequest: (state) => {
    state.isLoading = true;
  },
  bannerUpdateSuccess: (state, action) => {
    state.isLoading = false;
    state.updateBrand = action.payload;
    state.uploadSuccess = true
  },
  bannerUpdateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.uploadSuccess = false
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
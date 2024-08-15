import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
};



export const attributeReducer = createReducer(initialState, {
    attributeCreateRequest: (state) => {
        state.isLoading = true;
    },
    attributeCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.attribute = action.payload;
        state.success = true;
    },
    attributeCreateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
        console.log(state.error)
    },

    // get all attribute of shop
    getAllAttributeRequest: (state) => {
        state.isLoading = true;
    },
    getAllAttributeSuccess: (state, action) => {
        state.isLoading = false;
        state.allAttribute = action.payload;
    },
    getAllAttributeFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    //   get single attribute

    getSingleAttributeRequest: (state) => {
        state.isLoading = true;
    },
    getSingleAttributeSuccess: (state, action) => {
        state.isLoading = false;
        state.singleAttribute = action.payload;
    },
    getSingleAttributeFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },


    attributeUpdateRequest: (state) => {
        state.isLoading = true;
    },
    attributeUpdateSuccess: (state, action) => {
        state.isLoading = false;
        state.updateAttribute = action.payload;
        state.uploadSuccess = true
    },
    attributeUpdateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.uploadSuccess = false
    },

    clearErrors: (state) => {
        state.error = null;
    },
});
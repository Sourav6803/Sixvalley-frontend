import axios from "axios";
import { server } from "../../server";

// create event
export const createSubCategory = (newForm) => async (dispatch) => {

    try {
        dispatch({
            type: "subCategoryCreateRequest",
        });

        const config = { 
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        };
        const { data } = await axios.post(`${server}/subCategory/create-subCategory`, newForm, config);
      
      
        dispatch({
            type: "subCategoryCreateSuccess",
            payload: data.data,

        });
    } catch (error) {
        dispatch({
            type: "subCategoryCreateFail",
            payload: error?.response?.data?.message,

        });
    }
};


// get All sub-categories
export const getAllSubCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllSubCategoryRequest",
        });

        const { data } = await axios.get(`${server}/subCategory/get-all-subCategory`, {withCredentials:true});

        dispatch({
            type: "getAllSubCategorySuccess",
            payload: data?.data,
        });
    } catch (error) {
        dispatch({
            type: "getAllSubCategoryFailed",
            payload: error.response.data.message,
        });
    }
};

// get single sub-categories
export const getSingleSubCategories = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getSingleSubCategoryRequest",
        });

        const { data } = await axios.get(`${server}/subCategory/get-subCategory/${id}`, {withCredentials: true});

        dispatch({
            type: "getSingleSubCategorySuccess",
            payload: data?.subCategory,
        });
    } catch (error) {
        dispatch({
            type: "getSingleSubCategoryFailed",
            payload: error.response.data.message,
        });
    }
};

export const updateSubCategory = (id,newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "subCategoryUpdateRequest",
        });

        const config = { 
            withCredentials: true
        };
        const { data } = await axios.put(`${server}/subCategory/update-subCategory/${id}`, newForm, config);
       
        dispatch({
            type: "subCategoryUpdateSuccess",
            payload: data.subCategory,

        });
    } catch (error) {
        dispatch({
            type: "subCategoryUpdateFail",
            payload: error?.response?.data?.message,

        });
    }
};
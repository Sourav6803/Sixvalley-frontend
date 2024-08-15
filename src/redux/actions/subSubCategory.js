import axios from "axios";
import { server } from "../../server";

// create Sub Sub Category
export const createSubSubCategory = (newForm) => async (dispatch) => {

    try {
        dispatch({
            type: "subSubCategoryCreateRequest",
        });

        const config = { 
           headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        };
        const { data } = await axios.post(`${server}/subsubCategory/create-subSubCategory`, newForm, config);
      
      
        dispatch({
            type: "subSubCategoryCreateSuccess",
            payload: data?.data,

        });
    } catch (error) {
        dispatch({
            type: "subSubCategoryCreateFail",
            payload: error?.response?.data?.message,

        });
    }
};


// get All Sub sub-categories
export const getAllSubSubCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllSubSubCategoryRequest",
        });

        const { data } = await axios.get(`${server}/subSubCategory/get-all-subSubCategory`, {withCredentials:true});
        
        dispatch({
            type: "getAllSubSubCategorySuccess",
            payload: data?.data,
        });
    } catch (error) {
        dispatch({
            type: "getAllSubSubCategoryFailed",
            payload: error.response.data.message,
        });
    }
};

// get single Sub sub-categories
export const getSingleSubSubCategories = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getSingleSubSubCategoryRequest",
        });

        const { data } = await axios.get(`${server}/subSubCategory/get-subSubCategory/${id}`, {withCredentials: true});

        dispatch({
            type: "getSingleSubSubCategorySuccess",
            payload: data?.subSubCategory,
        });
    } catch (error) {
        dispatch({
            type: "getSingleSubSubCategoryFailed",
            payload: error.response.data.message,
        });
    }
};

export const updateSubSubCategory = (id,newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "subSubCategoryUpdateRequest",
        });

        const config = { 
            withCredentials: true
        };
        const { data } = await axios.put(`${server}/subSubCategory/update-subSubcategory/${id}`, newForm, config);
       
        dispatch({
            type: "subSubCategoryUpdateSuccess",
            payload: data?.subSubCategory,

        });
    } catch (error) {
        dispatch({
            type: "subSubCategoryUpdateFail",
            payload: error?.response?.data?.message,

        });
    }
};
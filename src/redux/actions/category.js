import axios from "axios";
import { server } from "../../server";

// create event
export const createCategory = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "categoryCreateRequest",
        });

        const config = { 
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        };
        const { data } = await axios.post(`${server}/category/create-category`, newForm, config);
      
       
        dispatch({
            type: "categoryCreateSuccess",
            payload: data.category,

        });
    } catch (error) {
        dispatch({
            type: "categoryCreateFail",
            payload: error?.response?.data?.message,

        });
    }
};


// get All categories
export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllCategoryRequest",
        });

        const { data } = await axios.get(`${server}/category/get-all-category`);

        dispatch({
            type: "getAllCategorySuccess",
            payload: data?.data,
        });
    } catch (error) {
        dispatch({
            type: "getAllCategoryFailed",
            payload: error.response.data.message,
        });
    }
};

// get All categories
export const getSingleCategories = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getSingleCategoryRequest",
        });

        const { data } = await axios.get(`${server}/category/get-category/${id}`, {withCredentials: true});

        dispatch({
            type: "getSingleCategorySuccess",
            payload: data?.category,
        });
    } catch (error) {
        dispatch({
            type: "getSingleCategoryFailed",
            payload: error.response.data.message,
        });
    }
};

export const updateCategory = (id,newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "categoryUpdateRequest",
        });

        const config = { 
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        };
        const { data } = await axios.put(`${server}/category/update-category/${id}`, newForm, config);
       
        dispatch({
            type: "categoryUpdateSuccess",
            payload: data.category,

        });
    } catch (error) {
        dispatch({
            type: "categoryUpdateFail",
            payload: error?.response?.data?.message,

        });
    }
};
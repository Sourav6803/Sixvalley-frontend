import axios from "axios";
import { server } from "../../server";

// create brand
export const createBrand = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "brandCreateRequest",
        });

        const config = { 
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        };
        
        const { data } = await axios.post(`${server}/brand/create-brand`, newForm, config);
      
       
        dispatch({
            type: "brandCreateSuccess",
            payload: data?.brand,

        });
    } catch (error) {
        dispatch({
            type: "brandCreateFail",
            payload: error?.response?.data?.message,

        });
    }
};


// get All brand
export const getAllBrands = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllBrandRequest",
        });

        const { data } = await axios.get(`${server}/brand/get-all-brand`,{ withCredentials: true});

        dispatch({
            type: "getAllBrandSuccess",
            payload: data?.data,
        });
    } catch (error) {
        dispatch({
            type: "getAllBrandFailed",
            payload: error.response.data.message,
        });
    }
};

// get single brand
export const getSingleBrand = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getSingleBrandRequest",
        });

        const { data } = await axios.get(`${server}/brand/get-brand/${id}`, {withCredentials: true});

        dispatch({
            type: "getSingleBrandSuccess",
            payload: data?.brand,
        });
    } catch (error) {
        dispatch({
            type: "getSingleBrandFailed",
            payload: error.response.data.message,
        });
    }
};

export const updateBrand = (id,newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "brandUpdateRequest",
        });

        const config = { 
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        };
        const { data } = await axios.put(`${server}/brand/update-brand/${id}`, newForm, config);
       
        dispatch({
            type: "brandUpdateSuccess",
            payload: data?.brand,

        });
    } catch (error) {
        dispatch({
            type: "brandUpdateFail",
            payload: error?.response?.data?.message,

        });
    }
};
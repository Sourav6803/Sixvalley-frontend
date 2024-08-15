import axios from "axios";
import { server } from "../../server";

// create attribute
export const createBanner = (newForm) => async (dispatch) => {

    try {
        dispatch({
            type: "bannerCreateRequest",
        });

        const config = { 
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        };
        const { data } = await axios.post(`${server}/banner/create-banner`, newForm, config);
      
      
        dispatch({
            type: "bannerCreateSuccess",
            payload: data.data,

        });
    } catch (error) {
        dispatch({
            type: "bannerCreateFail",
            payload: error?.response?.data?.message,

        });
    }
};

// get All attribute
export const getAllBanner = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllBannerRequest",
        });

        const { data } = await axios.get(`${server}/banner/get-all-banner`, {withCredentials:true});

        dispatch({
            type: "getAllBannerSuccess",
            payload: data?.data,
        });
    } catch (error) {
        dispatch({
            type: "getAllBannerFailed",
            payload: error.response.data.message,
        });
    }
};

// get single attribute
export const getSingleBanner = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getSingleBannerRequest",
        });

        const { data } = await axios.get(`${server}/banner/get-banner/${id}`, {withCredentials: true});

        dispatch({
            type: "getSingleBannerSuccess",
            payload: data?.banner,
        });
    } catch (error) {
        dispatch({
            type: "getSingleBannerFailed",
            payload: error.response.data.message,
        });
    }
};

export const updateBanner = (id,newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "bannerUpdateRequest",
        });

        const config = { 
            withCredentials: true
        };
        const { data } = await axios.put(`${server}/banner/update-banner/${id}`, newForm, config);
       
        dispatch({
            type: "bannerUpdateSuccess",
            payload: data.banner,

        });
    } catch (error) {
        dispatch({
            type: "bannerUpdateFail",
            payload: error?.response?.data?.message,

        });
    }
};
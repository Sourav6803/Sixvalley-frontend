import axios from "axios";
import { server } from "../../server";

// create attribute
export const createAttribute = (newForm) => async (dispatch) => {

    try {
        dispatch({
            type: "attributeCreateRequest",
        });

        const config = { 
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        };
        const { data } = await axios.post(`${server}/attribute/create-attribute`, newForm, config);
      
      
        dispatch({
            type: "attributeCreateSuccess",
            payload: data.data,

        });
    } catch (error) {
        dispatch({
            type: "attributeCreateFail",
            payload: error?.response?.data?.message,

        });
    }
};

// get All attribute
export const getAllAttributes = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllAttributeRequest",
        });

        const { data } = await axios.get(`${server}/attribute/get-all-attribute`, {withCredentials:true});

        dispatch({
            type: "getAllAttributeSuccess",
            payload: data?.data,
        });
    } catch (error) {
        dispatch({
            type: "getAllAttributeFailed",
            payload: error.response.data.message,
        });
    }
};

// get single attribute
export const getSingleAttribute = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getSingleAttributeRequest",
        });

        const { data } = await axios.get(`${server}/attribute/get-attribute/${id}`, {withCredentials: true});

        dispatch({
            type: "getSingleAttributeSuccess",
            payload: data?.attribute,
        });
    } catch (error) {
        dispatch({
            type: "getSingleAttributeFailed",
            payload: error.response.data.message,
        });
    }
};

export const updateAttribute = (id,newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "attributeUpdateRequest",
        });

        const config = { 
            withCredentials: true
        };
        const { data } = await axios.put(`${server}/attribute/update-attribute/${id}`, newForm, config);
       
        dispatch({
            type: "attributeUpdateSuccess",
            payload: data.attribute,

        });
    } catch (error) {
        dispatch({
            type: "attributeUpdateFail",
            payload: error?.response?.data?.message,

        });
    }
};
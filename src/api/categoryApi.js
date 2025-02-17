import axios from "axios";

// const BASE_URL = "http://localhost:8000/api/v3/category";
const BASE_URL = "https://e-backend-136t.onrender.com/api/v3"

const config = { 
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true
};

export const createMainCategory = (data) => axios.post(`${BASE_URL}/create-main`, data, config);

export const getMainCategories = () => axios.get(`${BASE_URL}/main`);

export const addSubcategory = (data) => axios.post(`${BASE_URL}/add-subcategory`, data, config);

export const addLeafCategory = (data) => axios.post(`${BASE_URL}/add-leaf`, data, config);

export const addAttributes = (data) => axios.post(`${BASE_URL}/add-attributes`, data);

// export const removeAttributes = () => 

export const getCategoryHierarchy = () => axios.get(`${BASE_URL}/all`);

export const getPath = (id) => axios.get(`${BASE_URL}/path/${id}`);
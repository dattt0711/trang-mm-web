import { axiosBodyToAPI, sendQueryToAPI } from './axiosService';
import queryString from 'query-string';

const API_CREATE_PRODUCT = "http://localhost:5000/auth/products/create";
const API_UPDATE_PRODUCT = "http://localhost:5000/auth/products/update";
const API_LIST_PRODUCT = "http://localhost:5000/auth/products/list";
const API_INFO_PRODUCT = "http://localhost:5000/auth/products/info";
const API_DELETE_PRODUCT = "http://localhost:5000/auth/products/delete";

export const fetchCreateProductApi = (params) => {
    const body = params;
    return axiosBodyToAPI('POST', API_CREATE_PRODUCT, body);
};
export const fetchUpdateProductApi = (params) => {
    const body = params;
    return axiosBodyToAPI('PUT', API_UPDATE_PRODUCT, body);
};
export const fetchListProductApi = (params = {}) => {
    let queryParams = '';
    if (Object.keys(params).length > 0) {
        queryParams = `?${queryString.stringify(params)}`;
    }
    return sendQueryToAPI(`${API_LIST_PRODUCT}${queryParams}`);
};

export const fetchInfoProductApi = (params = {}) => {
    return sendQueryToAPI(`${API_INFO_PRODUCT}/${params}`);
};
export const fetchDeleteProductApi = (params) => {
    const body = params;
    return axiosBodyToAPI('DELETE', API_DELETE_PRODUCT, body);
};


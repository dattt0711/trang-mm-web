import { axiosBodyToAPI, sendQueryToAPI } from './axiosService';
import queryString from 'query-string';

const API_ADD_TO_CART = "http://localhost:5000/auth/carts/addToCart";
const API_LIST_CART = "http://localhost:5000/auth/carts/list";
const API_DELETE_IN_CART = "http://localhost:5000/auth/carts/delete";

export const fetchAddToCartApi = (params) => {
    const body = params;
    return axiosBodyToAPI('POST', API_ADD_TO_CART, body);
};
export const fetchDeleteInCartApi = (params) => {
    const body = params;
    return axiosBodyToAPI('DELETE', API_DELETE_IN_CART, body);
};
export const fetchListCartsApi = (params = {}) => {
    let queryParams = '';
    if (Object.keys(params).length > 0) {
        queryParams = `?${queryString.stringify(params)}`;
    }
    return sendQueryToAPI(`${API_LIST_CART}${queryParams}`);
};

// export const fetchInfoProductApi = (params = {}) => {
//     let queryParams = '';
//     if (Object.keys(params).length > 0) {
//         queryParams = `?${queryString.stringify(params)}`;
//     }
//     return sendQueryToAPI(`${API_INFO_PRODUCT}${queryParams}`);
// };


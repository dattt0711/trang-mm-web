import { axiosBodyToAPI, sendQueryToAPI } from './axiosService';
import queryString from 'query-string';

const API_PURCHASE = "http://localhost:5000/auth/orders/create";
const API_LIST_ORDERS = "http://localhost:5000/auth/orders/list";

export const fetchPurchaseApi = (params) => {
    const body = params;
    return axiosBodyToAPI('POST', API_PURCHASE, body);
};

export const fetchListOrdersApi = (params = {}) => {
    let queryParams = '';
    if (Object.keys(params).length > 0) {
        queryParams = `?${queryString.stringify(params)}`;
    }
    return sendQueryToAPI(`${API_LIST_ORDERS}${queryParams}`);
};


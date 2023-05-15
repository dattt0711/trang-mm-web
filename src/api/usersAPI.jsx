import { axiosBodyToAPI, sendQueryToAPI } from './axiosService';
import queryString from 'query-string';

const API_UPDATE_USERS = "http://localhost:5000/auth/users/update";
const API_INFO_USERS = "http://localhost:5000/auth/users/info";

export const fetchUpdateUserApi = (params) => {
    const body = params;
    return axiosBodyToAPI('PUT', API_UPDATE_USERS, body);
};

export const fetchInfoProductApi = (params = {}) => {
    return sendQueryToAPI(`${API_INFO_USERS}/${params}`);
};


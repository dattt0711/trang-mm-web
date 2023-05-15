import {axiosBodyToAPI} from './axiosService';
const API_LOGIN = "http://localhost:5000/login";


export const fetchLoginApi = (params) => {
    const body = params ;
    return axiosBodyToAPI('POST', API_LOGIN, body);
};


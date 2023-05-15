import {axiosBodyToAPI} from './axiosService';
const API_CREATE_IMAGE = "http://localhost:5000/file/image/upload";


export const fetchCreateImageApi = (params) => {
    const body = params ;
    return axiosBodyToAPI('POST', API_CREATE_IMAGE, body);
};


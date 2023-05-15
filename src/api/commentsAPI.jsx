import { axiosBodyToAPI, sendQueryToAPI } from './axiosService';
import queryString from 'query-string';

const API_LIST_COMMENT = "http://localhost:5000/auth/comments/list";
const API_CREATE_COMMENT = "http://localhost:5000/auth/comments/create";

export const fetchCreateCommentApi = (params) => {
    const body = params;
    return axiosBodyToAPI('POST', API_CREATE_COMMENT, body);
};
export const fetchListCommentsApi = (params = {}) => {
    let queryParams = '';
    if (Object.keys(params).length > 0) {
        queryParams = `?${queryString.stringify(params)}`;
    }
    return sendQueryToAPI(`${API_LIST_COMMENT}${queryParams}`);
};


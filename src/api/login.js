import axios from 'axios';

import { API_LOGIN, API_REGISTER } from './api';

let headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Origin', '*');

export const fetchLogin = async (body) => {
    try {
        const result = await axios.post(API_LOGIN, body, headers);
        return result;
    } catch (error) {
        return error;
    }
}
export const fetchRegister = async (body) => {
    try {
        const result = await axios.post(API_REGISTER, body, headers);
        return result;
    } catch (error) {
        return error;
    }
}
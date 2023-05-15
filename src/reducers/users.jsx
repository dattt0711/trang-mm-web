import { toastError, toastSuccess } from '../components/ToastHelper/toastHelper';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dataInfo: {},
    isLoading: true,
    pagination: {},
};
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Info
        fetchInfoUser(state, params) {
            state.dataInfo = {};
            state.error = null;
        },
        fetchInfoUserSuccess: (state, action) => {
            state.dataInfo = action.payload.data;
        },
        fetchInfoUserFailed: (state, action) => {
            const { error } = action.payload;
            state.error = error;
        },

        // Update
        fetchUpdateUser(state, params) {
            state.error = null;
            state.isLoading = true;
            state.isCreateSuccess = false;
        },
        fetchUpdateUserSuccess: (state, action) => {
            const { message } = action.payload;
            toastSuccess(message);
            state.isCreateSuccess = true;
            state.isLoading = false;
        },
        fetchUpdateUserFailed: (state, action) => {
            const { error } = action.payload;
            toastError(error);
            state.isLoading = false;
            state.isCreateSuccess = false;
            state.error = error;
        },
    },
});
export const {
    fetchInfoUser, fetchInfoUserSuccess, fetchInfoUserFailed,
    fetchUpdateUser, fetchUpdateUserSuccess, fetchUpdateUserFailed,
} = usersSlice.actions;

export default usersSlice.reducer;

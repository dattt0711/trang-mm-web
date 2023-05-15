// import { toastError, toastSuccess } from '@helpers/ToastHelper/toastHelper';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    isLoading: false,
};
const imageSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        // Create
        fetchCreateImage(state, params) {
            state.dataCreate = [];
            state.isLoading = true;
        },
        fetchCreateImageSuccess: (state, action) => {
            const { data, message } = action.payload;
            // toastSuccess(message);
            state.data = data;
            state.isLoading = false;
        },
        fetchCreateImageFailed: (state, action) => {
            const { error } = action.payload;
            // toastError(error);
            state.isLoading = false;
        },
    },
});
export const {
    fetchCreateImage, fetchCreateImageSuccess, fetchCreateImageFailed,
} = imageSlice.actions;

export default imageSlice.reducer;

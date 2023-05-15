import { createSlice } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../components/ToastHelper/toastHelper';

const initialState = {
    listComment: [],
    isLoading: true,
    pagination: {},
};
const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        //List
        fetchListComments(state, params) {
            state.listComment = [];
            state.error = null;
        },
        fetchListCommentsSuccess: (state, action) => {
            const { data } = action.payload;
            state.listComment = data;
        },
        fetchListCommentsFailed: (state, action) => {
            const { error } = action.payload;
            state.error = error;
        },
        // Create
        fetchCreateComment(state, params) {
            state.error = null;
            state.isLoading = true;
        },
        fetchCreateCommentSuccess: (state, action) => {
            const { message } = action.payload;
            toastSuccess(message);
            state.isLoading = false;
        },
        fetchCreateCommentFailed: (state, action) => {
            const { error } = action.payload;
            toastError(error);
            state.isLoading = false;
            state.error = error;
        },
    },
});
export const {
    fetchListComments, fetchListCommentsSuccess, fetchListCommentsFailed,
    fetchCreateComment, fetchCreateCommentSuccess, fetchCreateCommentFailed,
} = commentsSlice.actions;

export default commentsSlice.reducer;
